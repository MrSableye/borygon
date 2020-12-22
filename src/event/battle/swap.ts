import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|swap|POKEMON|POSITION`
// > Moves already active `POKEMON` to active field `POSITION` where the
// > leftmost position is 0 and each position to the right counts up by 1.
export const swapEventType = t.type({
  pokemon: pokemonType,
  position: t.number,
});
export type SwapEvent = t.TypeOf<typeof swapEventType>;
export const swapEventSchema: KeySchema<SwapEvent> = [
  ['pokemon', parsePokemon],
  ['position', parseNumber],
];
export const parseSwapEvent = createSchemaParser(swapEventType, swapEventSchema);
