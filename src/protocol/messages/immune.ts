import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
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

export const immuneMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
  }),
  t.partial({
    effect: t.string,
  }),
]);

/**
 * A message that is sent when a Pokémon is immune to an effect.
 *
 * Serialized example: `|-immune|p1a: Smeargle|confusion`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Smeargle",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "effect": "confusion"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose immunity was triggered
 * @member effect The effect the Pokémon is immune to
 */
export type ImmuneMessage = t.TypeOf<typeof immuneMessageType>;

export const immuneMessageSchema: KeySchema<ImmuneMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeImmuneMessage = createSchemaDeserializer(
  immuneMessageType,
  immuneMessageSchema,
);
export const serializeImmuneMessage = createSchemaSerializer(
  immuneMessageType,
  immuneMessageSchema,
  { omitTrailingUndefinedParts: true },
);
