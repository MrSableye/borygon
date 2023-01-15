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

export const ultraBurstMessageType = t.type({
  pokemon: pokemonType,
  species: t.string,
  item: t.string,
});

/**
 * A message that is sent when a Pokémon Ultra Bursts.
 *
 * Serialized example: `|-burst|p1a: Necrozma|Necrozma|Ultranecrozium Z`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Necrozma",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "species": "Necrozma",
 *   "item": "Ultranecrozium Z"
 * }
 * ```
 *
 * @member pokemon The Pokémon that Ultra Bursted
 * @member species The species of the Pokémon that Ultra Bursted
 * @member item The item used to Ultra Burst
 */
export type UltraBurstMessage = t.TypeOf<typeof ultraBurstMessageType>;

export const ultraBurstMessageSchema: KeySchema<UltraBurstMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['species', deserializeString, serializeString],
  ['item', deserializeString, serializeString],
];

export const deserializeUltraBurstMessage = createSchemaDeserializer(
  ultraBurstMessageType,
  ultraBurstMessageSchema,
);
export const serializeUltraBurstMessage = createSchemaSerializer(
  ultraBurstMessageType,
  ultraBurstMessageSchema,
);
