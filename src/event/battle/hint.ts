import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|-hint|MESSAGE`
// > Displays a message in parentheses to the client. Hint messages appear to explain and
// > clarify why certain actions, such as Fake Out and Mat Block failing, have occurred,
// > when there would normally be no in-game messages.
export const hintEventType = t.type({
  message: t.string,
});
export type HintEvent = t.TypeOf<typeof hintEventType>;
export const hintEventSchema: KeySchema<HintEvent> = [
  ['message', parseString],
];
export const parseHintEvent = createSchemaParser(hintEventType, hintEventSchema);
