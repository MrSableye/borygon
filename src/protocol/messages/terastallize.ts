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

export const terastallizeMessageType = t.type({
  pokemon: pokemonType,
  type: t.string,
});

/**
 * A message that is sent when a Pokémon Terastallizes.
 *
 * Serialized example: `|-terastallize|p1a: Landorus-Therian|Ground`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "type": "Ground"
 * }
 * ```
 *
 * @member pokemon The Pokémon that Terastallized
 * @member type The type the Pokémon Terastallized into
 */
export type TerastallizeMessage = t.TypeOf<typeof terastallizeMessageType>;

export const terastallizeMessageSchema: KeySchema<TerastallizeMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['type', deserializeString, serializeString],
];

export const deserializeTerastallizeMessage = createSchemaDeserializer(
  terastallizeMessageType,
  terastallizeMessageSchema,
);
export const serializeTerastallizeMessage = createSchemaSerializer(
  terastallizeMessageType,
  terastallizeMessageSchema,
);
