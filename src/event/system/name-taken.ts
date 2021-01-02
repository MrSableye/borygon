import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// |nametaken|USERNAME|MESSAGE
export const nameTakenEventType = t.type({
  username: t.string,
  message: t.string,
});
export type NameTakenEvent = t.TypeOf<typeof nameTakenEventType>;
export const nameTakenEventSchema: KeySchema<NameTakenEvent> = [
  ['username', parseString],
  ['message', parseString],
];
export const parseNameTakenEvent = createSchemaParser(
  nameTakenEventType,
  nameTakenEventSchema,
  { concatenateLastArguments: true },
);
