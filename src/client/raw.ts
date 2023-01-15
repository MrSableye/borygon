import WebSocket from 'isomorphic-ws';
import Emittery from 'emittery';
import {
  deserializeRawMessages,
  RoomMessages,
  RoomMessageError,
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
}

const defaultClientOptions: RawClientOptions = {
  server: 'sim3.psim.us',
  port: 443,
  socketTimeout: 10 * 1000,
};

export class RawShowdownClient {
  private readonly clientOptions: RawClientOptions;

  readonly messages: Emittery.Typed<RoomMessages>;

  readonly lifecycle: Emittery.Typed<RawLifecycleEvents>;

  readonly errors: Emittery.Typed<{ messageError: RoomMessageError }>;

  socket?: WebSocket;

  constructor(clientOptions: Partial<RawClientOptions>) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };
    this.messages = new Emittery.Typed<RoomMessages>();
    this.lifecycle = new Emittery.Typed<RawLifecycleEvents>();
    this.errors = new Emittery.Typed<{ messageError: RoomMessageError }>();
  }

  public connect(): Promise<void> {
    const websocketUrl = `wss://${this.clientOptions.server}:${this.clientOptions.port}/showdown/websocket`;

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

      setTimeout(reject, this.clientOptions.socketTimeout);
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
      } else {
        this.errors.emit('messageError', messageResult.error);
      }
    });
  }

  public send(message: string) {
    this.socket?.send(message);
  }
}
