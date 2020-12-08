import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-clearpositiveboost|TARGET|POKEMON|EFFECT`
// > Clear the positive boosts from the `TARGET` Pokémon due to an `EFFECT` of the
// > `POKEMON` Pokémon. (For example: 'move: Spectral Thief').
export const clearPositiveBoostEventType = t.type({
  target: pokemonType,
  pokemon: pokemonType,
  effect: t.string,
});
export type ClearPositiveBoostEvent = t.TypeOf<typeof clearPositiveBoostEventType>;
export const clearPositiveBoostEventSchema: KeySchema<ClearPositiveBoostEvent> = [
  ['target', parsePokemon],
  ['pokemon', parsePokemon],
  ['effect', parseString],
];
export const parseClearPositiveBoostEvent = createSchemaParser(
  clearPositiveBoostEventType,
  clearPositiveBoostEventSchema,
);
