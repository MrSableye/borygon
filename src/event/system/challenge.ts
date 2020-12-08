import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|challenge|ID|VALUE
export const challengeEventType = t.type({
  id: t.string,
  value: t.string,
});
export type ChallengeEvent = t.TypeOf<typeof challengeEventType>;
export const challengeEventSchema: KeySchema<ChallengeEvent> = [
  ['id', parseString],
  ['value', parseString],
];
export const parseChallengeEvent = createSchemaParser(
  challengeEventType,
  challengeEventSchema,
  { concatenateLastArguments: true },
);
