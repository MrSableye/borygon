import * as t from 'io-ts';
import {
  createArrayParser,
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  parseStat,
  pokemonType,
  statType,
} from './types';

// `|-swapboost|SOURCE|TARGET|STATS`
// > Swaps the boosts from `STATS` between the `SOURCE` Pokémon and `TARGET`
// > Pokémon. `STATS` takes the form of a comma-separated list of `STAT`
// > abbreviations as described in `-boost`. (For example: Guard Swap, Heart
// > Swap).
export const swapBoostEventType = t.type({
  source: pokemonType,
  target: pokemonType,
  stats: t.array(statType),
});
export type SwapBoostEvent = t.TypeOf<typeof swapBoostEventType>;
export const swapBoostEventSchema: KeySchema<SwapBoostEvent> = [
  ['source', parsePokemon],
  ['target', parsePokemon],
  ['stats', createArrayParser(parseStat)],
];
export const parseSwapBoostEvent = createSchemaParser(swapBoostEventType, swapBoostEventSchema);
