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

export const prepareMoveMessageType = t.intersection([
  t.type({
    attacker: pokemonType,
    move: t.string,
  }),
  t.partial({
    defender: pokemonType,
  }),
]);

/**
 * A message that is sent when a Pokémon's move misses.
 *
 * Serialized example: `|-prepare|p1a: Rufflet|Sky Drop|p2a: Toxapex`
 *
 * Deserialized example:
 * ```json
 * {
 *   "attacker": {
 *     "name": "Rufflet",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "move": "Sky Drop",
 *   "defender": {
 *     "name": "Toxapex",
 *     "player": "p2",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member attacker The user of the move
 * @member move The move
 * @member defender The target of the move
 */
export type PrepareMoveMessage = t.TypeOf<typeof prepareMoveMessageType>;

export const prepareMoveMessageSchema: KeySchema<PrepareMoveMessage> = [
  ['attacker', deserializePokemon, serializePokemon],
  ['move', deserializeString, serializeString],
  ['defender', createOptionalDeserializer(deserializePokemon), createOptionalSerializer(serializePokemon)],
];

export const deserializePrepareMoveMessage = createSchemaDeserializer(
  prepareMoveMessageType,
  prepareMoveMessageSchema,
);
export const serializePrepareMoveMessage = createSchemaSerializer(
  prepareMoveMessageType,
  prepareMoveMessageSchema,
  { omitTrailingUndefinedParts: true },
);
