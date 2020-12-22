import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePlayer,
  parsePokemonDetails,
  playerType,
  pokemonDetailsType,
} from './types';

// `|poke|PLAYER|DETAILS|ITEM`
// > Declares a Pokémon for Team Preview.
// >
// > - `PLAYER` is the player ID (see `|player|`)
// > - `DETAILS` describes the pokemon (see "Identifying Pokémon" below)
// > - `ITEM` will be `item` if the Pokémon is holding an item, or blank if it isn't.
// >
// > Note that forme and shininess are hidden on this, unlike on the `|switch|`
// > details message.
//     |poke|p1|Pikachu, L59, F|item
//     |poke|p1|Kecleon, M|item
//     |poke|p1|Jynx, F|item
//     |poke|p1|Mewtwo|item
//     |poke|p2|Hoopa-Unbound|
//     |poke|p2|Smeargle, L1, F|item
//     |poke|p2|Forretress, L31, F|
//     |poke|p2|Groudon, L60|item
//     |poke|p2|Feebas, L1, M|
export const teamPreviewEventType = t.type({
  player: playerType,
  pokemonDetails: pokemonDetailsType,
  item: t.boolean,
});
export type TeamPreviewEvent = t.TypeOf<typeof teamPreviewEventType>;
export const teamPreviewEventSchema: KeySchema<TeamPreviewEvent> = [
  ['player', parsePlayer],
  ['pokemonDetails', parsePokemonDetails],
  ['item', (input: string) => ({ value: input === 'item' })],
];
export const parseTeamPreviewEvent = createSchemaParser(
  teamPreviewEventType,
  teamPreviewEventSchema,
);
