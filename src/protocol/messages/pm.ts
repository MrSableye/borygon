import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import { deserializeUser, serializeUser, userType } from './types';

export const pmMessageType = t.type({
  sender: userType,
  receiver: userType,
  message: t.string,
});

/**
 * A message that is sent when a user private messages another user.
 *
 * Serialized example: `|pm|~zarel| Mr. Sableye|nice code!`
 *
 * Deserialized example:
 * ```json
 * {
 *   "sender": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "receiver": {
 *     "group": " ",
 *     "username": "Mr. Sableye",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "message": "nice code!"
 * }
 * ```
 *
 * @member sender The sender of the message
 * @member receiver The receiver of the message
 * @member message The message
 */
export type PmMessage = t.TypeOf<typeof pmMessageType>;

export const pmMessageSchema: KeySchema<PmMessage> = [
  ['sender', deserializeUser, serializeUser],
  ['receiver', deserializeUser, serializeUser],
  ['message', deserializeString, serializeString],
];

export const deserializePmMessage = createSchemaDeserializer(
  pmMessageType,
  pmMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializePmMessage = createSchemaSerializer(
  pmMessageType,
  pmMessageSchema,
);
