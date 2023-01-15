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

export const statusMessageType = t.type({
  pokemon: pokemonType,
  status: statusType,
});

/**
 * A message that is sent when a Pokémon's is inflicted by a status.
 *
 * Serialized example: `|-status|p1a: Toxapex|par`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Toxapex",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "status": "par"
 * }
 * ```
 *
 * @member pokemon The Pokémon which had a status inflicted
 * @member status The status that was inflicted
 */
export type StatusMessage = t.TypeOf<typeof statusMessageType>;

export const statusMessageSchema: KeySchema<StatusMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['status', deserializeStatus, serializeStatus],
];

export const deserializeStatusMessage = createSchemaDeserializer(
  statusMessageType,
  statusMessageSchema,
);
export const serializeStatusMessage = createSchemaSerializer(
  statusMessageType,
  statusMessageSchema,
);
