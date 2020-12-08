import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// `|-message|MESSAGE`
// > Displays a miscellaneous message to the client. These messages are primarily used
// > for messages from game mods that aren't supported by the client, like rule clauses
// > such as Sleep Clause, or other metagames with custom messages for specific scenarios.
export const miscellaneousMessageEventType = t.type({
  message: t.string,
});
export type MiscellaneousMessageEvent = t.TypeOf<typeof miscellaneousMessageEventType>;
export const miscellaneousMessageSchema: KeySchema<MiscellaneousMessageEvent> = [
  ['message', parseString],
];
export const parseMiscellaneousMessageEvent = createSchemaParser(
  miscellaneousMessageEventType,
  miscellaneousMessageSchema,
);
