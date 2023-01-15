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

export const boostMessageType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});

/**
 * A message that is sent when a Pokémon's stat stage increases or decreases.
 *
 * Serialized example: `|-boost|p1a: Landorus-Therian|spe|2`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "stat": "spe",
 *   "amount": 2
 * }
 * ```
 *
 * @member pokemon The Pokémon whose stat stage changed
 * @member stat The stat changed
 * @member amount The number of stages changed
 */
export type BoostMessage = t.TypeOf<typeof boostMessageType>;

export const boostMessageSchema: KeySchema<BoostMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['stat', deserializeStat, serializeStat],
  ['amount', deserializeNumber, serializeNumber],
];

export const deserializeBoostMessage = createSchemaDeserializer(
  boostMessageType,
  boostMessageSchema,
);
export const serializeBoostMessage = createSchemaSerializer(boostMessageType, boostMessageSchema);
