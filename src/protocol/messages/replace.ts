import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeHpWithStatus,
  deserializePokemon,
  deserializePokemonDetails,
  hpWithStatusType,
  pokemonDetailsType,
  pokemonType,
  serializeHpWithStatus,
  serializePokemon,
  serializePokemonDetails,
} from './types';

export const replaceMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hpWithStatus: hpWithStatusType,
  }),
]);

/**
 * A message that is sent when a Pokémon's illusion breaks.
 *
 * Serialized example: `|replace|p1a: Zoroark|Zoroark`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Zoroark",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "details": {
 *     "species": "Zoroark",
 *     "level": 100,
 *     "shiny": false
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon whose illusion broke
 * @member details The details of the Pokémon whose illusion broke
 * @member hpWithStatus The HP and status of the Pokémon
 */
export type ReplaceMessage = t.TypeOf<typeof replaceMessageType>;

export const replaceMessageSchema: KeySchema<ReplaceMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
  ['hpWithStatus', createOptionalDeserializer(deserializeHpWithStatus), createOptionalSerializer(serializeHpWithStatus)],
];

export const deserializeReplaceMessage = createSchemaDeserializer(
  replaceMessageType,
  replaceMessageSchema,
);
export const serializeReplaceMessage = createSchemaSerializer(
  replaceMessageType,
  replaceMessageSchema,
  { omitTrailingUndefinedParts: true },
);
