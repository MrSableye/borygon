import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  parseStatus,

  pokemonType,

  statusType,
} from './types';

// `|-status|POKEMON|STATUS`
// > The Pokémon `POKEMON` has been inflicted with `STATUS`.
export const statusEventType = t.type({
  pokemon: pokemonType,
  status: statusType,
});
export type StatusEvent = t.TypeOf<typeof statusEventType>;
export const statusEventSchema: KeySchema<StatusEvent> = [
  ['pokemon', parsePokemon],
  ['status', parseStatus],
];
export const parseStatusEvent = createSchemaParser(statusEventType, statusEventSchema);
