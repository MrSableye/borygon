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

// `|-singleturn|POKEMON|MOVE`
// > The Pokémon `POKEMON` used move `MOVE` which causes a temporary effect lasting
// > the duration of the turn. (For example: Protect, Focus Punch, Roost).
// |-singleturn|p1a: test|Protect
export const singleTurnMoveEventType = t.type({
  pokemon: pokemonType,
  move: t.string,
});
export type SingleTurnMoveEvent = t.TypeOf<typeof singleTurnMoveEventType>;
export const singleTurnMoveEventSchema: KeySchema<SingleTurnMoveEvent> = [
  ['pokemon', parsePokemon],
  ['move', parseString],
];
export const parseSingleTurnMoveEvent = createSchemaParser(
  singleTurnMoveEventType,
  singleTurnMoveEventSchema,
);
