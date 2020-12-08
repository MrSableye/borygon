import * as t from 'io-ts';
import {
  createOptionalParser,
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|cant|POKEMON|REASON` or `|cant|POKEMON|REASON|MOVE`

// > The Pokémon `POKEMON` could not perform a move because of the indicated
// > `REASON` (such as paralysis, Disable, etc). Sometimes, the move it was
// > trying to use is given.
export const cantEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    reason: t.string,
  }),
  t.partial({
    move: t.string,
  }),
]);
export type CantEvent = t.TypeOf<typeof cantEventType>;
export const cantEventSchema: KeySchema<CantEvent> = [
  ['pokemon', parsePokemon],
  ['reason', parseString],
  ['move', createOptionalParser(parseString)],
];
export const parseCantEvent = createSchemaParser(cantEventType, cantEventSchema);
