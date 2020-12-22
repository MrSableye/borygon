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

// `|-fail|POKEMON|ACTION`

// > The specified `ACTION` has failed against the `POKEMON` targetted. The
// > `ACTION` in question should be a move that fails due to its own mechanics.
// > Moves (or effect activations) that fail because they're blocked by another
// > effect should use `-block` instead.
// |-fail|p1a: Gothitelle
export const failEventType = t.type({
  pokemon: pokemonType,
  action: t.string,
});
export type FailEvent = t.TypeOf<typeof failEventType>;
export const failEventSchema: KeySchema<FailEvent> = [
  ['pokemon', parsePokemon],
  ['action', parseString],
];
export const parseFailEvent = createSchemaParser(failEventType, failEventSchema);
