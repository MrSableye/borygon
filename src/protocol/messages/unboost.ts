import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';
import {
  deserializePokemon,
  deserializeStat,
  pokemonType,
  serializePokemon,
  serializeStat,
  statType,
} from './types';

export const unboostMessageType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});

/**
 * A message that is sent when a Pokémon's stat stage decreases.
 *
 * Serialized example: `|-unboost|p1a: Landorus-Therian|atk|1`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "stat": "atk",
 *   "amount": 1
 * }
 * ```
 *
 * @member pokemon The Pokémon whose stat stage decreased
 * @member stat The stat decreased
 * @member amount The number of stages decreased
 */
export type UnboostMessage = t.TypeOf<typeof unboostMessageType>;

export const unboostMessageSchema: KeySchema<UnboostMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['stat', deserializeStat, serializeStat],
  ['amount', deserializeNumber, serializeNumber],
];

export const deserializeUnboostMessage = createSchemaDeserializer(
  unboostMessageType,
  unboostMessageSchema,
);
export const serializeUnboostMessage = createSchemaSerializer(
  unboostMessageType,
  unboostMessageSchema,
);
