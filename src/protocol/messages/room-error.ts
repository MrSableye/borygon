import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const roomErrorMessageType = t.type({
  roomId: t.string,
  message: t.string,
});

/**
 * A message that is sent when a room-specific error occurs.
 *
 * Serialized example: `|roomerror|showderp|The room 'showderp' does not exist.`
 *
 * Deserialized example:
 * ```json
 * {
 *   "roomId": "showderp",
 *   "message": "The room 'showderp' does not exist."
 * }
 * ```
 *
 * @member roomId The room id of the room with an error
 * @member message The error message
 */
export type RoomErrorMessage = t.TypeOf<typeof roomErrorMessageType>;

export const roomErrorMessageSchema: KeySchema<RoomErrorMessage> = [
  ['roomId', deserializeString, serializeString],
  ['message', deserializeString, serializeString],
];

export const deserializeRoomErrorMessage = createSchemaDeserializer(
  roomErrorMessageType,
  roomErrorMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeRoomErrorMessage = createSchemaSerializer(
  roomErrorMessageType,
  roomErrorMessageSchema,
);
