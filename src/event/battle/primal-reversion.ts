import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-primal|POKEMON`
// > The Pokémon `POKEMON` has reverted to its primal forme.
export const primalReversionEventType = t.type({
  pokemon: pokemonType,
});
export type PrimalReversionEvent = t.TypeOf<typeof primalReversionEventType>;
export const primalReversionEventSchema: KeySchema<PrimalReversionEvent> = [
  ['pokemon', parsePokemon],
];
export const parsePrimalReversionEvent = createSchemaParser(
  primalReversionEventType,
  primalReversionEventSchema,
);
