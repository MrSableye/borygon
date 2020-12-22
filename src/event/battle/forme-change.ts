import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  hpType,
  parseHpAndStatus,
  parsePokemon,
  parsePokemonDetails,
  pokemonDetailsType,
  pokemonType,
  statusType,
} from './types';

// `|-formechange|POKEMON|SPECIES|HP STATUS`
export const formeChangeEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hp: hpType,
    status: statusType,
  }),
]);
export type FormeChangeEvent = t.TypeOf<typeof formeChangeEventType>;
export const formeChangeEventSchema: KeySchema<FormeChangeEvent> = [
  ['pokemon', parsePokemon],
  ['details', parsePokemonDetails],
  { partialParser: parseHpAndStatus },
];
export const parseFormeChangeEvent = createSchemaParser(
  formeChangeEventType,
  formeChangeEventSchema,
);
