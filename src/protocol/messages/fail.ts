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

export const failMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
  }),
  t.partial({
    action: t.string,
    actionArguments: t.array(t.string),
  }),
]);

/**
 * A message that is sent when an action on a Pokémon fails.
 *
 * Serialized example: `|-fail|p1a: Regice|unboost`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Regice",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "action": "unboost"
 * }
 * ```
 *
 * @member pokemon The Pokémon the action failed against
 * @member action The action
 * @member actionArguments Additional data related to the action
 */
export type FailMessage = t.TypeOf<typeof failMessageType>;

export const failMessageSchema: KeySchema<FailMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['action', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
  ['actionArguments', createOptionalDeserializer(createArrayDeserializer(deserializeString, '|')), createOptionalSerializer(createArraySerializer(serializeString, '|'))],
];

export const deserializeFailMessage = createSchemaDeserializer(
  failMessageType,
  failMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeFailMessage = createSchemaSerializer(
  failMessageType,
  failMessageSchema,
  { omitTrailingUndefinedParts: true },
);
