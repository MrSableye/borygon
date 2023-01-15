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
  deserializePlayer,
  deserializeUser,
  playerType,
  serializePlayer,
  serializeUser,
  userType,
} from './types';

export const playerMessageType = t.intersection([
  t.type({
    player: playerType,
  }),
  t.partial({
    user: userType,
    avatar: t.string,
    rating: t.union([t.number, t.undefined]),
  }),
]);

/**
 * A message that is sent when a user is announced in a battle.
 *
 * Serialized example: `|player|p1|Mr. Sableye|burglar-gen1|1082`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "username": {
 *     "group": "",
 *     "username: "Mr. Sableye",
 *     "isAway": false,
 *     "status": ""
 *   },
 *   "avatar": "burglar-gen1",
 *   "rating": 1082
 * }
 * ```
 *
 * @member player The player being announced
 * @member user The user
 * @member avatar The player's avatar
 * @member rating The player's rating
 */
export type PlayerMessage = t.TypeOf<typeof playerMessageType>;

export const playerMessageSchema: KeySchema<PlayerMessage> = [
  ['player', deserializePlayer, serializePlayer],
  ['user', createOptionalDeserializer(deserializeUser), createOptionalSerializer(serializeUser)],
  ['avatar', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
  ['rating', createOptionalDeserializer(deserializeNumber), createOptionalSerializer(serializeNumber)],
];

export const deserializePlayerMessage = createSchemaDeserializer(
  playerMessageType,
  playerMessageSchema,
);
export const serializePlayerMessage = createSchemaSerializer(
  playerMessageType,
  playerMessageSchema,
  { omitTrailingUndefinedParts: true },
);
