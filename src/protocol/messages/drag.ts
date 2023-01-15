import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeHpWithStatus,
  deserializePokemon,
  deserializePokemonDetails,
  hpWithStatusType,
  pokemonDetailsType,
  pokemonType,
  serializeHpWithStatus,
  serializePokemon,
  serializePokemonDetails,
} from './types';

export const dragMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hpWithStatus: hpWithStatusType,
  }),
]);

/**
 * A message that is sent when a Pokémon is forcibly swapped.
 *
 * Serialized example: `|drag|p1a: Roserade|Roserade, M|100/100`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Roserade",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "details": {
 *     "species": Roserade",
 *     "level": 100,
 *     "shiny": false,
 *     "gender": "M"
 *   },
 *   "hpWithStatus": {
 *     "hp": {
 *       "numerator": 100,
 *       "denominator": 100
 *     }
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon which was dragged out
 * @member details The details of the Pokémon dragged out
 * @member hpWithStatus The HP and status of the Pokémon
 */
export type DragMessage = t.TypeOf<typeof dragMessageType>;

export const dragMessageSchema: KeySchema<DragMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
  ['hpWithStatus', createOptionalDeserializer(deserializeHpWithStatus), createOptionalSerializer(serializeHpWithStatus)],
];

export const deserializeDragMessage = createSchemaDeserializer(dragMessageType, dragMessageSchema);
export const serializeDragMessage = createSchemaSerializer(
  dragMessageType,
  dragMessageSchema,
  { omitTrailingUndefinedParts: true },
);
