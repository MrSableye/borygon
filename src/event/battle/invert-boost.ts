import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-invertboost|POKEMON`
// > Invert the boosts of the target Pokémon `POKEMON`. (For example: Topsy-Turvy).
export const invertBoostEventType = t.type({
  pokemon: pokemonType,
});
export type InvertBoostEvent = t.TypeOf<typeof invertBoostEventType>;
export const invertBoostEventSchema: KeySchema<InvertBoostEvent> = [
  ['pokemon', parsePokemon],
];
export const parseInvertBoostEvent = createSchemaParser(
  invertBoostEventType,
  invertBoostEventSchema,
);
