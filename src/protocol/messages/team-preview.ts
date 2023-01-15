import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  Deserializer,
  KeySchema,
  Serializer,
} from '../parser';
import {
  deserializePlayer,
  deserializePokemonDetails,
  playerType,
  pokemonDetailsType,
  serializePlayer,
  serializePokemonDetails,
} from './types';

const itemTypeType = t.keyof({
  item: true,
  mail: true,
});

type ItemType = t.TypeOf<typeof itemTypeType>;

const deserializeItemType: Deserializer<ItemType> = (input: string) => {
  if ((itemTypeType.keys as any)[input]) {
    return { value: input as ItemType };
  }

  return { errors: [`${input} is not a valid ItemType`] };
};

const serializeItemType: Serializer<ItemType> = (input) => ({
  value: input,
});

export const teamPreviewMessageType = t.intersection([
  t.type({
    player: playerType,
    pokemonDetails: pokemonDetailsType,
  }),
  t.partial({
    item: itemTypeType,
  }),
]);

/**
 * A message that is sent when a Pokémon is shown in team preview.
 *
 * Serialized example: `|poke|p1|Pikachu, L59, F|item`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "details": {
 *     "species": "Pikachu",
 *     "level": 59,
 *     "shiny": false,
 *     "gender": "F",
 *   },
 *   "item": true
 * }
 * ```
 *
 * @member player The player whose Pokémon is shown
 * @member details The details of the Pokémon
 * @member item Whether or not the Pokémon has an item
 */
export type TeamPreviewMessage = t.TypeOf<typeof teamPreviewMessageType>;

export const teamPreviewMessageSchema: KeySchema<TeamPreviewMessage> = [
  ['player', deserializePlayer, serializePlayer],
  ['pokemonDetails', deserializePokemonDetails, serializePokemonDetails],
  ['item', createOptionalDeserializer(deserializeItemType), createOptionalSerializer(serializeItemType)],
];

export const deserializeTeamPreviewMessage = createSchemaDeserializer(
  teamPreviewMessageType,
  teamPreviewMessageSchema,
);
export const serializeTeamPreviewMessage = createSchemaSerializer(
  teamPreviewMessageType,
  teamPreviewMessageSchema,
);
