import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|join(j,J)|USERNAME
export const joinEventType = t.type({
  user: userType,
});
export type JoinEvent = t.TypeOf<typeof joinEventType>;
export const joinEventSchema: KeySchema<JoinEvent> = [
  ['user', parseUser],
];
export const parseJoinEvent = createSchemaParser(joinEventType, joinEventSchema);
