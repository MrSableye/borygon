import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|leave(l,L)|USERNAME
export const leaveEventType = t.type({
  username: t.string,
});
export type LeaveEvent = t.TypeOf<typeof leaveEventType>;
export const leaveEventSchema: KeySchema<LeaveEvent> = [
  ['username', parseString],
];
export const parseLeaveEvent = createSchemaParser(leaveEventType, leaveEventSchema);
