import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  deserializeString,
  KeySchema,
  serializeNumber,
  serializeString,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const swapMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    position: t.number,
  }),
  t.partial({
    attributes: t.string,
  }),
]);

/**
 * A message that is sent when a Pokémon swaps position on the field.
 *
 * Serialized example: `|swap|p1a: Landorus-Therian|0`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "position": 0
 * }
 * ```
 *
 * @member pokemon The Pokémon that swapped positions
 * @member position The position
 * @member attributes Attributes related to the swap
 */
export type SwapMessage = t.TypeOf<typeof swapMessageType>;

export const swapMessageSchema: KeySchema<SwapMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['position', deserializeNumber, serializeNumber],
  [
    'attributes',
    createOptionalDeserializer(deserializeString, false),
    createOptionalSerializer(serializeString),
  ],
];

export const deserializeSwapMessage = createSchemaDeserializer(
  swapMessageType,
  swapMessageSchema,
);
export const serializeSwapMessage = createSchemaSerializer(
  swapMessageType,
  swapMessageSchema,
  { omitTrailingUndefinedParts: true },
);
