import {
  PokemonShowdownEvents,
} from '../event';

export type EventKey = keyof PokemonShowdownEvents;
export type RoomEvents = { [K in EventKey]: {
  room: string,
  eventName: string,
  rawEvent: string,
  event: [PokemonShowdownEvents[K], Record<string, string>]
} };
export type EventError = {
  eventError: {
    eventName: string,
    rawEvent: string,
    errors: string[],
  }
};
