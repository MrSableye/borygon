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

export const singleMoveMessageType = t.type({
  pokemon: pokemonType,
  move: t.string,
});

/**
 * A message that is sent when a Pokémon's move causes an effect lasting the duration of the move.
 *
 * Serialized example: `|-singlemove|p1a: Qwilfish|Destiny Bond`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Qwilfish",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "move": "Destiny Bond"
 * }
 * ```
 *
 * @member pokemon The user of the move
 * @member move The move
 */
export type SingleMoveMessage = t.TypeOf<typeof singleMoveMessageType>;

export const singleMoveMessageSchema: KeySchema<SingleMoveMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['move', deserializeString, serializeString],
];

export const deserializeSingleMoveMessage = createSchemaDeserializer(
  singleMoveMessageType,
  singleMoveMessageSchema,
);
export const serializeSingleMoveMessage = createSchemaSerializer(
  singleMoveMessageType,
  singleMoveMessageSchema,
);
