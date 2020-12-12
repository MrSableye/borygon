import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import {
  parseRoomInitializationErrorType,
  roomInitializationErrorTypeType,
} from './types';

// `|noinit|ERROTYPE|MESSAGE
export const errorInitializingRoomEventType = t.type({
  errorType: roomInitializationErrorTypeType,
  message: t.string,
});
export type ErrorInitializingRoomEvent = t.TypeOf<typeof errorInitializingRoomEventType>;
export const errorInitializingRoomEventSchema: KeySchema<ErrorInitializingRoomEvent> = [
  ['errorType', parseRoomInitializationErrorType],
  ['message', parseString],
];
export const parseErrorInitializingRoomEvent = createSchemaParser(
  errorInitializingRoomEventType,
  errorInitializingRoomEventSchema,
);
