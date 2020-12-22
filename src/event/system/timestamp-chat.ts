import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
  parseString,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|c:|TIMESTAMP|USERNAME|MESSAGE
export const timestampChatEventType = t.type({
  timestamp: t.number,
  user: userType,
  message: t.string,
});
export type TimestampChatEvent = t.TypeOf<typeof timestampChatEventType>;
export const timestampChatEventSchema: KeySchema<TimestampChatEvent> = [
  ['timestamp', parseNumber],
  ['user', parseUser],
  ['message', parseString],
];
export const parseTimestampChatEvent = createSchemaParser(
  timestampChatEventType,
  timestampChatEventSchema,
  { concatenateLastArguments: true },
);
