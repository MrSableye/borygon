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
}

const defaultClientOptions: ClientOptions = {
  throttle: 500,
  connectionRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  actionUrl: 'https://play.pokemonshowdown.com/~~showdown/action.php',
  loginRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
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
      this.loggedIn = false;
      this.stopQueue();
      this.clearQueue();

      if (!disconnectEvent.isManual) {
        try {
          await this.connect();

          if (this.lastLogin) {
            await this.lastLogin();
          }
        } catch (error) {
          // TODO: Deal with error
        }
      }
    });
  }

  private async attemptConnect() {
    this.loggedIn = false;
    await this.rawClient.connect();
    this.handleQueue();
  }

  private async connectWithRetry(delay: number, retries: number): Promise<void> {
    if (retries > 0) {
      try {
        return await this.attemptConnect();
      } catch (error) {
        await wait(delay);
        return this.connectWithRetry(delay, retries - 1);
      }
    }

    return Promise.reject(new Error('Exceeded connection retries'));
  }

  public async connect(retryConfiguration?: RetryConfiguration) {
    const configuration = retryConfiguration || this.clientOptions.connectionRetry;

    return this.connectWithRetry(
      configuration.delay,
      configuration.retries,
    );
  }

  public disconnect(): void {
    this.loggedIn = false;
    this.stopQueue();
    this.clearQueue();
    this.rawClient.disconnect();
  }

  public isConnected() {
    return this.rawClient.isConnected();
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  private async attemptLogin(username: string, password: string): Promise<void> {
    if (!this.challenge) {
      // TODO: Make this process more streamlined
      try {
        await new Promise<void>((resolve, reject) => {
          this.eventEmitter.on('challenge', () => resolve());
          wait(200).then(() => reject()); // TODO: Configure this delay
        });

        return this.attemptLogin(username, password);
      } catch (error) {
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

    const loginResponse = await axios.post<string>(
      this.clientOptions.actionUrl,
      qs.stringify(data),
    );

    const login = JSON.parse(loginResponse.data.substr(1));

    if (login.actionsuccess && login.assertion) { // TODO: Handle
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
        return await this.attemptLogin(username, password);
      } catch (error) {
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

    await this.loginWithRetry(
      username,
      password,
      configuration.delay,
      configuration.retries,
    );

    this.lastLogin = () => this.login(username, password, configuration);
    this.loggedIn = true;
  }

  public async logout(userid: string) {
    const data = {
      act: 'logout',
      userid,
    };

    const loginResponse = await axios.post<string>(
      this.clientOptions.actionUrl,
      qs.stringify(data),
    );

    const logout = JSON.parse(loginResponse.data.substr(1));

    if (logout.actionsuccess) {
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
