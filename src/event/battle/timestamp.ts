import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';

// `|t:|TIMESTAMP`
// > The current UNIX timestamp (the number of seconds since 1970) - useful for determining
// > when events occured in real time.
export const timestampEventType = t.type({
  timestamp: t.number,
});
export type TimestampEvent = t.TypeOf<typeof timestampEventType>;
export const timestampEventSchema: KeySchema<TimestampEvent> = [
  ['timestamp', parseNumber],
];
export const parseTimestampEvent = createSchemaParser(timestampEventType, timestampEventSchema);
