import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePokemon,
  deserializePokemonDetails,
  pokemonDetailsType,
  pokemonType,
  serializePokemon,
  serializePokemonDetails,
} from './types';

export const updatePokemonMessageType = t.type({
  pokemon: pokemonType,
  details: pokemonDetailsType,
});

/**
 * A message that is sent when a Pokémon's details are updated.
 *
 * Serialized example: `|updatepoke|p1a: Zygarde|Zygarde-Complete`
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
 * @member pokemon The Pokémon whose details were updated
 * @member details The new details of the Pokémon
 */
export type UpdatePokemonMessage = t.TypeOf<typeof updatePokemonMessageType>;

export const updatePokemonMessageSchema: KeySchema<UpdatePokemonMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['details', deserializePokemonDetails, serializePokemonDetails],
];

export const deserializeUpdatePokemonMessage = createSchemaDeserializer(
  updatePokemonMessageType,
  updatePokemonMessageSchema,
);
export const serializeUpdatePokemonMessage = createSchemaSerializer(
  updatePokemonMessageType,
  updatePokemonMessageSchema,
);
