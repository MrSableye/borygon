import * as t from 'io-ts';
import {
  createOptionalParser,
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-miss|SOURCE|TARGET`
// > The move used by the `SOURCE` Pokémon missed (maybe absent) the `TARGET`
// > Pokémon.
export const missEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
  }),
  t.partial({
    target: pokemonType,
  }),
]);
export type MissEvent = t.TypeOf<typeof missEventType>;
export const missEventSchema: KeySchema<MissEvent> = [
  ['pokemon', parsePokemon],
  ['target', createOptionalParser(parsePokemon)],
];
export const parseMissEvent = createSchemaParser(missEventType, missEventSchema);
