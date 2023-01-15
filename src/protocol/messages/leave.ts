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

export const leaveMessageType = t.type({
  user: userType,
});

/**
 * A message that is sent when a user leaves a room.
 *
 * Serialized example: `|l|~zarel`
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
 * @member user The user that left a room
 */
export type LeaveMessage = t.TypeOf<typeof leaveMessageType>;

export const leaveMessageSchema: KeySchema<LeaveMessage> = [
  ['user', deserializeUser, serializeUser],
];

export const deserializeLeaveMessage = createSchemaDeserializer(
  leaveMessageType,
  leaveMessageSchema,
);
export const serializeLeaveMessage = createSchemaSerializer(
  leaveMessageType,
  leaveMessageSchema,
);
