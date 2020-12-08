import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|name, n, N|USER|OLDID
export const nameChangeEventType = t.type({
  newUsername: t.string,
  oldUsername: t.string,
});
export type NameChangeEvent = t.TypeOf<typeof nameChangeEventType>;
export const nameChangeEventSchema: KeySchema<NameChangeEvent> = [
  ['newUsername', parseString],
  ['oldUsername', parseString],
];
export const parseNameChangeEvent = createSchemaParser(nameChangeEventType, nameChangeEventSchema);
