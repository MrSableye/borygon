import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-resisted|POKEMON`
// > A move was not very effective against the `POKEMON`.
export const resistedEventType = t.type({
  pokemon: pokemonType,
});
export type ResistedEvent = t.TypeOf<typeof resistedEventType>;
export const resistedEventSchema: KeySchema<ResistedEvent> = [
  ['pokemon', parsePokemon],
];
export const parseResistedEvent = createSchemaParser(resistedEventType, resistedEventSchema);
