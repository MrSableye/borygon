import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// |inactiveoff|Battle timer is now OFF.
export const inactiveOffEventType = t.type({
  message: t.string,
});
export type InactiveOffEvent = t.TypeOf<typeof inactiveOffEventType>;
export const inactiveOffEventSchema: KeySchema<InactiveOffEvent> = [
  ['message', parseString],
];
export const parseInactiveOffEvent = createSchemaParser(
  inactiveOffEventType,
  inactiveOffEventSchema,
);
