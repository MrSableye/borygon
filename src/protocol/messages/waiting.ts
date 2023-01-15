import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const waitingMessageType = t.type({
  source: pokemonType,
  target: pokemonType,
});

/**
 * A message that is sent when a Pokémon used a move and is waiting for another Pokémon.
 *
 * Serialized example: `|-waiting|p1a: Charizard|p1b: Blastoise`
 *
 * Deserialized example:
 * ```json
 * {
 *   "source": {
 *     "name": "Charizard",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "target": {
 *     "name": "Blastoise",
 *     "player": "p1",
 *     "subPosition": "b"
 *   }
 * }
 * ```
 *
 * @member source The user of the move
 * @member target The Pokémon being waited on
 */
export type WaitingMessage = t.TypeOf<typeof waitingMessageType>;

export const waitingMessageSchema: KeySchema<WaitingMessage> = [
  ['source', deserializePokemon, serializePokemon],
  ['target', deserializePokemon, serializePokemon],
];

export const deserializeWaitingMessage = createSchemaDeserializer(
  waitingMessageType,
  waitingMessageSchema,
);
export const serializeWaitingMessage = createSchemaSerializer(
  waitingMessageType,
  waitingMessageSchema,
);
