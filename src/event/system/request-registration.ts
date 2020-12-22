import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseUser,
  userType,
} from './types';

// `|askreg|USERNAME
export const requestRegistrationEventType = t.type({
  user: userType,
});
export type RequestRegistrationEvent = t.TypeOf<typeof requestRegistrationEventType>;
export const requestRegistrationEventSchema: KeySchema<RequestRegistrationEvent> = [
  ['user', parseUser],
];
export const parseRequestRegistrationEvent = createSchemaParser(
  requestRegistrationEventType,
  requestRegistrationEventSchema,
);
