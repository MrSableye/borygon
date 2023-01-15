import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const challengeMessageType = t.type({
  keyId: t.string,
  challenge: t.string,
});

/**
 * A message that is sent when a challenge is sent to the user for login.
 *
 * Serialized example: `|challstr|4|DEADBEEFDEADBEEFDEADBEEF`
 *
 * Deserialized example:
 * ```json
 * {
 *   "keyId": 4,
 *   "challenge": "DEADBEEFDEADBEEFDEADBEEF"
 * }
 * ```
 *
 * @member keyId The login server key id
 * @member challenge The challenge string
 */
export type ChallengeMessage = t.TypeOf<typeof challengeMessageType>;

export const challengeMessageSchema: KeySchema<ChallengeMessage> = [
  ['keyId', deserializeString, serializeString],
  ['challenge', deserializeString, serializeString],
];

export const deserializeChallengeMessage = createSchemaDeserializer(
  challengeMessageType,
  challengeMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeChallengeMessage = createSchemaSerializer(
  challengeMessageType,
  challengeMessageSchema,
);
