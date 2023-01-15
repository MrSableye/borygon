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

export const blockMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    effect: t.string,
  }),
  t.partial({
    move: t.string,
    attacker: pokemonType,
  }),
]);

/**
 * A message that is sent when an effect targeted at a Pokémon blocks another effect.
 *
 * Serialized example: `|-block|p1a: Landorus-Therian|Dynamax`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "effect": "Dynamax"
 * }
 * ```
 *
 * @member pokemon The Pokémon which had an effect blocked
 * @member effect The effect that blocked another effect
 * @member move The move that was blocked
 * @member attacker The user of the move that was blocked
 */
export type BlockMessage = t.TypeOf<typeof blockMessageType>;

export const blockMessageSchema: KeySchema<BlockMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', deserializeString, serializeString],
  ['move', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
  ['attacker', createOptionalDeserializer(deserializePokemon), createOptionalSerializer(serializePokemon)],
];

export const deserializeBlockMessage = createSchemaDeserializer(
  blockMessageType,
  blockMessageSchema,
);
export const serializeBlockMessage = createSchemaSerializer(
  blockMessageType,
  blockMessageSchema,
  { omitTrailingUndefinedParts: true },
);
