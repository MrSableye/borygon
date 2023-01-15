import * as t from 'io-ts';
import {
  createNullableDeserializer,
  createNullableSerializer,
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializePokemon,
  Pokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const moveMessageType = t.intersection([
  t.type({
    user: pokemonType,
    move: t.string,
  }),
  t.partial({
    target: t.union([pokemonType, t.null]),
  }),
]);

/**
 * A message that is sent when a Pokémon's move misses.
 *
 * Serialized example: `|move|p1a: Toxapex|Toxic|p2a: Landorus-Therian`
 *
 * Deserialized example:
 * ```json
 * {
 *   "user": {
 *     "name": "Toxapex",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "move": "Toxic",
 *   "target": {
 *     "name": "Landorus-Therian",
 *     "player": "p2",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member user The user of the move
 * @member move The move
 * @member target The target of the move
 */
export type MoveMessage = t.TypeOf<typeof moveMessageType>;

export const moveMessageSchema: KeySchema<MoveMessage> = [
  ['user', deserializePokemon, serializePokemon],
  ['move', deserializeString, serializeString],
  [
    'target',
    createNullableDeserializer<Pokemon | undefined>(createOptionalDeserializer(deserializePokemon)),
    createNullableSerializer(createOptionalSerializer(serializePokemon)),
  ],
];

export const deserializeMoveMessage = createSchemaDeserializer(moveMessageType, moveMessageSchema);
export const serializeMoveMessage = createSchemaSerializer(
  moveMessageType,
  moveMessageSchema,
);
