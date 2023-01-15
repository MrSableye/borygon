import * as t from 'io-ts';
import {
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
  pokemonType,
  serializePokemon,
} from './types';

export const cantMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    reason: t.string,
  }),
  t.partial({
    move: t.string,
  }),
]);

/**
 * A message that is sent when an action can't occur.
 *
 * Serialized example: `|cant|p1a: Psyduck|ability: Damp|Self-Destruct`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Psyduck",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "reason": "ability: Damp",
 *   "move": "Self-Destruct"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose attribute stopped the action from occuring
 * @member reason The reason the action was prevented
 * @member move The move that was prevented
 */
export type CantMessage = t.TypeOf<typeof cantMessageType>;

export const cantMessageSchema: KeySchema<CantMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['reason', deserializeString, serializeString],
  ['move', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeCantMessage = createSchemaDeserializer(cantMessageType, cantMessageSchema);
export const serializeCantMessage = createSchemaSerializer(
  cantMessageType,
  cantMessageSchema,
  { omitTrailingUndefinedParts: true },
);
