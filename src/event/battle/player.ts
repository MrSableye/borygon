import * as t from 'io-ts';
import {
  createOptionalParser,
  createSchemaParser,
  KeySchema,
  parseNumber,
  parseString,
} from '../parser';
import {
  parsePlayer,

  playerType,
} from './types';

// `|player|PLAYER|USERNAME|AVATAR|RATING`
//     |player|p1|Anonycat|60|1200
export const playerEventType = t.intersection([
  t.type({
    player: playerType,
    username: t.string,
    avatar: t.string,
  }),
  t.partial({
    rating: t.union([t.number, t.undefined]),
  }),
]);
export type PlayerEvent = t.TypeOf<typeof playerEventType>;
export const playerEventSchema: KeySchema<PlayerEvent> = [
  ['player', parsePlayer],
  ['username', parseString],
  ['avatar', parseString],
  ['rating', createOptionalParser(parseNumber)],
];
export const parsePlayerEvent = createSchemaParser(playerEventType, playerEventSchema);
