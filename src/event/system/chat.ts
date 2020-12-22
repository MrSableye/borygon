import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|chat|USERNAME|MESSAGE
export const chatEventType = t.type({
  user: userType,
  message: t.string,
});
export type ChatEvent = t.TypeOf<typeof chatEventType>;
export const chatEventSchema: KeySchema<ChatEvent> = [
  ['user', parseUser],
  ['message', parseString],
];
export const parseChatEvent = createSchemaParser(
  chatEventType,
  chatEventSchema,
  { concatenateLastArguments: true },
);
