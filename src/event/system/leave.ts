import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|leave(l,L)|USERNAME
export const leaveEventType = t.type({
  user: userType,
});
export type LeaveEvent = t.TypeOf<typeof leaveEventType>;
export const leaveEventSchema: KeySchema<LeaveEvent> = [
  ['user', parseUser],
];
export const parseLeaveEvent = createSchemaParser(leaveEventType, leaveEventSchema);
