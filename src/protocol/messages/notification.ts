import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const notificationMessageType = t.intersection([
  t.type({
    title: t.string,
  }),
  t.partial({
    message: t.string,
    highlightToken: t.string,
  }),
]);

/**
 * A message that is sent when a notification is sent.
 *
 * Serialized example: `|notify|Pending media request!|Check out the requests|new media request`
 *
 * Deserialized example:
 * ```json
 * {
 *   "title": "Pending media request!",
 *   "message": "Check out the requests",
 *   "highlightToken": "new media request"
 * }
 * ```
 *
 * @member title The title of the notification
 * @member message The notification message
 * @member highlightToken The highlight token
 */
export type NotificationMessage = t.TypeOf<typeof notificationMessageType>;

export const notificationMessageSchema: KeySchema<NotificationMessage> = [
  ['title', deserializeString, serializeString],
  ['message', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
  ['highlightToken', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeNotificationMessage = createSchemaDeserializer(
  notificationMessageType,
  notificationMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeNotificationMessage = createSchemaSerializer(
  notificationMessageType,
  notificationMessageSchema,
  { omitTrailingUndefinedParts: true },
);
