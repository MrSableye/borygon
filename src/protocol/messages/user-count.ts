import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const userCountMessageType = t.type({
  usercount: t.number,
});

/**
 * A message that is sent when the server's user count is updated.
 *
 * Serialized example: `|usercount|13`
 *
 * Deserialized example:
 * ```json
 * {
 *   "usercount": 13
 * }
 * ```
 *
 * @member usercount The number of users on the server
 */
export type UserCountMessage = t.TypeOf<typeof userCountMessageType>;

export const userCountMessageSchema: KeySchema<UserCountMessage> = [
  ['usercount', deserializeNumber, serializeNumber],
];

export const deserializeUserCountMessage = createSchemaDeserializer(
  userCountMessageType,
  userCountMessageSchema,
);
export const serializeUserCountMessage = createSchemaSerializer(
  userCountMessageType,
  userCountMessageSchema,
);
