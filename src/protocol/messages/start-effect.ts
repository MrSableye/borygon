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

export const startEffectMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    effect: t.string,
  }),
  t.partial({
    effectArguments: t.array(t.string),
  }),
]);

/**
 * A message that is sent when a Pokémon's effect starts.
 *
 * Serialized example: `|-start|p1a: Charizard|Dynamax|Gmax`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Charizard",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "effect": "Dynamax",
 *   "effectArguments": ["Gmax"]
 * }
 * ```
 *
 * @member pokemon The Pokémon's whose effect started
 * @member effect The effect that started
 * @member effectArguments Additional data related to the effect
 */
export type StartEffectMessage = t.TypeOf<typeof startEffectMessageType>;

export const startEffectMessageSchema: KeySchema<StartEffectMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', deserializeString, serializeString],
  ['effectArguments', createOptionalDeserializer(createArrayDeserializer(deserializeString, '|'), false), createOptionalSerializer(createArraySerializer(serializeString, '|'))],
];

export const deserializeStartEffectMessage = createSchemaDeserializer(
  startEffectMessageType,
  startEffectMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeStartEffectMessage = createSchemaSerializer(
  startEffectMessageType,
  startEffectMessageSchema,
  { omitTrailingUndefinedParts: true },
);
