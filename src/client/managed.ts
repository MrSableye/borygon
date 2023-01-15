import axios from 'axios';
import qs from 'querystring';
import Emittery from 'emittery';
import PriorityQueue from 'priorityqueuejs';
import {
  RawClientOptions,
  RawLifecycleEvents,
  RawShowdownClient,
} from './raw';
import {
  RoomMessages,
  RoomMessageError,
} from '../protocol';

interface RetryConfiguration {
  delay: number;
  retries: number;
}

export interface ClientOptions extends Partial<RawClientOptions> {
  throttle: number;
  connectionRetry: RetryConfiguration;
  actionUrl: string;
  loginRetry: RetryConfiguration;
  challengeDelay: number;
  debug: boolean;
  debugPrefix?: string;
  loginParams?: { [key: string]: string };
}

const defaultClientOptions: ClientOptions = {
  throttle: 500,
  connectionRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  actionUrl: 'https://play.pokemonshowdown.com/~~showdown/action.php',
  loginRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  challengeDelay: 200,
  debug: false,
};

interface QueuedMessage {
  message: string;
  priority: number;
  timestamp: number;
  resolve: () => void;
}

const createMessageQueue = () => new PriorityQueue<QueuedMessage>((messageA, messageB) => {
  if ((messageA.priority - messageB.priority) !== 0) {
    return messageA.priority - messageB.priority;
  }

  return messageB.timestamp - messageA.timestamp;
});

const wait = (delay: number) => new Promise<void>((resolve) => setTimeout(resolve, delay));
const waitToReject = (
  delay: number,
) => new Promise<never>((resolve, reject) => setTimeout(reject, delay));

export class ManagedShowdownClient {
  private readonly rawClient: RawShowdownClient;

  private readonly clientOptions: ClientOptions;

  readonly messages: Emittery.Typed<RoomMessages>;

  readonly lifecycle: Emittery.Typed<RawLifecycleEvents>;

  readonly errors: Emittery.Typed<{ messageError: RoomMessageError }>;

  private messageQueue: PriorityQueue<QueuedMessage>;

  private messageQueueInterval?: NodeJS.Timeout;

  private loggedIn: boolean = false;

  private lastLogin?: () => Promise<void>;

  private challenge?: { keyId: string, challenge: string };

