import { describe, expect, it } from '@jest/globals';
import { AbilityMessage, deserializeAbilityMessage, serializeAbilityMessage } from './ability';
import { assertResultValue, samplePokemon } from '../test-utilities';

describe('AbilityMessage', () => {
  const sampleAbility = 'Intimidate';
  const sampleEffect = 'boost';
  const sampleKeywordArgument = '[from] ability: Trace';
  const sampleKeywordArguments = { from: 'ability: Trace' };

  describe('deserialization', () => {
    it('deserializes an ability message without an effect', () => {
      const args = [samplePokemon.text, sampleAbility];

      const deserializationResult = deserializeAbilityMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { pokemon, ability, effect } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(ability).toBe(sampleAbility);
      expect(effect).toBeUndefined();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an ability message with an effect', () => {
      const args = [samplePokemon.text, sampleAbility, sampleEffect];

      const deserializationResult = deserializeAbilityMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { pokemon, ability, effect } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(ability).toBe(sampleAbility);
      expect(effect).toBe(sampleEffect);
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes an ability message with keyword arguments', () => {
      const args = [samplePokemon.text, sampleAbility, sampleEffect, sampleKeywordArgument];

      const deserializationResult = deserializeAbilityMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { pokemon, ability, effect } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(ability).toBe(sampleAbility);
      expect(effect).toBe(sampleEffect);
      expect(keywordArguments).toStrictEqual(sampleKeywordArguments);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeAbilityMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes an ability message without an effect', () => {
      const abilityMessage: AbilityMessage = {
        ability: sampleAbility,
        pokemon: samplePokemon.value,
      };

      const serializationResult = serializeAbilityMessage(abilityMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, abilityText, effectText, ...keywordArguments] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(abilityText).toBe(sampleAbility);
      expect(effectText).toBeUndefined();
      expect(keywordArguments).toStrictEqual([]);
    });

    it('serializes an ability message with an effect', () => {
      const abilityMessage: AbilityMessage = {
        ability: sampleAbility,
        pokemon: samplePokemon.value,
        effect: sampleEffect,
      };

      const serializationResult = serializeAbilityMessage(abilityMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, abilityText, effectText, ...keywordArguments] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(abilityText).toBe(sampleAbility);
      expect(effectText).toBe(effectText);
      expect(keywordArguments).toStrictEqual([]);
    });

    it('serializes an ability message with keyword arguments', () => {
      const abilityMessage: AbilityMessage = {
        ability: sampleAbility,
        pokemon: samplePokemon.value,
        effect: sampleEffect,
      };

      const serializationResult = serializeAbilityMessage(abilityMessage, sampleKeywordArguments);
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, abilityText, effectText, ...keywordArguments] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(abilityText).toBe(sampleAbility);
      expect(effectText).toBe(effectText);
      expect(keywordArguments).toStrictEqual([sampleKeywordArgument]);
    });

    it('returns errors given invalid input', () => {
      const serializationResult = serializeAbilityMessage({} as AbilityMessage, {});
      expect('errors' in serializationResult).toBe(true);
    });
  });
});
