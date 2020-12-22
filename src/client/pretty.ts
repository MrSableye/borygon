import axios from 'axios';
import qs from 'querystring';
import Emittery from 'emittery';
import {
  RawClient,
  RawClientOptions,
  RawLifecycleEvents,
} from './raw';
import {
  EventError,
  RoomEvents,
} from './types';

interface RetryConfiguration {
  delay: number;
  retries: number;
}

export interface ClientOptions extends Partial<RawClientOptions> {
  throttle: number;
  connectionRetry: RetryConfiguration;
  actionUrl: string;
  loginRetry: RetryConfiguration;
  debug: boolean;
  debugPrefix?: string;
}

const defaultClientOptions: ClientOptions = {
  throttle: 500,
  connectionRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  actionUrl: 'https://play.pokemonshowdown.com/~~showdown/action.php',
  loginRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  debug: false,
};

type QueuedMessage = [string, () => void];

const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export class PrettyClient {
  private readonly rawClient: RawClient;

  private readonly clientOptions: ClientOptions;

  readonly eventEmitter: Emittery.Typed<RoomEvents>;

  readonly lifecycleEmitter: Emittery.Typed<RawLifecycleEvents>;

  readonly eventErrorEmitter: Emittery.Typed<EventError>;

  private queuedMessages: QueuedMessage[];

  private messageQueueInterval?: NodeJS.Timeout;

  private loggedIn: boolean = false;

  private lastLogin?: () => Promise<void>;

  private challenge?: { id: string, value: string };

  constructor(clientOptions: Partial<ClientOptions>) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };

    this.rawClient = new RawClient(clientOptions);
    this.eventEmitter = this.rawClient.eventEmitter;
    this.lifecycleEmitter = this.rawClient.lifecycleEmitter;
    this.eventErrorEmitter = this.rawClient.eventErrorEmitter;

    this.queuedMessages = [];
    this.loggedIn = false;

    this.eventEmitter.on('challenge', ({ event: [eventValue] }) => {
      this.challenge = eventValue;
    });

    this.lifecycleEmitter.on('disconnect', async (disconnectEvent) => {
      this.debugLog(true, 'Underlying client disconnected, freeing up resources');

      this.disconnect();

      if (!disconnectEvent.isManual) {
        try {
          this.debugLog(false, 'Attempting to automatically reconnect');

          await this.connect();

          if (this.lastLogin) {
            this.debugLog(false, 'Attempting to automatically re-login');

            await this.lastLogin();
          }
        } catch (error) {
          this.debugLog(true, 'Unable to automatically reconnect/re-login', error);
        }
      }
    });
  }

  private debugLog(isError: boolean, ...args: any[]) {
    if (this.clientOptions.debug) {
      let modifiedArgs = args;

      if (this.clientOptions.debugPrefix) {
        modifiedArgs = [this.clientOptions.debugPrefix, ...modifiedArgs];
      }

      if (isError) {
        console.error(...modifiedArgs);
      } else {
        console.log(...modifiedArgs);
      }
    }
  }

  private async attemptConnect() {
    this.loggedIn = false;
    await this.rawClient.connect();
    this.handleQueue();
  }

  private async connectWithRetry(delay: number, retries: number): Promise<void> {
    if (retries > 0) {
      try {
        this.debugLog(false, `Attempting to connect, ${retries} retries remaining`);

        return await this.attemptConnect();
      } catch (error) {
        this.debugLog(true, `Error connecting, retrying in ${delay} ms`, error);

        await wait(delay);
        return this.connectWithRetry(delay, retries - 1);
      }
    }

    return Promise.reject(new Error('Exceeded connection retries'));
  }

  public async connect(retryConfiguration?: RetryConfiguration) {
    const configuration = retryConfiguration || this.clientOptions.connectionRetry;

    this.debugLog(
      false,
      `Attempting to connect with ${configuration.retries} and retry delay ${configuration.delay}`,
    );

    await this.connectWithRetry(
      configuration.delay,
      configuration.retries,
    );

    this.debugLog(false, 'Successfully connected');
  }

  public disconnect(): void {
    this.debugLog(false, 'Attempting to disconnect');

    this.loggedIn = false;
    this.stopQueue();
    this.clearQueue();
    this.rawClient.disconnect();

    this.debugLog(false, 'Successfully disconnected');
  }

  public isConnected() {
    return this.rawClient.isConnected();
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  private async attemptLogin(username: string, password: string): Promise<void> {
    if (!this.challenge) {
      this.debugLog(false, 'No login challenge challenged received yet, awaiting challenge');

      try {
        await new Promise<void>((resolve, reject) => {
          this.eventEmitter.on('challenge', () => resolve());
          wait(200).then(() => reject()); // TODO: Configure this delay
        });

        return this.attemptLogin(username, password);
      } catch (error) {
        this.debugLog(true, 'Error awaiting challenge');

        return Promise.reject(new Error('Challenge not received yet'));
      }
    }

    const data = {
      act: 'login',
      name: username,
      pass: password,
      challengekeyid: this.challenge.id,
      challenge: this.challenge.value,
    };

    this.debugLog(false, 'Attempting login to login server');

    const loginResponse = await axios.post<string>(
      this.clientOptions.actionUrl,
      qs.stringify(data),
    );

    this.debugLog(false, 'Successfully received login response from login server');

    const login = JSON.parse(loginResponse.data.substr(1));

    if (login.actionsuccess && login.assertion) { // TODO: Handle
      this.debugLog(false, 'Received login success from login server');

      return this.send(`|/trn ${username},0,${login.assertion}`); // TODO: Middle value is avatar
    }

    return Promise.reject(new Error('Invalid login response')); // TODO: Improve
  }

  private async loginWithRetry(
    username: string,
    password: string,
    delay: number,
    retries: number,
  ) {
    if (retries > 0) {
      try {
        this.debugLog(false, `Attempting to login, ${retries} retries remaining`);

        return await this.attemptLogin(username, password);
      } catch (error) {
        this.debugLog(true, `Error logging in, retrying in ${delay} ms`, error);

        await wait(delay);
        return this.connectWithRetry(delay, retries - 1);
      }
    }

    return Promise.reject(new Error('Exceeded login retries'));
  }

  public async login(
    username: string,
    password: string,
    retryConfiguration?: RetryConfiguration,
  ) {
    const configuration = retryConfiguration || this.clientOptions.loginRetry;

    this.debugLog(
      false,
      `Attempting to login with ${configuration.retries} and retry delay ${configuration.delay}`,
    );

    await this.loginWithRetry(
      username,
      password,
      configuration.delay,
      configuration.retries,
    );

    this.lastLogin = () => this.login(username, password, configuration);
    this.loggedIn = true;
    this.challenge = undefined;

    this.debugLog(false, 'Successfully logged in');
  }

  public async logout(userid: string) {
    const data = {
      act: 'logout',
      userid,
    };

    this.debugLog(false, 'Attempting logout to login server');

    const logoutResponse = await axios.post<string>(
      this.clientOptions.actionUrl,
      qs.stringify(data),
    );

    this.debugLog(false, 'Successfully received logout response from login server');

    const logout = JSON.parse(logoutResponse.data.substr(1));

    if (logout.actionsuccess) {
      this.debugLog(false, 'Received logout success from login server');

      this.loggedIn = false;
    }
  }

  private handleQueue() {
    this.messageQueueInterval = setInterval(() => {
      if (!this.isConnected) {
        this.stopQueue();

        return;
      }

      const message = this.queuedMessages.splice(0, 3);
      for (let index = 0; index < message.length; index += 1) {
        this.sendQueued(message[index]);
      }
    }, this.clientOptions.throttle);
  }

  private stopQueue() {
    if (this.messageQueueInterval) {
      clearInterval(this.messageQueueInterval);
      this.messageQueueInterval = undefined;
    }
  }

  public clearQueue() {
    this.queuedMessages = [];
  }

  private sendQueued(queuedMessage: QueuedMessage) {
    this.rawClient.send(queuedMessage[0]);
    queuedMessage[1]();
  }

  public async send(message: string) {
    const promise = new Promise<void>((resolve) => {
      this.queuedMessages.push([message, resolve]);
    });

    return promise;
  }
}
