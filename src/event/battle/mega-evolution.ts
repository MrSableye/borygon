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

// `|-mega|POKEMON|MEGASTONE`
// > The Pokémon `POKEMON` used `MEGASTONE` to Mega Evolve.
export const megaEvolutionEventType = t.type({
  pokemon: pokemonType,
  megaStone: t.string,
});
export type MegaEvolutionEvent = t.TypeOf<typeof megaEvolutionEventType>;
export const megaEvolutionEventSchema: KeySchema<MegaEvolutionEvent> = [
  ['pokemon', parsePokemon],
  ['megaStone', parseString],
];
export const parseMegaEvolutionEvent = createSchemaParser(
  megaEvolutionEventType,
  megaEvolutionEventSchema,
);
