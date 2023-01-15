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

export const copyBoostMessageType = t.type({
  source: pokemonType,
  target: pokemonType,
});

/**
 * A message that is sent when a Pokémon copies another Pokémon's boosts.
 *
 * Serialized example: `|-copyboost|p1a: Alakazam|p2a: Clefable`
 *
 * Deserialized example:
 * ```json
 * {
 *   "source": {
 *     "name": "Alakazam",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "target": {
 *     "name": "Clefable",
 *     "player": "p2",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member source The Pokémon which copied the boosts
 * @member target The Pokémon whose boosts were copied
 */
export type CopyBoostMessage = t.TypeOf<typeof copyBoostMessageType>;

export const copyBoostMessageSchema: KeySchema<CopyBoostMessage> = [
  ['source', deserializePokemon, serializePokemon],
  ['target', deserializePokemon, serializePokemon],
];

export const deserializeCopyBoostMessage = createSchemaDeserializer(
  copyBoostMessageType,
  copyBoostMessageSchema,
);
export const serializeCopyBoostMessage = createSchemaSerializer(
  copyBoostMessageType,
  copyBoostMessageSchema,
);
