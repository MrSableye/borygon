import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import { deserializeUser, serializeUser, userType } from './types';

export const winMessageType = t.type({
  username: userType,
});

/**
 * A message that is sent when a user wins a battle.
 *
 * Serialized example: `|win|zarel`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "group": "",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   }
 * }
 * ```
 *
 * @member username The user that won the battle
 */
export type WinMessage = t.TypeOf<typeof winMessageType>;

export const winMessageSchema: KeySchema<WinMessage> = [
  ['username', deserializeUser, serializeUser],
];

export const deserializeWinMessage = createSchemaDeserializer(winMessageType, winMessageSchema);
export const serializeWinMessage = createSchemaSerializer(winMessageType, winMessageSchema);
