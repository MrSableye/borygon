import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|raw|MESSAGE
export const rawEventType = t.type({
  message: t.string,
});
export type RawEvent = t.TypeOf<typeof rawEventType>;
export const rawEventSchema: KeySchema<RawEvent> = [
  ['message', parseString],
];
export const parseRawEvent = createSchemaParser(
  rawEventType,
  rawEventSchema,
  { concatenateLastArguments: true },
);
