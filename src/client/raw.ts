import WebSocket from 'isomorphic-ws';
import Emittery from 'emittery';
import {
  deserializeRawMessages,
  RawRoomMessages,
  RawRoomMessageErrors,
  RoomMessages,
  RoomMessageErrors,
} from '../protocol';

const manualCloseCode = 4200;

interface DisconnectEvent {
  isManual: boolean;
  isError: boolean;
  data?: string;
}

export interface RawLifecycleEvents {
  connect: string;
  disconnect: DisconnectEvent;
  loginAssertion: string;
}

export interface RawClientOptions {
  server: string;
  port: number;
  socketTimeout: number;
  ssl: boolean;
}

const defaultClientOptions: RawClientOptions = {
  server: 'sim3.psim.us',
  port: 443,
  socketTimeout: 10 * 1000,
  ssl: true,
};

export class RawShowdownClient {
  private readonly clientOptions: RawClientOptions;

  readonly lifecycle: Emittery.Typed<RawLifecycleEvents>;

  readonly messages: Emittery.Typed<RoomMessages>;

  readonly messageErrors: Emittery.Typed<RoomMessageErrors>;

  readonly rawMessages: Emittery.Typed<RawRoomMessages>;

  readonly rawMessageErrors: Emittery.Typed<RawRoomMessageErrors>;

  socket?: WebSocket;

  constructor(clientOptions: Partial<RawClientOptions> = {}) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };
    this.lifecycle = new Emittery.Typed<RawLifecycleEvents>();
    this.messages = new Emittery.Typed<RoomMessages>();
    this.messageErrors = new Emittery.Typed<RoomMessageErrors>();
    this.rawMessages = new Emittery.Typed<RawRoomMessages>();
    this.rawMessageErrors = new Emittery.Typed<RawRoomMessageErrors>();
  }

  public connect(): Promise<void> {
    const {
      server,
      port,
      socketTimeout,
      ssl,
    } = this.clientOptions;
    const websocketUrl = `${ssl ? 'wss' : 'ws'}://${server}:${port}/showdown/websocket`;

    this.socket = new WebSocket(websocketUrl);

    this.socket.addEventListener('open', () => {
      this.lifecycle.emit('connect', 'Connected to WebSocket');
    });

    this.socket.addEventListener('message', (messageEvent) => {
      this.handleData(messageEvent.data.toString());
    });

    this.socket.addEventListener('close', (closeEvent) => {
      this.lifecycle.emit('disconnect', {
        isManual: closeEvent.code === manualCloseCode,
        isError: false,
      });
    });

    this.socket.addEventListener('error', () => {
      this.lifecycle.emit('disconnect', {
        isManual: false,
        isError: true,
      });
    });

    return new Promise((resolve, reject) => {
      const openListener = () => {
        this.socket?.removeEventListener('open', openListener);
        resolve();
      };
      const closeListener = () => {
        this.socket?.removeEventListener('close', closeListener);
        reject();
      };
      const errorListener = () => {
        this.socket?.removeEventListener('error', errorListener);
        reject();
      };

      this.socket?.addEventListener('open', openListener);
      this.socket?.addEventListener('close', closeListener);
      this.socket?.addEventListener('error', errorListener);

      setTimeout(reject, socketTimeout);
    });
  }

  public disconnect() {
    this.socket?.close(manualCloseCode);
  }

  public isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  private handleData(rawMessage: string) {
    const messageResults = deserializeRawMessages(rawMessage);

    messageResults.forEach((messageResult) => {
      if (!messageResult) return;
      if ('value' in messageResult) {
        this.messages.emit(messageResult.value.messageName, messageResult.value);
        this.rawMessages.emit(messageResult.value.rawMessageName, messageResult.value);
      } else {
        this.messageErrors.emit(messageResult.error.messageName, messageResult.error);
        this.rawMessageErrors.emit(messageResult.error.rawMessageName, messageResult.error);
      }
    });
  }

  public send(message: string) {
    this.socket?.send(message);
  }
}
