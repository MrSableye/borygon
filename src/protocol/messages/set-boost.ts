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

export const setBoostMessageType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});

/**
 * A message that is sent when a Pokémon's stat is set.
 *
 * Serialized example: `|-setboost|p1a: Linoone|atk|6`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Linoone",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "stat": "atk",
 *   "amount": 6
 * }
 * ```
 *
 * @member pokemon The Pokémon whose stat was set
 * @member stat The stat that was set
 * @member amount The amount that the stat was set to
 */
export type SetBoostMessage = t.TypeOf<typeof setBoostMessageType>;

export const setBoostMessageSchema: KeySchema<SetBoostMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['stat', deserializeStat, serializeStat],
  ['amount', deserializeNumber, serializeNumber],
];

export const deserializeSetBoostMessage = createSchemaDeserializer(
  setBoostMessageType,
  setBoostMessageSchema,
);
export const serializeSetBoostMessage = createSchemaSerializer(
  setBoostMessageType,
  setBoostMessageSchema,
);
