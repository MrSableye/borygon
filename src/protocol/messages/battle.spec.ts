import { describe, expect, it } from '@jest/globals';
import { BattleMessage, deserializeBattleMessage, serializeBattleMessage } from './battle';
import { assertResultValue, sampleUser } from '../test-utilities';

describe('BattleMessage', () => {
  const sampleRoomId = 'battle-gen1337ou-1';
  const sampleKeywordArgument = '[of] p1a: Sableye';

  describe('deserialization', () => {
    it('deserializes a battle message', () => {
      const args = [sampleRoomId, sampleUser.text, sampleUser.text];

      const deserializationResult = deserializeBattleMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { roomId, user1, user2 } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(roomId).toStrictEqual(sampleRoomId);
      expect(user1).toStrictEqual(sampleUser.value);
      expect(user2).toStrictEqual(sampleUser.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('skips keyword arguments when deserializing a battle message', () => {
      const args = [sampleRoomId, sampleUser.text, sampleUser.text, sampleKeywordArgument];

      const deserializationResult = deserializeBattleMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { roomId, user1, user2 } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(roomId).toStrictEqual(sampleRoomId);
      expect(user1).toStrictEqual(sampleUser.value);
      expect(user2).toStrictEqual(sampleUser.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeBattleMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a battle message', () => {
      const battleMessage: BattleMessage = {
        roomId: sampleRoomId,
        user1: sampleUser.value,
        user2: sampleUser.value,
      };

      const serializationResult = serializeBattleMessage(battleMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [roomIdText, user1Text, user2Text, ...rest] = serializationResult.value;
      expect(roomIdText).toBe(sampleRoomId);
      expect(user1Text).toBe(sampleUser.text);
      expect(user2Text).toBe(sampleUser.text);
      expect(rest).toStrictEqual([]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeBattleMessage({} as BattleMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
