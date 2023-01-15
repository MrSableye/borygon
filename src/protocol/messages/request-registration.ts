import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeUser,
  serializeUser,
  userType,
} from './types';

export const requestRegistrationMessageType = t.type({
  user: userType,
});

/**
 * A message that is sent when a user is asked to register.
 *
 * Serialized example: `|askreg| mungojingo92`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "group": " ",
 *     "username": "mungojingo92",
 *     "isAway": false,
 *     "status": ""
 *   }
 * }
 * ```
 *
 * @member user The user that has been requested to register
 */
export type RequestRegistrationMessage = t.TypeOf<typeof requestRegistrationMessageType>;

export const requestRegistrationMessageSchema: KeySchema<RequestRegistrationMessage> = [
  ['user', deserializeUser, serializeUser],
];

export const deserializeRequestRegistrationMessage = createSchemaDeserializer(
  requestRegistrationMessageType,
  requestRegistrationMessageSchema,
);
export const serializeRequestRegistrationMessage = createSchemaSerializer(
  requestRegistrationMessageType,
  requestRegistrationMessageSchema,
);
