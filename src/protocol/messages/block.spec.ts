import { describe, expect, it } from '@jest/globals';
import { BlockMessage, deserializeBlockMessage, serializeBlockMessage } from './block';
import { assertResultValue, samplePokemon } from '../test-utilities';

describe('BlockMessage', () => {
  const sampleEffect = 'ability: Damp';
  const sampleMove = 'Explosion';
  const sampleKeywordArgument = '[of] p1a: Sableye';
  const sampleKeywordArguments = { of: 'p1a: Sableye' };

  describe('deserialization', () => {
    it('deserializes a block message without a move or attacker', () => {
      const args = [samplePokemon.text, sampleEffect];

      const deserializationResult = deserializeBlockMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const {
        pokemon, effect, move, attacker,
      } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(move).toBeUndefined();
      expect(attacker).toBeUndefined();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes a block message with a move but no attacker', () => {
      const args = [samplePokemon.text, sampleEffect, sampleMove];

      const deserializationResult = deserializeBlockMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const {
        pokemon, effect, move, attacker,
      } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(move).toBe(sampleMove);
      expect(attacker).toBeUndefined();
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes a block message with a move and attacker', () => {
      const args = [samplePokemon.text, sampleEffect, sampleMove, samplePokemon.text];

      const deserializationResult = deserializeBlockMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const {
        pokemon, effect, move, attacker,
      } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(move).toBe(sampleMove);
      expect(attacker).toStrictEqual(samplePokemon.value);
      expect(keywordArguments).toStrictEqual({});
    });

    it('deserializes a block message with keyword arguments', () => {
      const args = [
        samplePokemon.text,
        sampleEffect,
        sampleMove,
        samplePokemon.text,
        sampleKeywordArgument,
      ];

      const deserializationResult = deserializeBlockMessage(args);
      expect('value' in deserializationResult).toBe(true);
      assertResultValue(deserializationResult);

      const {
        pokemon, effect, move, attacker,
      } = deserializationResult.value[0];
      const keywordArguments = deserializationResult.value[1];
      expect(pokemon).toStrictEqual(samplePokemon.value);
      expect(effect).toBe(sampleEffect);
      expect(move).toBe(sampleMove);
      expect(attacker).toStrictEqual(samplePokemon.value);
      expect(keywordArguments).toStrictEqual(sampleKeywordArguments);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeBlockMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a block message without a move or attacker', () => {
      const blockMessage: BlockMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
      };

      const serializationResult = serializeBlockMessage(blockMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, moveText, attackerText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(moveText).toBeUndefined();
      expect(attackerText).toBeUndefined();
      expect(rest).toStrictEqual([]);
    });

    it('serializes a block message a move but no attacker', () => {
      const blockMessage: BlockMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
        move: sampleMove,
      };

      const serializationResult = serializeBlockMessage(blockMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, moveText, attackerText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(moveText).toBe(sampleMove);
      expect(attackerText).toBeUndefined();
      expect(rest).toStrictEqual([]);
    });

    it('serializes a block message with a move and attacker', () => {
      const blockMessage: BlockMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
        move: sampleMove,
        attacker: samplePokemon.value,
      };

      const serializationResult = serializeBlockMessage(blockMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, moveText, attackerText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(moveText).toBe(sampleMove);
      expect(attackerText).toBe(samplePokemon.text);
      expect(rest).toStrictEqual([]);
    });

    it('serializes a block message with keyword arguments', () => {
      const blockMessage: BlockMessage = {
        pokemon: samplePokemon.value,
        effect: sampleEffect,
        move: sampleMove,
        attacker: samplePokemon.value,
      };

      const serializationResult = serializeBlockMessage(blockMessage, sampleKeywordArguments);
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [pokemonText, effectText, moveText, attackerText, ...rest] = serializationResult.value;
      expect(pokemonText).toStrictEqual(samplePokemon.text);
      expect(effectText).toBe(sampleEffect);
      expect(moveText).toBe(sampleMove);
      expect(attackerText).toBe(samplePokemon.text);
      expect(rest).toStrictEqual([sampleKeywordArgument]);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = serializeBlockMessage({} as BlockMessage, {});
      expect('errors' in deserializationResult).toBe(true);
    });
  });
});
