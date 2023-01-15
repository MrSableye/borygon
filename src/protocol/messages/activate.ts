import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
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

export const activateMessageType = t.intersection([
  t.type({
    effect: t.string,
  }),
  t.partial({
    pokemon: pokemonType,
    effectArguments: t.array(t.string),
  }),
]);

/**
 * A message that is sent when a Pokémon's effect activates.
 *
 * In the majority of cases, `pokemon` is defined. However, for Delta Stream
 * there is no Pokémon provided.
 *
 * Serialized example: `|-activate|p1a: Landorus-Therian|move: Protect`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "effect": "move: Protect"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose ability was triggered
 * @member effect The effect
 * @member effectArguments Additional data related to the effect
 */
export type ActivateMessage = t.TypeOf<typeof activateMessageType>;

export const activateMessageSchema: KeySchema<ActivateMessage> = [
  ['pokemon', createOptionalDeserializer(deserializePokemon), createOptionalSerializer(serializePokemon)],
  ['effect', deserializeString, serializeString],
  ['effectArguments', createOptionalDeserializer(createArrayDeserializer(deserializeString, '|')), createOptionalSerializer(createArraySerializer(serializeString, '|'))],
];

export const deserializeActivateMessage = createSchemaDeserializer(
  activateMessageType,
  activateMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeActivateMessage = createSchemaSerializer(
  activateMessageType,
  activateMessageSchema,
  { omitTrailingUndefinedParts: true },
);
