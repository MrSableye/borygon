import {
  PokemonShowdownEvents,
} from '../event';

export type RoomEvents = {
  [K in keyof PokemonShowdownEvents]: {
    room: string,
    rawEventName: string,
    rawEvent: string,
    eventName: K,
    event: [PokemonShowdownEvents[K], Record<string, string>]
  };
};
export type EventError = {
  eventError: {
    eventName: string,
    rawEvent: string,
    errors: string[],
  }
};
