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

export const itemMessageType = t.type({
  pokemon: pokemonType,
  item: t.string,
});

/**
 * A message that is sent when a Pokémon's item has been changed or revealed.
 *
 * Serialized example: `|-item|p1a: Ferrothorn|Rocky Helmet`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Ferrothorn",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "item": "Rocky Helmet"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose item changed or was revealed
 * @member item The item that changed or was revealed
 */
export type ItemMessage = t.TypeOf<typeof itemMessageType>;

export const itemMessageSchema: KeySchema<ItemMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['item', deserializeString, serializeString],
];

export const deserializeItemMessage = createSchemaDeserializer(itemMessageType, itemMessageSchema);
export const serializeItemMessage = createSchemaSerializer(itemMessageType, itemMessageSchema);
