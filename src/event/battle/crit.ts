import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-crit|POKEMON`
// > A move has dealt a critical hit against the `POKEMON`.
export const critEventType = t.type({
  pokemon: pokemonType,
});
export type CritEvent = t.TypeOf<typeof critEventType>;
export const critEventSchema: KeySchema<CritEvent> = [
  ['pokemon', parsePokemon],
];
export const parseCritEvent = createSchemaParser(critEventType, critEventSchema);
