import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeGameType,
  gameTypeType,
  serializeGameType,
} from './types';

export const gameTypeMessageType = t.type({
  gameType: gameTypeType,
});

/**
 * A message that is sent when a battle's game type is declared.
 *
 * Serialized example: `|gametype|doubles`
 *
 * Deserialized example:
 * ```json
 * {
 *   "gameType": "doubles"
 * }
 * ```
 *
 * @member errorType The game type
 */
export type GameTypeMessage = t.TypeOf<typeof gameTypeMessageType>;

export const gameTypeMessageSchema: KeySchema<GameTypeMessage> = [
  ['gameType', deserializeGameType, serializeGameType],
];

export const deserializeGameTypeMessage = createSchemaDeserializer(
  gameTypeMessageType,
  gameTypeMessageSchema,
);
export const serializeGameTypeMessage = createSchemaSerializer(
  gameTypeMessageType,
  gameTypeMessageSchema,
);
