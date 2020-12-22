import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-copyboost|SOURCE|TARGET`
// > Copy the boosts from `SOURCE` Pokémon to `TARGET` Pokémon (For example: Psych
// > Up).
export const copyBoostEventType = t.type({
  source: pokemonType,
  target: pokemonType,
});
export type CopyBoostEvent = t.TypeOf<typeof copyBoostEventType>;
export const copyBoostEventSchema: KeySchema<CopyBoostEvent> = [
  ['source', parsePokemon],
  ['target', parsePokemon],
];
export const parseCopyBoostEvent = createSchemaParser(copyBoostEventType, copyBoostEventSchema);
