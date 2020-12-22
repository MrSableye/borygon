import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseUser,
  userType,
} from '../system/types';

// `|win|USER`
// > `USER` has won the battle.
export const winEventType = t.type({
  user: userType,
});
export type WinEvent = t.TypeOf<typeof winEventType>;
export const winEventSchema: KeySchema<WinEvent> = [
  ['user', parseUser],
];
export const parseWinEvent = createSchemaParser(winEventType, winEventSchema);
