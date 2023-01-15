import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  deserializeStat,
  pokemonType,
  serializePokemon,
  serializeStat,
  statType,
} from './types';

export const swapBoostMessageType = t.intersection([
  t.type({
    source: pokemonType,
    target: pokemonType,
  }),
  t.partial({
    stats: t.array(statType),
  }),
]);

/**
 * A message that is sent when a Pokémon swaps stats with another Pokémon.
 *
 * Serialized example: `|-swapboost|p1a: Blissey|p2a: Chansey|def, spd`
 *
 * Deserialized example:
 * ```json
 * {
 *   "source": {
 *     "name": "Blissey",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "target": {
 *     "name": "Chansey",
 *     "player": "p2",
 *     "subPosition": "a"
 *   },
 *   "stats": ["def", "spd"]
 * }
 * ```
 *
 * @member source The Pokémon that initiated the swap
 * @member target The Pokémon that was swapped with
 * @member stats The stats swapped
 */
export type SwapBoostMessage = t.TypeOf<typeof swapBoostMessageType>;

export const swapBoostMessageSchema: KeySchema<SwapBoostMessage> = [
  ['source', deserializePokemon, serializePokemon],
  ['target', deserializePokemon, serializePokemon],
  [
    'stats',
    createOptionalDeserializer(createArrayDeserializer(deserializeStat, ', ')),
    createOptionalSerializer(createArraySerializer(serializeStat, ', ')),
  ],
];

export const deserializeSwapBoostMessage = createSchemaDeserializer(
  swapBoostMessageType,
  swapBoostMessageSchema,
);
export const serializeSwapBoostMessage = createSchemaSerializer(
  swapBoostMessageType,
  swapBoostMessageSchema,
  { omitTrailingUndefinedParts: true },
);
