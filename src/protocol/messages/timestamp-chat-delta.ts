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

export const timestampChatDeltaMessageType = t.type({
  timestamp: t.number,
  user: userType,
  message: t.string,
});

/**
 * A message that is sent when a chat message is sent with a timestamp delta.
 *
 * Serialized example: `|tc|1|~zarel|I can code!`
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
export type TimestampChatDeltaMessage = t.TypeOf<typeof timestampChatDeltaMessageType>;

export const timestampChatDeltaMessageSchema: KeySchema<TimestampChatDeltaMessage> = [
  ['timestamp', deserializeNumber, serializeNumber],
  ['user', deserializeUser, serializeUser],
  ['message', deserializeString, serializeString],
];

export const deserializeTimestampChatDeltaMessage = createSchemaDeserializer(
  timestampChatDeltaMessageType,
  timestampChatDeltaMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeTimestampChatDeltaMessage = createSchemaSerializer(
  timestampChatDeltaMessageType,
  timestampChatDeltaMessageSchema,
);
