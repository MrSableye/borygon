import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';
import {
  deserializeUser,
  serializeUser,
  userType,
} from './types';

export const unlinkMessageType = t.type({
  user: userType,
  lineCount: t.number,
});

/**
 * A message that is sent a user's messages are hidden.
 *
 * Serialized example: `|unlink|zarel|2`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "group": " ",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "lineCount": 2
 * }
 * ```
 *
 * @member user The user whose messages were hidden
 * @member lineCount The number of messages hidden
 */
export type UnlinkMessage = t.TypeOf<typeof unlinkMessageType>;

export const unlinkEventTypeSchema: KeySchema<UnlinkMessage> = [
  ['user', deserializeUser, serializeUser],
  ['lineCount', deserializeNumber, serializeNumber],
];

export const deserializeUnlinkMessage = createSchemaDeserializer(
  unlinkMessageType,
  unlinkEventTypeSchema,
);
export const serializeUnlinkMessage = createSchemaSerializer(
  unlinkMessageType,
  unlinkEventTypeSchema,
);
