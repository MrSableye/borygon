import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
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

export const hideLinesMessageType = t.intersection([
  t.type({
    type: t.string,
    user: userType,
  }),
  t.partial({
    lineCount: t.number,
  }),
]);

/**
 * A message that is sent a user's messages are hidden or deleted.
 *
 * Serialized example: `|hidelines|unlink|zarel|2`
 *
 * Deserialized example:
 * ```json
 * {
 *   "type": "unlink",
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
 * @member type The method of obscuring messages
 * @member user The user whose messages were obscured
 * @member lineCount The number of messages obscured
 */
export type HideLinesMessage = t.TypeOf<typeof hideLinesMessageType>;

export const hideLinesMessageSchema: KeySchema<HideLinesMessage> = [
  ['type', deserializeString, serializeString],
  ['user', deserializeUser, serializeUser],
  ['lineCount', createOptionalDeserializer(deserializeNumber), createOptionalSerializer(serializeNumber)],
];

export const deserializeHideLinesMessage = createSchemaDeserializer(
  hideLinesMessageType,
  hideLinesMessageSchema,
);
export const serializeHideLinesMessage = createSchemaSerializer(
  hideLinesMessageType,
  hideLinesMessageSchema,
  { omitTrailingUndefinedParts: true },
);
