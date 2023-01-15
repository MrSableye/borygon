import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializeRoomType,
  roomTypeType,
  serializeRoomType,
} from './types';

export const initializeRoomMessageType = t.type({
  roomType: roomTypeType,
});

/**
 * A message that is sent when a room loads.
 *
 * Serialized example: `|init|chat`
 *
 * Deserialized example:
 * ```json
 * {
 *   "roomType": "chat"
 * }
 * ```
 *
 * @member errorType The type of room that loaded
 */
export type InitializeRoomMessage = t.TypeOf<typeof initializeRoomMessageType>;

export const initializeRoomMessageSchema: KeySchema<InitializeRoomMessage> = [
  ['roomType', deserializeRoomType, serializeRoomType],
];

export const deserializeInitializeRoomMessage = createSchemaDeserializer(
  initializeRoomMessageType,
  initializeRoomMessageSchema,
);
export const serializeInitializeRoomMessage = createSchemaSerializer(
  initializeRoomMessageType,
  initializeRoomMessageSchema,
);
