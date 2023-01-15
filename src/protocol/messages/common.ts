import * as t from 'io-ts';
import {
  ArgsDeserializer,
  ArgsSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import { deserializePokemon, pokemonType, serializePokemon } from './types';

export const noArgsMessageType = t.type({});

/**
 * A shared message type for messages that contain no data.
 *
 * Serialized example: `|tie`
 *
 * Deserialized example:
 * ```json
 * {}
 * ```
 */
export type NoArgsMessage = t.TypeOf<typeof noArgsMessageType>;

export const deserializeNoArgsMessage: ArgsDeserializer<NoArgsMessage> = createSchemaDeserializer(
  noArgsMessageType,
  [],
);

export const serializeNoArgsMessage: ArgsSerializer<NoArgsMessage> = createSchemaSerializer(
  noArgsMessageType,
  [],
);

export const commonMessageMessageType = t.type({
  message: t.string,
});

/**
 * A shared message for messages that contain a simple message.
 * Depending on the type of this message, this can be text or HTML
 * and should be deal with accordingly.
 *
 * Serialized example: `|error|An error has occured!`
 *
 * Deserialized example:
 * ```json
 * {
 *   "message": "An error has occured!"
 * }
 * ```
 *
 * @member message The message
 */
export type CommonMessageMessage = t.TypeOf<typeof commonMessageMessageType>;

export const commonMessageMessageSchema: KeySchema<CommonMessageMessage> = [
  ['message', deserializeString, serializeString],
];

export const deserializeCommonMessageMessage = createSchemaDeserializer(
  commonMessageMessageType,
  commonMessageMessageSchema,
  {
    concatenateLastArguments: true,
    skipKeywordArguments: true,
  },
);
export const serializeCommonMessageMessage = createSchemaSerializer(
  commonMessageMessageType,
  commonMessageMessageSchema,
);

export const singlePokemonMessageType = t.type({
  pokemon: pokemonType,
});

/**
 * A shared message type for messages that contain a single Pokémon.
 *
 * Serialized example: `|faint|p1a: Pikachu`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Pikachu",
 *     "position": {
 *       "player": "p1",
 *       "subPosition": "a"
 *     }
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon
 */
export type SinglePokemonMessageType = t.TypeOf<typeof singlePokemonMessageType>;

export const singlePokemonMessageSchema: KeySchema<SinglePokemonMessageType> = [
  ['pokemon', deserializePokemon, serializePokemon],
];

export const deserializeSinglePokemonMessage = createSchemaDeserializer(
  singlePokemonMessageType,
  singlePokemonMessageSchema,
);
export const serializeSinglePokemonMessage = createSchemaSerializer(
  singlePokemonMessageType,
  singlePokemonMessageSchema,
);