  constructor(clientOptions: Partial<ClientOptions>) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };

    this.rawClient = new RawShowdownClient(clientOptions);
    this.messages = this.rawClient.messages;
    this.lifecycle = this.rawClient.lifecycle;
    this.errors = this.rawClient.errors;

    this.messageQueue = createMessageQueue();
    this.loggedIn = false;

    this.messages.on('challenge', ({ message: [messageValue] }) => {
      this.challenge = messageValue;
    });

    this.lifecycle.on('disconnect', async (disconnectEvent) => {
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
        console.error(...modifiedArgs); // eslint-disable-line no-console
      } else {
        console.log(...modifiedArgs); // eslint-disable-line no-console
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

    throw new Error('Exceeded connection retries');
  }

  public async connect(retryConfiguration?: RetryConfiguration) {
    const configuration = retryConfiguration || this.clientOptions.connectionRetry;

    this.debugLog(
      false,
      `Attempting to connect with ${configuration.retries} and retry delay ${configuration.delay} ms`,
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

  public async forceLogin(assertionCommand: string): Promise<void> {
    return this.send(assertionCommand);
  }

  private async attemptLogin(username: string, password: string, avatar: string): Promise<void> {
    if (!this.challenge) {
      this.debugLog(false, `No login challenge received yet, waiting ${this.clientOptions.challengeDelay} ms for challenge`);

      try {
        await new Promise<void>((resolve, reject) => {
          this.messages.on('challenge', () => resolve());
          wait(this.clientOptions.challengeDelay).then(() => reject());
        });

        return this.attemptLogin(username, password, avatar);
      } catch (error) {
        this.debugLog(true, 'Error awaiting challenge');

        throw new Error('Challenge not received yet');
      }
    }

    const data = {
      ...this.clientOptions.loginParams,
      act: 'login',
      name: username,
      pass: password,
      challengekeyid: this.challenge.keyId,
      challenge: this.challenge.challenge,
    };

    this.debugLog(false, 'Attempting login to login server');

    const loginResponse = await axios.post<string>(
      this.clientOptions.actionUrl,
      qs.stringify(data),
    );

    this.debugLog(false, 'Successfully received login response from login server');

    const login = JSON.parse(loginResponse.data.substr(1));

    if (login.actionsuccess && login.assertion) {
      this.debugLog(false, 'Received login success from login server');

      this.lifecycle.emit('loginAssertion', login.assertion);

      return this.forceLogin(`|/trn ${username},${avatar},${login.assertion}`);
    }

    throw new Error('Invalid login response');
  }

  private async loginWithRetry(
    username: string,
    password: string,
    avatar: string,
    delay: number,
    retries: number,
  ): Promise<void> {
    if (retries > 0) {
      try {
        this.debugLog(false, `Attempting to login, ${retries} retries remaining`);

        return await this.attemptLogin(username, password, avatar);
      } catch (error) {
        this.debugLog(true, `Error logging in, retrying in ${delay} ms`, error);

        await wait(delay);
        return this.loginWithRetry(
          username,
          password,
          avatar,
          delay,
          retries - 1,
        );
      }
    }

    throw new Error('Exceeded login retries');
  }

  public async login(
    username: string,
    password: string,
    avatar: string = '1',
    retryConfiguration?: RetryConfiguration,
  ) {
    const configuration = retryConfiguration || this.clientOptions.loginRetry;

    this.debugLog(
      false,
      `Attempting to login with ${configuration.retries} and retry delay ${configuration.delay} ms`,
    );

    this.debugLog(
      false,
      `Logging in with username: ${username}, password: ${password.replace(/./g, '*')}, avatar: ${avatar}`,
    );

    await this.loginWithRetry(
      username,
      password,
      avatar,
      configuration.delay,
      configuration.retries,
    );

    this.lastLogin = () => this.login(username, password, avatar, configuration);
    this.loggedIn = true;
    this.challenge = undefined;

    this.debugLog(false, 'Successfully logged in');
  }

  public async logout(userid: string) {
    const data = {
      ...this.clientOptions.loginParams,
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

      try {
        const message = this.messageQueue.deq();
        this.sendQueued(message);
      } catch (error) {} // eslint-disable-line no-empty
    }, this.clientOptions.throttle);
  }

  private stopQueue() {
    if (this.messageQueueInterval) {
      clearInterval(this.messageQueueInterval);
      this.messageQueueInterval = undefined;
    }
  }

  public clearQueue() {
    this.messageQueue = createMessageQueue();
  }

  private sendQueued(queuedMessage: QueuedMessage) {
    const { message, resolve } = queuedMessage;
    this.rawClient.send(message);
    resolve();
  }

  public async send(message: string, priority: number = 0) {
    const promise = new Promise<void>((resolve) => {
      this.messageQueue.enq({
        message,
        priority,
        timestamp: Date.now(),
        resolve,
      });
    });

    return promise;
  }

  private receiveWithoutDelay<K extends keyof RoomMessages>(
    roomMessageName: K,
    predicate?: (message: RoomMessages[K]) => boolean,
  ): Promise<RoomMessages[K]> {
    return new Promise<RoomMessages[K]>((resolve) => {
      this.messages.on(roomMessageName, (roomMessage) => {
        if (!predicate || predicate(roomMessage)) {
          resolve(roomMessage);
        }
      });
    });
  }

  public async receive<K extends keyof RoomMessages>(
    roomMessageName: K,
    timeout?: number,
    predicate?: (message: RoomMessages[K]) => boolean,
  ): Promise<RoomMessages[K]> {
    if (timeout) {
      return Promise.race([
        this.receiveWithoutDelay(roomMessageName, predicate),
        waitToReject(timeout),
      ]);
    }

    return this.receiveWithoutDelay(roomMessageName, predicate);
  }
}
