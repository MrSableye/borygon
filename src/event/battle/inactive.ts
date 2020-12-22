import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|inactive|MESSAGE` or `|inactiveoff|MESSAGE`
// > A message related to the battle timer has been sent. The official client
// > displays these messages in red.
// >
// > `inactive` means that the timer is on at the time the message was sent,
// > while `inactiveoff` means that the timer is off.
// |inactive|Time left: 300 sec this turn | 300 sec total | 60 sec grace
export const inactiveEventType = t.type({
  message: t.string,
});
export type InactiveEvent = t.TypeOf<typeof inactiveEventType>;
export const inactiveEventSchema: KeySchema<InactiveEvent> = [
  ['message', parseString],
];
export const parseInactiveEvent = createSchemaParser(inactiveEventType, inactiveEventSchema);
