import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|faint|POKEMON`
// > The Pokémon `POKEMON` has fainted.
export const faintEventType = t.type({
  pokemon: pokemonType,
});
export type FaintEvent = t.TypeOf<typeof faintEventType>;
export const faintEventSchema: KeySchema<FaintEvent> = [
  ['pokemon', parsePokemon],
];
export const parseFaintEvent = createSchemaParser(faintEventType, faintEventSchema);
