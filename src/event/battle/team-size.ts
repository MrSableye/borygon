import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';
import {
  parsePlayer,

  playerType,
} from './types';

// `|teamsize|PLAYER|NUMBER`
// > - `PLAYER` is `p1`, `p2`, `p3`, or `p4`
// > - `NUMBER` is the number of Pokémon your opponent starts with. In games
// >   without Team Preview, you don't know which Pokémon your opponent has, but
// >   you at least know how many there are.
//     |teamsize|p1|4
export const teamSizeEventType = t.type({
  player: playerType,
  number: t.number,
});
export type TeamSizeEvent = t.TypeOf<typeof teamSizeEventType>;
export const teamSizeEventSchema: KeySchema<TeamSizeEvent> = [
  ['player', parsePlayer],
  ['number', parseNumber],
];
export const parseTeamSizeEvent = createSchemaParser(teamSizeEventType, teamSizeEventSchema);
