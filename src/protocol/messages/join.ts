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

export const joinMessageType = t.type({
  user: userType,
});

/**
 * A message that is sent when a user joins a room.
 *
 * Serialized example: `|j|~zarel`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   }
 * }
 * ```
 *
 * @member user The user that joined a room
 */
export type JoinMessage = t.TypeOf<typeof joinMessageType>;

export const joinMessageSchema: KeySchema<JoinMessage> = [
  ['user', deserializeUser, serializeUser],
];

export const deserializeJoinMessage = createSchemaDeserializer(joinMessageType, joinMessageSchema);
export const serializeJoinMessage = createSchemaSerializer(joinMessageType, joinMessageSchema);
