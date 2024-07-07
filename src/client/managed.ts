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
  RoomMessageErrors,
  RawRoomMessages,
  RawRoomMessageErrors,
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
  throttle: 620,
  connectionRetry: { delay: 30 * 1000, retries: Number.POSITIVE_INFINITY },
  actionUrl: 'https://play.pokemonshowdown.com/action.php',
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
const race = <T>(promiseFn: () => Promise<T>, timeout: number): Promise<T> => {
  let timer: NodeJS.Timeout | undefined;

  return Promise.race([
    promiseFn().then((value) => {
      clearTimeout(timer!);
      timer = undefined;
      return value;
    }),
    new Promise<never>((_, reject) => {
      timer = setTimeout(reject, timeout);
    }),
  ]);
};

export class ManagedShowdownClient {
  private readonly rawClient: RawShowdownClient;

  private readonly clientOptions: ClientOptions;

  readonly lifecycle: Emittery.Typed<RawLifecycleEvents>;

  readonly messages: Emittery.Typed<RoomMessages>;

  readonly messageErrors: Emittery.Typed<RoomMessageErrors>;

  readonly rawMessages: Emittery.Typed<RawRoomMessages>;

  readonly rawMessageErrors: Emittery.Typed<RawRoomMessageErrors>;

  private messageQueue: PriorityQueue<QueuedMessage>;

  private messageQueueInterval?: NodeJS.Timeout;

  private loggedIn: boolean = false;

  private lastLogin?: () => Promise<void>;

  private challenge?: { keyId: string, challenge: string };

  private lastConnectionAttempt?: number;

  private lastLoginAttempt?: number;

  constructor(clientOptions: Partial<ClientOptions> = {}) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };

    this.rawClient = new RawShowdownClient(clientOptions);
    this.lifecycle = this.rawClient.lifecycle;
    this.messages = this.rawClient.messages;
    this.messageErrors = this.rawClient.messageErrors;
    this.rawMessages = this.rawClient.rawMessages;
    this.rawMessageErrors = this.rawClient.rawMessageErrors;

    this.messageQueue = createMessageQueue();
    this.loggedIn = false;

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
      const now = Date.now();
      if (this.lastConnectionAttempt) {
        const timeBetween = now - this.lastConnectionAttempt;
        if (timeBetween < delay) {
          await wait(delay - timeBetween);
          return this.connectWithRetry(delay, retries);
        }
      }

      try {
        this.debugLog(false, `Attempting to connect, ${retries} retries remaining`);
        this.lastConnectionAttempt = now;
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
      `Attempting to connect with ${configuration.retries} retries and retry delay ${configuration.delay} ms`,
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
        const challengeMessage = await this.receive('challenge', this.clientOptions.challengeDelay);
        this.challenge = challengeMessage.value.message;
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
      const now = Date.now();
      if (this.lastLoginAttempt) {
        const timeBetween = now - this.lastLoginAttempt;
        if (timeBetween < delay) {
          await wait(delay - timeBetween);
          return this.loginWithRetry(
            username,
            password,
            avatar,
            delay,
            retries,
          );
        }
      }

      try {
        this.debugLog(false, `Attempting to login, ${retries} retries remaining`);
        this.lastLoginAttempt = now;
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
    const configuration = retryConfiguration ?? this.clientOptions.loginRetry;

    this.debugLog(
      false,
      `Attempting to login with ${configuration.retries} retries and retry delay ${configuration.delay} ms`,
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
      const unsubscribe = this.messages.on(roomMessageName, (roomMessage) => {
        if (!predicate || predicate(roomMessage)) {
          unsubscribe();
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
    if (typeof timeout === 'undefined') {
      return this.receiveWithoutDelay(roomMessageName, predicate);
    }

    let unsubscribe: Emittery.UnsubscribeFn | undefined;
    try {
      /* eslint-disable max-len */
      // This is *almost* `return await race(() => this.receiveWithoutDelay(roomMessageName, predicate), timeout)`
      // However, we need to duplicate the logic here in order to unsubscribe the listener if a timeout occurs.
      /* eslint-enable max-len */
      return await race(() => new Promise<RoomMessages[K]>((resolve) => {
        unsubscribe = this.messages.on(roomMessageName, (roomMessage) => {
          if (!predicate || predicate(roomMessage)) {
            unsubscribe!();
            resolve(roomMessage);
          }
        });
      }), timeout);
    } catch {
      if (unsubscribe) unsubscribe();

      throw new Error(`Exceeded timeout for ${roomMessageName} event`);
    }
  }
}
