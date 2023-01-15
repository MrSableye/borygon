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

export const abilityMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    ability: t.string,
  }),
  t.partial({
    effect: t.string,
  }),
]);

/**
 * A message that is sent when a Pokémon's ability activates.
 *
 * Serialized example: `|-ability|p1a: Landorus-Therian|Intimidate|boost`
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
export type AbilityMessage = t.TypeOf<typeof abilityMessageType>;

export const abilityMessageSchema: KeySchema<AbilityMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['ability', deserializeString, serializeString],
  ['effect', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeAbilityMessage = createSchemaDeserializer(
  abilityMessageType,
  abilityMessageSchema,
);
export const serializeAbilityMessage = createSchemaSerializer(
  abilityMessageType,
  abilityMessageSchema,
  { omitTrailingUndefinedParts: true },
);
