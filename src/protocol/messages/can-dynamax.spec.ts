import { describe, expect, it } from '@jest/globals';
import { CanDynamaxMessage, deserializeCanDynamaxMessage, serializeCanDynamaxMessage } from './can-dynamax';
import { assertResultValue, samplePlayer } from '../test-utilities';

describe('CanDynamaxMessage', () => {
  const sampleKeywordArgument = '[of] p1a: Sableye';

  describe('deserialization', () => {
    it('deserializes a can dynamax message', () => {
      const args = [samplePlayer.text];

      const deserializationResult = deserializeCanDynamaxMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { side } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(side).toStrictEqual(samplePlayer.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('skips keyword arguments when deserializing a can dynamax messagee', () => {
      const args = [samplePlayer.text, sampleKeywordArgument];

      const deserializationResult = deserializeCanDynamaxMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { side } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(side).toStrictEqual(samplePlayer.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeCanDynamaxMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a can dynamax message', () => {
      const canDynamaxMessage: CanDynamaxMessage = {
        side: samplePlayer.value,
      };

      const serializationResult = serializeCanDynamaxMessage(canDynamaxMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [sideText, ...rest] = serializationResult.value;
      expect(sideText).toStrictEqual(samplePlayer.text);
      expect(rest).toStrictEqual([]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeCanDynamaxMessage({} as CanDynamaxMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
