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

export const detailsChangeMessageType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hpWithStatus: hpWithStatusType,
  }),
]);

/**
 * A message that is sent when a Pokémon's details change.
 *
 * Serialized example: `|detailschange|p1a: Zygarde|Zygarde-Complete`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Zygarde",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "details": {
 *     "species": "Zygarde-Complete",
 *     "level": 100,
 *     "shiny": false
 *   }
 * }
 * ```
 *
 * @member pokemon The Pokémon whose details were changed
 * @member details The new details of the Pokémon
 * @member hpWithStatus The HP and status of the Pokémon
 */
export type DetailsChangeMessage = t.TypeOf<typeof detailsChangeMessageType>;

export const detailsChangeMessageSchema: KeySchema<DetailsChangeMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
  ['hpWithStatus', createOptionalDeserializer(deserializeHpWithStatus), createOptionalSerializer(serializeHpWithStatus)],
];

export const deserializeDetailsChangeMessage = createSchemaDeserializer(
  detailsChangeMessageType,
  detailsChangeMessageSchema,
);
export const serializeDetailsChangeMessage = createSchemaSerializer(
  detailsChangeMessageType,
  detailsChangeMessageSchema,
  { omitTrailingUndefinedParts: true },
);
