import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const singleTurnMoveMessageType = t.type({
  pokemon: pokemonType,
  move: t.string,
});

/**
 * A message that is sent when a Pokémon's move causes an effect lasting the turn.
 *
 * Serialized example: `|-singleturn|p1a: Landorus-Therian|move: Protect`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "move": "move: Protect"
 * }
 * ```
 *
 * @member pokemon The user of the move
 * @member move The move
 */
export type SingleTurnMoveMessage = t.TypeOf<typeof singleTurnMoveMessageType>;

export const singleTurnMoveMessageSchema: KeySchema<SingleTurnMoveMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['move', deserializeString, serializeString],
];

export const deserializeSingleTurnMoveMessage = createSchemaDeserializer(
  singleTurnMoveMessageType,
  singleTurnMoveMessageSchema,
);
export const serializeSingleTurnMoveMessage = createSchemaSerializer(
  singleTurnMoveMessageType,
  singleTurnMoveMessageSchema,
);
