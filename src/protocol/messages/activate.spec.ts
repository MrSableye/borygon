import { describe, expect, it } from '@jest/globals';
import { ActivateMessage, deserializeActivateMessage, serializeActivateMessage } from './activate';
import { assertResultValue, samplePokemon } from '../test-utilities';

describe('ActivateMessage', () => {
  const sampleEffect = 'move: Spite';
  const sampleEffectArguments = ['Tackle', '4'];
  const sampleEffectArgumentsText = 'Tackle|4';
  const sampleKeywordArgument = '[of] p1a: Sableye';
  const sampleKeywordArguments = { of: 'p1a: Sableye' };

  describe('deserialization', () => {
    it('deserializes an activate message without effect arguments', () => {
      const args = [samplePokemon.text, sampleEffect];

      const deserializationResult = deserializeActivateMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { pokemon, effect, effectArguments } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(effectArguments).toBeUndefined();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an activate message with effect arguments', () => {
      const args = [samplePokemon.text, sampleEffect, ...sampleEffectArguments];

      const deserializationResult = deserializeActivateMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { pokemon, effect, effectArguments } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(effectArguments).toStrictEqual(sampleEffectArguments);
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an activate message with keyword arguments', () => {
      const args = [
        samplePokemon.text,
        sampleEffect,
        ...sampleEffectArguments,
        sampleKeywordArgument,
      ];

      const deserializationResult = deserializeActivateMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { pokemon, effect, effectArguments } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(effectArguments).toStrictEqual(sampleEffectArguments);
      expect(keywordArguments).toStrictEqual(sampleKeywordArguments);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeActivateMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes an activate message without effect arguments', () => {
      const activateMessage: ActivateMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
      };

      const serializationResult = serializeActivateMessage(activateMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, effectArgumentsText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(effectArgumentsText).toBeUndefined();
      expect(rest).toStrictEqual([]);
    });

    it('serializes an activate message with effect arguments', () => {
      const activateMessage: ActivateMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
        effectArguments: sampleEffectArguments,
      };

      const serializationResult = serializeActivateMessage(activateMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, effectArgumentsText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(effectArgumentsText).toBe(sampleEffectArgumentsText);
      expect(rest).toStrictEqual([]);
    });

    it('serializes an activate message with keyword arguments', () => {
      const activateMessage: ActivateMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
        effectArguments: sampleEffectArguments,
      };

      const serializationResult = serializeActivateMessage(activateMessage, sampleKeywordArguments);
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, effectArgumentsText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(effectText);
      expect(effectArgumentsText).toBe(sampleEffectArgumentsText);
      expect(rest).toStrictEqual([sampleKeywordArgument]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeActivateMessage({} as ActivateMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
