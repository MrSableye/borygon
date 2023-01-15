import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeJson,
  serializeString,
} from '../parser';
import {
  deserializeUser,
  serializeUser,
  userType,
} from './types';

const userSettingsType = t.type({
  blockChallenges: t.union([t.boolean, t.string]),
  blockPMs: t.union([t.boolean, t.string]),
  ignoreTickets: t.boolean,
  hideBattlesFromTrainerCard: t.boolean,
  blockInvites: t.union([t.boolean, t.string]),
  doNotDisturb: t.boolean,
  blockFriendRequests: t.boolean,
  allowFriendNotifications: t.boolean,
  displayBattlesToFriends: t.boolean,
  hideLogins: t.boolean,
  inviteOnlyNextBattle: t.boolean,
  language: t.union([t.string, t.null]),
});

export const updateUserMessageType = t.type({
  user: userType,
  named: t.boolean,
  avatar: t.string,
  settings: userSettingsType,
});

/**
 * A message that is sent when a user is updated.
 *
 * Serialized example: `|updateuser|~zarel|1|janitor|{}`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "named": true,
 *   "avatar": "burglar-gen1",
 *   "settings": {}
 * }
 * ```
 *
 * @member user The user
 * @member named Whether the user is named or a guest
 * @member avatar The user's avatar
 * @member settings The user's settings
 */
export type UpdateUserMessage = t.TypeOf<typeof updateUserMessageType>;

export const updateUserMessageSchema: KeySchema<UpdateUserMessage> = [
  ['user', deserializeUser, serializeUser],
  ['named', (input: string) => ({ value: input === '1' }), (input: boolean) => ({ value: input ? '1' : '0' })],
  ['avatar', deserializeString, serializeString],
  ['settings', createJsonDeserializer(userSettingsType), serializeJson],
];

export const deserializeUpdateUserMessage = createSchemaDeserializer(
  updateUserMessageType,
  updateUserMessageSchema,
);
export const serializeUpdateUserMessage = createSchemaSerializer(
  updateUserMessageType,
  updateUserMessageSchema,
);
