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

export const endAbilityMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
  }),
  t.partial({
    ability: t.string,
  }),
]);

/**
 * A message that is sent when a Pokémon's ability ends.
 *
 * Serialized example: `|-endability|p2b: Venusaur|Chlorophyl`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "ability": "Intimidate",
 *   "effect": "boost"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose ability was triggered
 * @member ability The ability
 * @member effect The effect of the ability
 */
export type EndAbilityMessage = t.TypeOf<typeof endAbilityMessageType>;

export const endAbilityMessageSchema: KeySchema<EndAbilityMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['ability', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeEndAbilityMessage = createSchemaDeserializer(
  endAbilityMessageType,
  endAbilityMessageSchema,
);
export const serializeEndAbilityMessage = createSchemaSerializer(
  endAbilityMessageType,
  endAbilityMessageSchema,
  { omitTrailingUndefinedParts: true },
);
