import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeHpWithStatus,
  deserializePokemon,
  hpWithStatusType,
  pokemonType,
  serializeHpWithStatus,
  serializePokemon,
} from './types';

export const healMessageType = t.type({
  pokemon: pokemonType,
  hpWithStatus: hpWithStatusType,
});

/**
 * A message that is sent when a Pokémon is healed.
 *
 * Serialized example: `|-heal|p1a: Clefable|93/100 slp`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Clefable",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "hp": {
 *     "numerator": 93,
 *     "denominator": 100
 *   },
 *   "status": "slp"
 * }
 * ```
 *
 * @member pokemon The Pokémon which was healed
 * @member hp The new HP of the Pokémon
 * @member status The status of the Pokémon
 */
export type HealMessage = t.TypeOf<typeof healMessageType>;

export const healMessageSchema: KeySchema<HealMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['hpWithStatus', deserializeHpWithStatus, serializeHpWithStatus],
];

export const deserializeHealMessage = createSchemaDeserializer(healMessageType, healMessageSchema);
export const serializeHealMessage = createSchemaSerializer(healMessageType, healMessageSchema);
