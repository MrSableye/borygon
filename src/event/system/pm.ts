import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import { parseUser, userType } from './types';

// `|pm|SENDER|RECEIVER|MESSAGE
export const pmEventType = t.type({
  sender: userType,
  receiver: userType,
  message: t.string,
});
export type PmEvent = t.TypeOf<typeof pmEventType>;
export const pmEventSchema: KeySchema<PmEvent> = [
  ['sender', parseUser],
  ['receiver', parseUser],
  ['message', parseString],
];
export const parsePmEvent = createSchemaParser(
  pmEventType,
  pmEventSchema,
  { concatenateLastArguments: true },
);
