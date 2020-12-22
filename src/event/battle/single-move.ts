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

// `|-singlemove|POKEMON|MOVE`
// > The Pokémon `POKEMON` used move `MOVE` which causes a temporary effect lasting
// > the duration of the move. (For example: Grudge, Destiny Bond).
export const singleMoveEventType = t.type({
  pokemon: pokemonType,
  move: t.string,
});
export type SingleMoveEvent = t.TypeOf<typeof singleMoveEventType>;
export const singleMoveEventSchema: KeySchema<SingleMoveEvent> = [
  ['pokemon', parsePokemon],
  ['move', parseString],
];
export const parseSingleMoveEvent = createSchemaParser(singleMoveEventType, singleMoveEventSchema);
