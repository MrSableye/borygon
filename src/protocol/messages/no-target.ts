import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const noTargetMessageType = t.partial({
  pokemon: pokemonType,
});

/**
 * A message that is sent when a Pokémon's action failed due to having no target.
 *
 * Serialized example: `|-notarget|p1a: Dragonite`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Dragonite",
 *     "player": "p1",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon whose action failed
 */
export type NoTargetMessage = t.TypeOf<typeof noTargetMessageType>;

export const noTargetMessageSchema: KeySchema<NoTargetMessage> = [
  ['pokemon', createOptionalDeserializer(deserializePokemon), createOptionalSerializer(serializePokemon)],
];

export const deserializeNoTargetMessage = createSchemaDeserializer(
  noTargetMessageType,
  noTargetMessageSchema,
);
export const serializeNoTargetMessage = createSchemaSerializer(
  noTargetMessageType,
  noTargetMessageSchema,
);
