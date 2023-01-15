import { describe, expect, it } from '@jest/globals';
import { ChatMessage, deserializeChatMessage, serializeChatMessage } from './chat';
import { assertResultValue, sampleUser } from '../test-utilities';

describe('ChatMessage', () => {
  const sampleMessage = 'Hello world';
  const sampleExtraArgument = 'EXTRA';
  const sampleKeywordArgument = '[of] p1a: Sableye';

  describe('deserialization', () => {
    it('deserializes a chat message', () => {
      const args = [sampleUser.text, sampleMessage];

      const deserializationResult = deserializeChatMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { user, message } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(user).toStrictEqual(sampleUser.value);
      expect(message).toEqual(sampleMessage);
      expect(keywordArguments).toStrictEqual({});
    });

    it('skips keyword arguments when deserializing a chat messagee', () => {
      const args = [sampleUser.text, sampleMessage, sampleKeywordArgument];

      const deserializationResult = deserializeChatMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { user, message } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(user).toStrictEqual(sampleUser.value);
      expect(message).toEqual(`${sampleMessage}|${sampleKeywordArgument}`);
      expect(keywordArguments).toStrictEqual({});
    });

    it('concatonates extra arguments when deserializing a chat messagee', () => {
      const args = [sampleUser.text, sampleMessage, sampleExtraArgument];

      const deserializationResult = deserializeChatMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { user, message } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(user).toStrictEqual(sampleUser.value);
      expect(message).toEqual(`${sampleMessage}|${sampleExtraArgument}`);
      expect(keywordArguments).toStrictEqual({});
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeChatMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a chat message', () => {
      const chatMessage: ChatMessage = {
        user: sampleUser.value,
        message: sampleMessage,
      };

      const serializationResult = serializeChatMessage(chatMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [userText, messageText, ...rest] = serializationResult.value;
      expect(userText).toStrictEqual(sampleUser.text);
      expect(messageText).toStrictEqual(sampleMessage);
      expect(rest).toStrictEqual([]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeChatMessage({} as ChatMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
