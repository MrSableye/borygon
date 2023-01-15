import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  deserializeString,
  KeySchema,
  serializeNumber,
  serializeString,
} from '../parser';
import {
  deserializeUser,
  serializeUser,
  userType,
} from './types';

export const timestampChatMessageType = t.type({
  timestamp: t.number,
  user: userType,
  message: t.string,
});

/**
 * A message that is sent when a chat message is sent with a timestamp.
 *
 * Serialized example: `|c:|1|~zarel|I can code!`
 *
 * Deserialized example:
 * ```json
 * {
 *   "timestamp": 1,
 *   "user": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "message": "I can code!"
 * }
 * ```
 *
 * @member timestamp The timestamp delta
 * @member user The user that sent the message
 * @member message The chat message
 */
export type TimestampChatMessage = t.TypeOf<typeof timestampChatMessageType>;

export const timestampChatMessageSchema: KeySchema<TimestampChatMessage> = [
  ['timestamp', deserializeNumber, serializeNumber],
  ['user', deserializeUser, serializeUser],
  ['message', deserializeString, serializeString],
];

export const deserializeTimestampChatMessage = createSchemaDeserializer(
  timestampChatMessageType,
  timestampChatMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeTimestampChatMessage = createSchemaSerializer(
  timestampChatMessageType,
  timestampChatMessageSchema,
);
