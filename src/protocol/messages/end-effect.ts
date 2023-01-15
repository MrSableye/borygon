import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const endEffectMessageType = t.type({
  pokemon: pokemonType,
  effect: t.string,
});

/**
 * A message that is sent when an effect ends on a Pokémon.
 *
 * Serialized example: `|-end|p1a: Clefable|Encore`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Clefable",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "effect": "Encore"
 * }
 * ```
 *
 * @member pokemon The Pokémon the effect ended on
 * @member effect The effect
 */
export type EndEffectMessage = t.TypeOf<typeof endEffectMessageType>;

export const endEffectMessageSchema: KeySchema<EndEffectMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', deserializeString, serializeString],
];

export const deserializeEndEffectMessage = createSchemaDeserializer(
  endEffectMessageType,
  endEffectMessageSchema,
);
export const serializeEndEffectMessage = createSchemaSerializer(
  endEffectMessageType,
  endEffectMessageSchema,
);
