import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const transformMessageType = t.type({
  pokemon: pokemonType,
  species: pokemonType,
});

/**
 * A message that is sent when a Pokémon's transforms into another Pokémon.
 *
 * Serialized example: `|-transform|p1a: Ditto|p2a: Landorus-Therian`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Ditto",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "species": {
 *     "name": "Landorus-Therian",
 *     "player": "p2",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon that transformed
 * @member ability The Pokémon that  was transformed into
 */
export type TransformMessage = t.TypeOf<typeof transformMessageType>;

export const transformMessageSchema: KeySchema<TransformMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['species', deserializePokemon, serializePokemon],
];

export const deserializeTransformMessage = createSchemaDeserializer(
  transformMessageType,
  transformMessageSchema,
);
export const serializeTransformMessage = createSchemaSerializer(
  transformMessageType,
  transformMessageSchema,
);
