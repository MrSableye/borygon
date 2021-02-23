import WebSocket from 'isomorphic-ws';
import Emittery from 'emittery';
import {
  getPokemonShowdownEventKey,
  parsers,
} from '../event';
import {
  EventError,
  RoomEvents,
} from './types';

const manualCloseCode = 4200;

interface DisconnectEvent {
  isManual: boolean;
  isError: boolean;
  data?: string;
}

export interface RawLifecycleEvents {
  connect: string;
  disconnect: DisconnectEvent;
}

export interface RawClientOptions {
  server: string;
  port: number;
}

const defaultClientOptions: RawClientOptions = {
  server: 'sim3.psim.us',
  port: 443,
};

export class RawShowdownClient {
  private readonly clientOptions: RawClientOptions;

  readonly eventEmitter: Emittery.Typed<RoomEvents>;

  readonly lifecycleEmitter: Emittery.Typed<RawLifecycleEvents>;

  readonly eventErrorEmitter: Emittery.Typed<EventError>;

  socket?: WebSocket;

  constructor(clientOptions: Partial<RawClientOptions>) {
    this.clientOptions = {
      ...defaultClientOptions,
      ...clientOptions,
    };
    this.eventEmitter = new Emittery.Typed<RoomEvents>();
    this.lifecycleEmitter = new Emittery.Typed<RawLifecycleEvents>();
    this.eventErrorEmitter = new Emittery.Typed<EventError>();
  }

  public connect(): Promise<void> {
    const websocketUrl = `wss://${this.clientOptions.server}:${this.clientOptions.port}/showdown/websocket`;

    this.socket = new WebSocket(websocketUrl);

    this.socket.addEventListener('open', () => {
      this.lifecycleEmitter.emit('connect', 'meme'); // TODO
    });

    this.socket.addEventListener('message', (messageEvent) => {
      this.handleData(messageEvent.data.toString());
    });

    this.socket.addEventListener('close', (closeEvent) => {
      this.lifecycleEmitter.emit('disconnect', {
        isManual: closeEvent.code === manualCloseCode,
        isError: false,
      });
    });

    this.socket.addEventListener('error', () => {
      this.lifecycleEmitter.emit('disconnect', {
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
      // TODO: Add connection timeout?
    });
  }

  public disconnect() {
    this.socket?.close(manualCloseCode);
  }

  public isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  private handleData(rawMessage: string) {
    const messages = rawMessage.split('\n');
    let room = 'lobby';

    messages.forEach((message) => {
      if (message.charAt(0) === '>') {
        room = message.substr(1);
      } else {
        const [, rawEventName, ...args] = message
          .split('|')
          .map((splitMessage) => splitMessage.trim());

        const eventName = getPokemonShowdownEventKey(rawEventName);
        const parserResult = parsers[eventName](args);

        if ('value' in parserResult) {
          const roomEvent = {
            room,
            rawEventName,
            rawEvent: message,
            eventName,
            event: parserResult.value,
          } as RoomEvents[typeof eventName];

          this.eventEmitter.emit(eventName, roomEvent);
        } else {
          this.eventErrorEmitter.emit('eventError', { eventName: rawEventName, rawEvent: message, errors: parserResult.errors });
        }
      }
    });
  }

  public send(message: string) {
    this.socket?.send(message);
  }
}
