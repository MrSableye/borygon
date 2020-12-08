import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|pm|SENDER|RECEIVER|MESSAGE
export const pmEventType = t.type({
  sender: t.string,
  receiver: t.string,
  message: t.string,
});
export type PmEvent = t.TypeOf<typeof pmEventType>;
export const pmEventSchema: KeySchema<PmEvent> = [
  ['sender', parseString],
  ['receiver', parseString],
  ['message', parseString],
];
export const parsePmEvent = createSchemaParser(
  pmEventType,
  pmEventSchema,
  { concatenateLastArguments: true },
);
