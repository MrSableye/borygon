import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  Deserializer,
  deserializeString,
  KeySchema,
  Serializer,
  serializeString,
} from '../parser';
import {
  deserializePlayer,
  playerType,
  serializePlayer,
} from './types';

export const badgeDetailsType = t.type({
  threshold: t.number,
  season: t.number,
});

export type BadgeDetails = t.TypeOf<typeof badgeDetailsType>;

export const deserializeBadgeDetails: Deserializer<BadgeDetails> = (input) => {
  const [thresholdText, seasonText] = input.split('-');
  const threshold = +thresholdText;
  const season = +seasonText;

  const errors: string[] = [];

  if (Number.isNaN(threshold)) {
    errors.push(`${thresholdText} is not a number`);
  }

  if (Number.isNaN(season)) {
    errors.push(`${seasonText} is not a number`);
  }

  if (errors.length) {
    return { errors };
  }

  return { value: { threshold, season } };
};

export const serializeBadgeDetails: Serializer<BadgeDetails> = (input) => ({
  value: `${input.threshold}-${input.season}`,
});

export const badgeMessageType = t.type({
  player: playerType,
  type: t.string,
  format: t.string,
  details: badgeDetailsType,
});

/**
 * A message that is sent when a badge is presented.
 *
 * Serialized example: `|badge|p1|gold|gen5ou|3-2`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "type": "gold",
 *   "format": "gen5ou",
 *   "details": {
 *     "threshold": 3,
 *     "season": 2
 *   }
 * }
 * ```
 *
 * @member player The player that has the badge
 * @member type The type of badge
 * @member format The format the badge is awarded for
 * @member details The details associated with the badge
 */
export type BadgeMessage = t.TypeOf<typeof badgeMessageType>;

export const badgeMessageSchema: KeySchema<BadgeMessage> = [
  ['player', deserializePlayer, serializePlayer],
  ['type', deserializeString, serializeString],
  ['format', deserializeString, serializeString],
  ['details', deserializeBadgeDetails, serializeBadgeDetails],
];

export const deserializeBadgeMessage = createSchemaDeserializer(
  badgeMessageType,
  badgeMessageSchema,
  { skipKeywordArguments: true },
);
export const serializeBadgeMessage = createSchemaSerializer(
  badgeMessageType,
  badgeMessageSchema,
);
