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

export const nameTakenMessageType = t.type({
  newUser: userType,
  message: t.string,
});

/* eslint-disable max-len */
/**
 * A message that is sent when a user's name is taken.
 *
 * Serialized example: `|nametaken|~zarel|You need an authentication token to log in as a trusted user.`
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
 *   "message": "You need an authentication token to log in as a trusted user."
 * }
 * ```
 *
 * @member username The user whose name is taken
 * @member message The error message
 */
export type NameTakenMessage = t.TypeOf<typeof nameTakenMessageType>;
/* eslint-enable max-len */

export const nameTakenMessageSchema: KeySchema<NameTakenMessage> = [
  ['newUser', deserializeUser, serializeUser],
  ['message', deserializeString, serializeString],
];

export const deserializeNameTakenMessage = createSchemaDeserializer(
  nameTakenMessageType,
  nameTakenMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeNameTakenMessage = createSchemaSerializer(
  nameTakenMessageType,
  nameTakenMessageSchema,
);
