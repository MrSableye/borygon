import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-clearnegativeboost|POKEMON`
// > Clear the negative boosts from the target Pokémon `POKEMON`. (For example:
// > usually as the result of a `[zeffect]`).
export const clearNegativeBoostEventType = t.type({
  pokemon: pokemonType,
});
export type ClearNegativeBoostEvent = t.TypeOf<typeof clearNegativeBoostEventType>;
export const clearNegativeBoostEventSchema: KeySchema<ClearNegativeBoostEvent> = [
  ['pokemon', parsePokemon],
];
export const parseClearNegativeBoostEvent = createSchemaParser(
  clearNegativeBoostEventType,
  clearNegativeBoostEventSchema,
);
