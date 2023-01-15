import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializeUser,
  serializeUser,
  userType,
} from './types';

export const chatMessageType = t.type({
  user: userType,
  message: t.string,
});

/**
 * A message that is sent when a chat message is sent.
 *
 * Serialized example: `|chat|~zarel|I can code!`
 *
 * Deserialized example:
 * ```json
 * {
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
 * @member user The user that sent the message
 * @member message The chat message
 */
export type ChatMessage = t.TypeOf<typeof chatMessageType>;

export const chatMessageSchema: KeySchema<ChatMessage> = [
  ['user', deserializeUser, serializeUser],
  ['message', deserializeString, serializeString],
];

export const deserializeChatMessage = createSchemaDeserializer(
  chatMessageType,
  chatMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeChatMessage = createSchemaSerializer(
  chatMessageType,
  chatMessageSchema,
);
