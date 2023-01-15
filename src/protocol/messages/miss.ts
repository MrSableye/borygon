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

export const missMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
  }),
  t.partial({
    target: pokemonType,
  }),
]);

/**
 * A message that is sent when a Pokémon's move misses.
 *
 * Serialized example: `|-miss|p1a: Landorus-Therian|p2a: Toxapex`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "target": {
 *     "name": "Toxapex",
 *     "player": "p2",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon whose attack missed
 * @member target The Pokémon which was the target of the move
 */
export type MissMessage = t.TypeOf<typeof missMessageType>;

export const missMessageSchema: KeySchema<MissMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['target', createOptionalDeserializer(deserializePokemon), createOptionalSerializer(serializePokemon)],
];

export const deserializeMissMessage = createSchemaDeserializer(missMessageType, missMessageSchema);
export const serializeMissMessage = createSchemaSerializer(
  missMessageType,
  missMessageSchema,
  { omitTrailingUndefinedParts: true },
);
