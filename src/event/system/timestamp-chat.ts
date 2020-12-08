import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
  parseString,
} from '../parser';

// `|c:|TIMESTAMP|USERNAME|MESSAGE
export const timestampChatEventType = t.type({
  timestamp: t.number,
  username: t.string,
  message: t.string,
});
export type TimestampChatEvent = t.TypeOf<typeof timestampChatEventType>;
export const timestampChatEventSchema: KeySchema<TimestampChatEvent> = [
  ['timestamp', parseNumber],
  ['username', parseString],
  ['message', parseString],
];
export const parseTimestampChatEvent = createSchemaParser(
  timestampChatEventType,
  timestampChatEventSchema,
  { concatenateLastArguments: true },
);
