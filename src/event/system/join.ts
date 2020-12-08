import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|join(j,J)|USERNAME
export const joinEventType = t.type({
  username: t.string,
});
export type JoinEvent = t.TypeOf<typeof joinEventType>;
export const joinEventSchema: KeySchema<JoinEvent> = [
  ['username', parseString],
];
export const parseJoinEvent = createSchemaParser(joinEventType, joinEventSchema);
