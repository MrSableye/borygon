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

export const nameChangeMessageType = t.type({
  newUser: userType,
  oldUserId: t.string,
});

/**
 * A message that is sent when a user changes their name.
 *
 * Serialized example: `|n|~zarel|mrsableye`
 *
 * Deserialized example:
 * ```json
 * {
 *   "newUser": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "oldUserId": "mrsableye"
 * }
 * ```
 *
 * @member newUser The user's new name
 * @member oldUserId The user's old user id
 */
export type NameChangeMessage = t.TypeOf<typeof nameChangeMessageType>;

export const nameChangeMessageSchema: KeySchema<NameChangeMessage> = [
  ['newUser', deserializeUser, serializeUser],
  ['oldUserId', deserializeString, serializeString],
];

export const deserializeNameChangeMessage = createSchemaDeserializer(
  nameChangeMessageType,
  nameChangeMessageSchema,
);
export const serializeNameChangeMessage = createSchemaSerializer(
  nameChangeMessageType,
  nameChangeMessageSchema,
);
