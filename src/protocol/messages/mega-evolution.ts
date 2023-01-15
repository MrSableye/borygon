import * as t from 'io-ts';
import {
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

export const megaEvolutionMessageType = t.type({
  pokemon: pokemonType,
  species: t.string,
  megaStone: t.string,
});

/**
 * A message that is sent when a Pokémon Mega Evolves.
 *
 * Serialized example: `|-mega|p1a: Pidgeot|Pidgeot|Pidgeotite`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Pidgeot",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "species": "Pidgeot",
 *   "megaStone": "Pidgeotite"
 * }
 * ```
 *
 * @member pokemon The Pokémon that Mega Evolved
 * @member species The species of the Pokémon that Mega Evolved
 * @member megaStone The Mega Stone used to Mega Evolve
 */
export type MegaEvolutionMessage = t.TypeOf<typeof megaEvolutionMessageType>;

export const megaEvolutionMessageSchema: KeySchema<MegaEvolutionMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['species', deserializeString, serializeString],
  ['megaStone', deserializeString, serializeString],
];

export const deserializeMegaEvolutionMessage = createSchemaDeserializer(
  megaEvolutionMessageType,
  megaEvolutionMessageSchema,
);
export const serializeMegaEvolutionMessage = createSchemaSerializer(
  megaEvolutionMessageType,
  megaEvolutionMessageSchema,
);
