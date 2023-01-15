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
  deserializePokemonDetails,
  pokemonDetailsType,
  pokemonType,
  serializePokemon,
  serializePokemonDetails,
} from './types';

export const formeChangeMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    message: t.string,
  }),
]);

/**
 * A message that is sent when a Pokémon's forme changes.
 *
 * Serialized example: `|-formechange|p1a: Aegislash|Aegislash-Blade`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Aegislash",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "forme": "Aegislash-Blade"
 * }
 * ```
 *
 * @member pokemon The Pokémon whose forme changed
 * @member details The new details of the Pokémon
 * @member message The transformation message
 */
export type FormeChangeMessage = t.TypeOf<typeof formeChangeMessageType>;

export const formeChangeMessageSchema: KeySchema<FormeChangeMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
  ['message', createOptionalDeserializer(deserializeString, false), createOptionalSerializer(serializeString)],
];

export const deserializeFormeChangeMessage = createSchemaDeserializer(
  formeChangeMessageType,
  formeChangeMessageSchema,
);
export const serializeFormeChangeMessage = createSchemaSerializer(
  formeChangeMessageType,
  formeChangeMessageSchema,
  { omitTrailingUndefinedParts: true },
);
