import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|askreg|USERNAME
export const requestRegistrationEventType = t.type({
  username: t.string,
});
export type RequestRegistrationEvent = t.TypeOf<typeof requestRegistrationEventType>;
export const requestRegistrationEventSchema: KeySchema<RequestRegistrationEvent> = [
  ['username', parseString],
];
export const parseRequestRegistrationEvent = createSchemaParser(
  requestRegistrationEventType,
  requestRegistrationEventSchema,
);
