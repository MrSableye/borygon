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

export const damageMessageType = t.type({
  pokemon: pokemonType,
  hpWithStatus: hpWithStatusType,
});

/**
 * A message that is sent when a Pokémon is damaged.
 *
 * Serialized example: `|-damage|p1a: Clefable|93/100 slp`
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
 * @member pokemon The Pokémon which was damaged
 * @member hp The new HP of the Pokémon
 * @member status The status of the Pokémon
 */
export type DamageMessage = t.TypeOf<typeof damageMessageType>;

export const damageMessageSchema: KeySchema<DamageMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['hpWithStatus', deserializeHpWithStatus, serializeHpWithStatus],
];

export const deserializeDamageMessage = createSchemaDeserializer(
  damageMessageType,
  damageMessageSchema,
);
export const serializeDamageMessage = createSchemaSerializer(
  damageMessageType,
  damageMessageSchema,
);
