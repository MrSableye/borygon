import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializeRoomInitializationErrorType,
  roomInitializationErrorTypeType,
  serializeRoomInitializationErrorType,
} from './types';

export const errorInitializingRoomMessageType = t.type({
  errorType: roomInitializationErrorTypeType,
  message: t.string,
});

/**
 * A message that is sent when an room error occurs.
 *
 * Serialized example: `|noinit|nonexistent|The room "showderp" does not exist.`
 *
 * Deserialized example:
 * ```json
 * {
 *   "errorType": "nonexistent",
 *   "message": "The room \"showderp\" does not exist."
 * }
 * ```
 *
 * @member errorType The type of error that occured
 * @member message The error message
 */
export type ErrorInitializingRoomMessage = t.TypeOf<typeof errorInitializingRoomMessageType>;

export const errorInitializingRoomMessageSchema: KeySchema<ErrorInitializingRoomMessage> = [
  ['errorType', deserializeRoomInitializationErrorType, serializeRoomInitializationErrorType],
  ['message', deserializeString, serializeString],
];

export const deserializeErrorInitializingRoomMessage = createSchemaDeserializer(
  errorInitializingRoomMessageType,
  errorInitializingRoomMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeErrorInitializingRoomMessage = createSchemaSerializer(
  errorInitializingRoomMessageType,
  errorInitializingRoomMessageSchema,
);
