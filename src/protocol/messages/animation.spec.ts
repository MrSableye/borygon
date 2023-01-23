import { describe, expect, it } from '@jest/globals';
import { AnimationMessage, deserializeAnimationMessage, serializeAnimationMessage } from './animation';
import { assertResultValue, samplePokemon } from '../test-utilities';

describe('AnimationMessage', () => {
  const sampleMove = 'Scald';
  const sampleKeywordArgument = '[of] p1a: Sableye';
  const sampleKeywordArguments = { of: 'p1a: Sableye' };

  describe('deserialization', () => {
    it('deserializes an animation message without a target', () => {
      const args = [samplePokemon.text, sampleMove];

      const deserializationResult = deserializeAnimationMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { source, move, target } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(source).toStrictEqual(samplePokemon.value);
      expect(move).toBe(sampleMove);
      expect(target).toBeUndefined();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an animation message with a null target', () => {
      const args = [samplePokemon.text, sampleMove, 'null'];

      const deserializationResult = deserializeAnimationMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { source, move, target } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(source).toStrictEqual(samplePokemon.value);
      expect(move).toBe(sampleMove);
      expect(target).toBeNull();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an animation message with a target', () => {
      const args = [samplePokemon.text, sampleMove, samplePokemon.text];

      const deserializationResult = deserializeAnimationMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { source, move, target } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(source).toStrictEqual(samplePokemon.value);
      expect(move).toBe(sampleMove);
      expect(target).toStrictEqual(samplePokemon.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an animation message with keyword arguments', () => {
      const args = [samplePokemon.text, sampleMove, samplePokemon.text, sampleKeywordArgument];

      const deserializationResult = deserializeAnimationMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { source, move, target } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(source).toStrictEqual(samplePokemon.value);
      expect(move).toBe(sampleMove);
      expect(target).toStrictEqual(samplePokemon.value);
      expect(keywordArguments).toStrictEqual(sampleKeywordArguments);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeAnimationMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes an animation message without a target', () => {
      const animationMessage: AnimationMessage = {
        source: samplePokemon.value,
        move: sampleMove,
      };

      const serializationResult = serializeAnimationMessage(animationMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [sourceText, moveText, targetText, ...rest] = serializationResult.value;
      expect(sourceText).toStrictEqual(samplePokemon.text);
      expect(moveText).toBe(sampleMove);
      expect(targetText).toBeUndefined();
      expect(rest).toStrictEqual([]);
    });

    it('serializes an animation message with a null target', () => {
      const animationMessage: AnimationMessage = {
        source: samplePokemon.value,
        move: sampleMove,
        target: null,
      };

      const serializationResult = serializeAnimationMessage(animationMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [sourceText, moveText, targetText, ...rest] = serializationResult.value;
      expect(sourceText).toStrictEqual(samplePokemon.text);
      expect(moveText).toBe(sampleMove);
      expect(targetText).toBe('null');
      expect(rest).toStrictEqual([]);
    });

    it('serializes an animation message with a target', () => {
      const animationMessage: AnimationMessage = {
        source: samplePokemon.value,
        move: sampleMove,
        target: samplePokemon.value,
      };

      const serializationResult = serializeAnimationMessage(animationMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, moveText, targetText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(moveText).toBe(sampleMove);
      expect(targetText).toBe(samplePokemon.text);
      expect(rest).toStrictEqual([]);
    });

    it('serializes an animation message with keyword arguments', () => {
      const animationMessage: AnimationMessage = {
        source: samplePokemon.value,
        move: sampleMove,
        target: samplePokemon.value,
      };

      const serializationResult = serializeAnimationMessage(
        animationMessage,
        sampleKeywordArguments,
      );
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, moveText, targetText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(moveText).toBe(sampleMove);
      expect(targetText).toBe(samplePokemon.text);
      expect(rest).toStrictEqual([sampleKeywordArgument]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeAnimationMessage({} as AnimationMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
