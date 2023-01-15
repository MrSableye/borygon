import * as t from 'io-ts';
import {
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

export const switchMessageType = t.type({
  pokemon: pokemonType,
  details: pokemonDetailsType,
  hpWithStatus: hpWithStatusType,
});

/**
 * A message that is sent when a Pokémon is switched in.
 *
 * Serialized example: `|switch|p1a: Roserade|Roserade, M|100/100`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Roserade",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "details": {
 *     "species": Roserade",
 *     "level": 100,
 *     "shiny": false,
 *     "gender": "M"
 *   },
 *   "hpWithStatus": {
 *     "hp": {
 *       "numerator": 100,
 *       "denominator": 100
 *     }
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon which was switched in
 * @member details The details of the Pokémon switched in
 * @member hpWithStatus The HP and status of the Pokémon
 */
export type SwitchMessage = t.TypeOf<typeof switchMessageType>;

export const switchMessageSchema: KeySchema<SwitchMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
  ['hpWithStatus', deserializeHpWithStatus, serializeHpWithStatus],
];

export const deserializeSwitchMessage = createSchemaDeserializer(
  switchMessageType,
  switchMessageSchema,
);
export const serializeSwitchMessage = createSchemaSerializer(
  switchMessageType,
  switchMessageSchema,
  { omitTrailingUndefinedParts: true },
);
