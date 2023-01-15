import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
  serializeJson,
} from '../parser';

const challengesType = t.type({
  challengesFrom: t.record(t.string, t.string),
  challengeTo: t.union([
    t.type({
      player: t.string,
      format: t.string,
    }),
    t.null,
  ]),
});

export const updateChallengesMessageType = t.type({
  challenges: challengesType,
});

/* eslint-disable max-len */
/**
 * A message that is sent when a user's challenges are updated.
 *
 * Serialized example: `|updatechallenges|{"challengesFrom":{"zarel":"gen9ou", "boblak": "gen1ou"},"challengeTo":{"to":"mrsableye":"gen9ou"}}`
 *
 * Deserialized example:
 * ```json
 * {
 *   "challengesFrom": {
 *     "zarel": "gen9ou",
 *     "boblak": "gen1ou"
 *   },
 *   "challengeTo": {
 *     "to": "mrsableye",
 *     "format": "gen9ou"
 *   }
 * }
 * ```
 *
 * @member challenges The updated challenges JSON
 */
export type UpdateChallengesMessage = t.TypeOf<typeof updateChallengesMessageType>;
/* eslint-enable max-len */

export const updateChallengesMessageSchema: KeySchema<UpdateChallengesMessage> = [
  ['challenges', createJsonDeserializer(challengesType), serializeJson],
];

export const deserializeUpdateChallengesMessage = createSchemaDeserializer(
  updateChallengesMessageType,
  updateChallengesMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeUpdateChallengesMessage = createSchemaSerializer(
  updateChallengesMessageType,
  updateChallengesMessageSchema,
);
