import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-clearboost|POKEMON`
// > Clears all of the boosts of the target `POKEMON`. (For example: Clear Smog).
export const clearBoostEventType = t.type({
  pokemon: pokemonType,
});
export type ClearBoostEvent = t.TypeOf<typeof clearBoostEventType>;
export const clearBoostEventSchema: KeySchema<ClearBoostEvent> = [
  ['pokemon', parsePokemon],
];
export const parseClearBoostEvent = createSchemaParser(clearBoostEventType, clearBoostEventSchema);
