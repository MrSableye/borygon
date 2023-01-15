import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';
import {
  deserializePlayer,
  playerType,
  serializePlayer,
} from './types';

export const teamSizeMessageType = t.type({
  player: playerType,
  number: t.number,
});

/**
 * A message that is sent when a player's team size changes.
 *
 * Serialized example: `|teamsize|p1|6`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "number": 6
 * }
 * ```
 *
 * @member player The player whose team size changed
 * @member number The player's new team size
 */
export type TeamSizeMessage = t.TypeOf<typeof teamSizeMessageType>;

export const teamSizeMessageSchema: KeySchema<TeamSizeMessage> = [
  ['player', deserializePlayer, serializePlayer],
  ['number', deserializeNumber, serializeNumber],
];

export const deserializeTeamSizeMessage = createSchemaDeserializer(
  teamSizeMessageType,
  teamSizeMessageSchema,
);
export const serializeTeamSizeMessage = createSchemaSerializer(
  teamSizeMessageType,
  teamSizeMessageSchema,
);
