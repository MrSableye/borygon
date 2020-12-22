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

// `|move|POKEMON|MOVE|TARGET`
// > The specified Pokémon has used move `MOVE` at `TARGET`. If a move has
// > multiple targets or no target, `TARGET` should be ignored. If a move
// > targets a side, `TARGET` will be a (possibly fainted) Pokémon on that
// > side.
// >
// > If `|[miss]` is present, the move missed.
// >
// > If `|[still]` is present, the move should not animate
// >
// > `|[anim] MOVE2` tells the client to use the animation of `MOVE2` instead
// > of `MOVE` when displaying to the client.

// interface MoveEvent {
//   user: Pokemon;
//   target: Pokemon;
//   move: string;
//   // missed: boolean;
//   // still: boolean;
//   // animation?: string;
// }
export const moveEventType = t.type({
  user: pokemonType,
  target: pokemonType,
  move: t.string,
});
export type MoveEvent = t.TypeOf<typeof moveEventType>;
export const moveEventSchema: KeySchema<MoveEvent> = [
  ['user', parsePokemon],
  ['move', parseString],
  ['target', parsePokemon],
];
export const parseMoveEvent = createSchemaParser(moveEventType, moveEventSchema);
