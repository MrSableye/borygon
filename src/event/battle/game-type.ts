import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  gameTypeType,

  parseGameType,
} from './types';

// `|gametype|GAMETYPE`
// > - `GAMETYPE` is `singles`, `doubles`, `triples`, `multi`, or `free-for-all`.
//     |gametype|doubles
export const gameTypeEventType = t.type({
  gameType: gameTypeType,
});
export type GameTypeEvent = t.TypeOf<typeof gameTypeEventType>;
export const gameTypeEventSchema: KeySchema<GameTypeEvent> = [
  ['gameType', parseGameType],
];
export const parseGameTypeEvent = createSchemaParser(gameTypeEventType, gameTypeEventSchema);
