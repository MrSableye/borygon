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

export const endItemMessageType = t.type({
  pokemon: pokemonType,
  item: t.string,
});

/**
 * A message that is sent when an item's effect ends on a Pokémon.
 *
 * Serialized example: `|-enditem|p1a: Magnezone|Air Balloon`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Magnezone",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "item": "Air Balloon"
 * }
 * ```
 *
 * @member pokemon The Pokémon the item's effect ended on
 * @member item The item
 */
export type EndItemMessage = t.TypeOf<typeof endItemMessageType>;

export const endItemMessageSchema: KeySchema<EndItemMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['item', deserializeString, serializeString],
];

export const deserializeEndItemMessage = createSchemaDeserializer(
  endItemMessageType,
  endItemMessageSchema,
);
export const serializeEndItemMessage = createSchemaSerializer(
  endItemMessageType,
  endItemMessageSchema,
);
