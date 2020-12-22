import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|name, n, N|USER|OLDID
export const nameChangeEventType = t.type({
  newUser: userType,
  oldUser: userType,
});
export type NameChangeEvent = t.TypeOf<typeof nameChangeEventType>;
export const nameChangeEventSchema: KeySchema<NameChangeEvent> = [
  ['newUser', parseUser],
  ['oldUser', parseUser],
];
export const parseNameChangeEvent = createSchemaParser(nameChangeEventType, nameChangeEventSchema);
