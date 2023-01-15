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

export const battleMessageType = t.type({
  roomId: t.string,
  user1: userType,
  user2: userType,
});

/**
 * A message that is sent when a battle is announced in a chat room.
 *
 * Serialized example: `|battle|ou-1|~zarel| captainbruh69`
 *
 * Deserialized example:
 * ```json
 * {
 *   "roomId": "lobby",
 *   "user1": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "user2": {
 *     "group": " ",
 *     "username": "captainbruh69",
 *     "isAway": false,
 *     "status": ""
 *   }
 * }
 * ```
 *
 * @member roomId The room id of the battle
 * @member user1 The first user in the battle
 * @member user2 The second user in the battle
 */
export type BattleMessage = t.TypeOf<typeof battleMessageType>;

export const battleMessageSchema: KeySchema<BattleMessage> = [
  ['roomId', deserializeString, serializeString],
  ['user1', deserializeUser, serializeUser],
  ['user2', deserializeUser, serializeUser],
];

export const deserializeBattleMessage = createSchemaDeserializer(
  battleMessageType,
  battleMessageSchema,
  { skipKeywordArguments: true },
);
export const serializeBattleMessage = createSchemaSerializer(
  battleMessageType,
  battleMessageSchema,
);
