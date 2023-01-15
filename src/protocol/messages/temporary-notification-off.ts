import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const temporaryNotificationOffMessageType = t.type({
  id: t.string,
});

/**
 * A message that is sent when a temporary notification is turned off.
 *
 * Serialized example: `|tempnotifyoff|pendingapprovals`
 *
 * Deserialized example:
 * ```json
 * {
 *   "id": "pendingapprovals"
 * }
 * ```
 *
 * @member id The id of the notification
 */
export type TemporaryNotificationOffMessage = t.TypeOf<typeof temporaryNotificationOffMessageType>;

export const temporaryNotificationOffMessageSchema: KeySchema<TemporaryNotificationOffMessage> = [
  ['id', deserializeString, serializeString],
];

export const deserializeTemporaryNotificationOffMessage = createSchemaDeserializer(
  temporaryNotificationOffMessageType,
  temporaryNotificationOffMessageSchema,
);
export const serializeTemporaryNotificationOffMessage = createSchemaSerializer(
  temporaryNotificationOffMessageType,
  temporaryNotificationOffMessageSchema,
);
