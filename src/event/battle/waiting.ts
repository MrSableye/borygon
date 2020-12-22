import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-waiting|SOURCE|TARGET`
// > The `SOURCE` Pokémon has used a move and is waiting for the `TARGET` Pokémon
// > (For example: Fire Pledge).
export const waitingEventType = t.type({
  source: pokemonType,
  target: pokemonType,
});
export type WaitingEvent = t.TypeOf<typeof waitingEventType>;
export const waitingEventSchema: KeySchema<WaitingEvent> = [
  ['source', parsePokemon],
  ['target', parsePokemon],
];
export const parseWaitingEvent = createSchemaParser(waitingEventType, waitingEventSchema);
