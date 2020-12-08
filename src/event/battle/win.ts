import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// `|win|USER`
// > `USER` has won the battle.
export const winEventType = t.type({
  username: t.string,
});
export type WinEvent = t.TypeOf<typeof winEventType>;
export const winEventSchema: KeySchema<WinEvent> = [
  ['username', parseString],
];
export const parseWinEvent = createSchemaParser(winEventType, winEventSchema);
