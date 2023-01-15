import { describe, expect, it } from '@jest/globals';
import { ChallengeMessage, deserializeChallengeMessage, serializeChallengeMessage } from './challenge';
import { assertResultValue } from '../test-utilities';

describe('ChallengeMessage', () => {
  const sampleKeyId = '4';
  const sampleChallenge = 'DEADBEEF';
  const sampleExtraArgument = 'EXTRA';
  const sampleKeywordArgument = '[of] p1a: Sableye';

  describe('deserialization', () => {
    it('deserializes a challenge message', () => {
      const args = [sampleKeyId, sampleChallenge];

      const deserializationResult = deserializeChallengeMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { keyId, challenge } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(keyId).toEqual(sampleKeyId);
      expect(challenge).toEqual(sampleChallenge);
      expect(keywordArguments).toStrictEqual({});
    });

    it('skips keyword arguments when deserializing a challenge messagee', () => {
      const args = [sampleKeyId, sampleChallenge, sampleKeywordArgument];

      const deserializationResult = deserializeChallengeMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { keyId, challenge } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(keyId).toEqual(sampleKeyId);
      expect(challenge).toEqual(`${sampleChallenge}|${sampleKeywordArgument}`);
      expect(keywordArguments).toStrictEqual({});
    });

    it('concatonates extra arguments when deserializing a challenge messagee', () => {
      const args = [sampleKeyId, sampleChallenge, sampleExtraArgument];

      const deserializationResult = deserializeChallengeMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { keyId, challenge } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(keyId).toEqual(sampleKeyId);
      expect(challenge).toEqual(`${sampleChallenge}|${sampleExtraArgument}`);
      expect(keywordArguments).toStrictEqual({});
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeChallengeMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a challenge message', () => {
      const challengeMessage: ChallengeMessage = {
        keyId: sampleKeyId,
        challenge: sampleChallenge,
      };

      const serializationResult = serializeChallengeMessage(challengeMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [keyId, challenge, ...rest] = serializationResult.value;
      expect(keyId).toStrictEqual(sampleKeyId);
      expect(challenge).toStrictEqual(sampleChallenge);
      expect(rest).toStrictEqual([]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeChallengeMessage({} as ChallengeMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
