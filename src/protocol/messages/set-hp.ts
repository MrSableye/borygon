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

export const setHpMessageType = t.type({
  pokemon: pokemonType,
  hpWithStatus: hpWithStatusType,
});

/**
 * A message that is sent when a Pokémon's HP changes.
 *
 * Serialized example: `|-sethp|p1a: Toxapex|78/100`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Toxapex",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "hp": {
 *     "numerator": "78",
 *     "denominator": "100"
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon whose HP was changed
 * @member hp The HP of the Pokémon
 */
export type SetHpMessage = t.TypeOf<typeof setHpMessageType>;

export const setHpMessageSchema: KeySchema<SetHpMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['hpWithStatus', deserializeHpWithStatus, serializeHpWithStatus],
];

export const deserializeSetHpMessage = createSchemaDeserializer(
  setHpMessageType,
  setHpMessageSchema,
);
export const serializeSetHpMessage = createSchemaSerializer(
  setHpMessageType,
  setHpMessageSchema,
);
