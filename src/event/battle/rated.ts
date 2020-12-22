import * as t from 'io-ts';
import {
  createOptionalParser,
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|rated`
// > Will be sent if the game will affect the player's ladder rating (Elo
// > score).
// `|rated|MESSAGE`
// > Will be sent if the game is official in some other way, such as being
// > a tournament game. Does not actually mean the game is rated.
export const ratedEventType = t.partial({
  message: t.string,
});
export type RatedEvent = t.TypeOf<typeof ratedEventType>;
export const ratedEventSchema: KeySchema<RatedEvent> = [
  ['message', createOptionalParser(parseString)],
];
export const parseRatedEvent = createSchemaParser(ratedEventType, ratedEventSchema);
