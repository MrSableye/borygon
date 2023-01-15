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

export const clearPositiveBoostMessageType = t.type({
  target: pokemonType,
  pokemon: pokemonType,
  effect: t.string,
});

/**
 * A message that is sent when a Pokémon's positive boosts are removed.
 *
 * Serialized example: `|-clearpositiveboost|p1a: Quagsire|p2a: Marshadow|move: Spectral Thief`
 *
 * Deserialized example:
 * ```json
 * {
 *   "target": {
 *     "name": "Quagsire",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "pokemon": {
 *     "name": "Marshadow",
 *     "player": "p2",
 *     "subPosition": "a"
 *   },
 *   "effect": "move: Spectral Thief"
 * }
 * ```
 *
 * @member target The Pokémon whose boosts are removed
 * @member pokemon The Pokémon which removed the boosts
 * @member effect The effect which removed the boosts
 */
export type ClearPositiveBoostMessage = t.TypeOf<typeof clearPositiveBoostMessageType>;

export const clearPositiveBoostMessageSchema: KeySchema<ClearPositiveBoostMessage> = [
  ['target', deserializePokemon, serializePokemon],
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', deserializeString, serializeString],
];

export const deserializeClearPositiveBoostMessage = createSchemaDeserializer(
  clearPositiveBoostMessageType,
  clearPositiveBoostMessageSchema,
);
export const serializeClearPositiveBoostMessage = createSchemaSerializer(
  clearPositiveBoostMessageType,
  clearPositiveBoostMessageSchema,
);
