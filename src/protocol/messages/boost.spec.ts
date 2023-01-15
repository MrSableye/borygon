import { describe, expect, it } from '@jest/globals';
import { BoostMessage, deserializeBoostMessage, serializeBoostMessage } from './boost';
import { Stat } from './types';
import { assertResultValue, samplePokemon } from '../test-utilities';

describe('BoostMessage', () => {
  const sampleStat: Stat = 'atk';
  const sampleAmount = 2;
  const sampleAmountText = String(sampleAmount);
  const sampleKeywordArgument = '[of] p1a: Sableye';
  const sampleKeywordArguments = { of: 'p1a: Sableye' };

  describe('deserialization', () => {
    it('deserializes a boost message', () => {
      const args = [samplePokemon.text, sampleStat, sampleAmountText];

      const deserializationResult = deserializeBoostMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const { pokemon, stat, amount } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(stat).toBe(sampleStat);
      expect(amount).toBe(sampleAmount);
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes a boost message with keyword arguments', () => {
      const args = [samplePokemon.text, sampleStat, sampleAmountText, sampleKeywordArgument];

      const deserializationResult = deserializeBoostMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const { pokemon, stat, amount } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(stat).toBe(sampleStat);
      expect(amount).toBe(sampleAmount);
      expect(keywordArguments).toStrictEqual(sampleKeywordArguments);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeBoostMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a boost message', () => {
      const boostMessage: BoostMessage = {
        pokemon: samplePokemon.value,
        stat: sampleStat,
        amount: sampleAmount,
      };

      const serializationResult = serializeBoostMessage(boostMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, statText, amountText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(statText).toBe(sampleStat);
      expect(amountText).toBe(amountText);
      expect(rest).toStrictEqual([]);
    });

    it('serializes a boost message with keyword arguments', () => {
      const boostMessage: BoostMessage = {
        pokemon: samplePokemon.value,
        stat: sampleStat,
        amount: sampleAmount,
      };

      const serializationResult = serializeBoostMessage(boostMessage, sampleKeywordArguments);
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, statText, amountText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(statText).toBe(sampleStat);
      expect(amountText).toBe(amountText);
      expect(rest).toStrictEqual([sampleKeywordArgument]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeBoostMessage({} as BoostMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
