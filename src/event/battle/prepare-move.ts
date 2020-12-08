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

// `|-prepare|ATTACKER|MOVE`
// > The `ATTACKER` Pokémon is preparing to use a charge `MOVE` on an unknown target.
// > (For example: Dig, Fly).
// `|-prepare|ATTACKER|MOVE|DEFENDER`
// > The `ATTACKER` Pokémon is preparing to use a charge `MOVE` on the `DEFENDER`.
// > (For example: Sky Drop).
export const prepareMoveEventType = t.intersection([
  t.type({
    attacker: pokemonType,
    move: t.string,
  }),
  t.partial({
    defender: pokemonType,
  }),
]);
export type PrepareMoveEvent = t.TypeOf<typeof prepareMoveEventType>;
export const prepareMoveEventSchema: KeySchema<PrepareMoveEvent> = [
  ['attacker', parsePokemon],
  ['move', parseString],
  ['defender', createOptionalParser(parsePokemon)],
];
export const parsePrepareMoveEvent = createSchemaParser(
  prepareMoveEventType,
  prepareMoveEventSchema,
);
