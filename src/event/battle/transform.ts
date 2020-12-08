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

// `|-transform|POKEMON|SPECIES`
// > The Pokémon `POKEMON` has transformed into `SPECIES` by the move Transform or
// > the ability Imposter.
export const transformEventType = t.type({
  pokemon: pokemonType,
  species: t.string,
});
export type TransformEvent = t.TypeOf<typeof transformEventType>;
export const transformEventSchema: KeySchema<TransformEvent> = [
  ['pokemon', parsePokemon],
  ['species', parseString],
];
export const parseTransformEvent = createSchemaParser(transformEventType, transformEventSchema);
