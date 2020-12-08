import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';

// `|usercount|USERCOUNT
export const userCountEventType = t.type({
  usercount: t.number,
});
export type UserCountEvent = t.TypeOf<typeof userCountEventType>;
export const userCountEventSchema: KeySchema<UserCountEvent> = [
  ['usercount', parseNumber],
];
export const parseUserCountEvent = createSchemaParser(
  userCountEventType,
  userCountEventSchema,
);
