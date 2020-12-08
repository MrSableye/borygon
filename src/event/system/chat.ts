import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|chat|USERNAME|MESSAGE
export const chatEventType = t.type({
  username: t.string,
  message: t.string,
});
export type ChatEvent = t.TypeOf<typeof chatEventType>;
export const chatEventSchema: KeySchema<ChatEvent> = [
  ['username', parseString],
  ['message', parseString],
];
export const parseChatEvent = createSchemaParser(
  chatEventType,
  chatEventSchema,
  { concatenateLastArguments: true },
);
