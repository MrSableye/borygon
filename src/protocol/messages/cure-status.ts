import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  deserializeStatus,
  pokemonType,
  serializePokemon,
  serializeStatus,
  statusType,
} from './types';

export const cureStatusMessageType = t.type({
  pokemon: pokemonType,
  status: statusType,
});

/**
 * A message that is sent when a Pokémon's status is cured.
 *
 * Serialized example: `|-curestatus|p1a: Pikachu|slp`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Pikachu",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "status": "slp"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose status was cured
 * @member status The status that was cured
 */
export type CureStatusMessage = t.TypeOf<typeof cureStatusMessageType>;

export const cureStatusMessageSchema: KeySchema<CureStatusMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['status', deserializeStatus, serializeStatus],
];

export const deserializeCureStatusMessage = createSchemaDeserializer(
  cureStatusMessageType,
  cureStatusMessageSchema,
);
export const serializeCureStatusMessage = createSchemaSerializer(
  cureStatusMessageType,
  cureStatusMessageSchema,
);
