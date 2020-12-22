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

// `|-curestatus|POKEMON|STATUS`
// > The Pokémon `POKEMON` has recovered from `STATUS`.
export const cureStatusEventType = t.type({
  pokemon: pokemonType,
  status: statusType,
});
export type CureStatusEvent = t.TypeOf<typeof cureStatusEventType>;
export const cureStatusEventSchema: KeySchema<CureStatusEvent> = [
  ['pokemon', parsePokemon],
  ['status', parseStatus],
];
export const parseCureStatusEvent = createSchemaParser(cureStatusEventType, cureStatusEventSchema);
