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

export const temporaryNotificationMessageType = t.intersection([
  t.type({
    id: t.string,
    title: t.string,
  }),
  t.partial({
    message: t.string,
    highlightToken: t.string,
  }),
]);

/* eslint-disable max-len */
/**
 * A message that is sent when a temporary notification is sent.
 *
 * Serialized example: `|tempnotify|pendingapprovals|Pending media request!|Check out the requests|new media request`
 *
 * Deserialized example:
 * ```json
 * {
 *   "id": "pendingapprovals",
 *   "title": "Pending media request!",
 *   "message": "Check out the requests",
 *   "highlightToken": "new media request"
 * }
 * ```
 *
 * @member id The id of the notification
 * @member title The title of the notification
 * @member message The notification message
 * @member highlightToken The highlight token
 */
export type TemporaryNotificationMessage = t.TypeOf<typeof temporaryNotificationMessageType>;
/* eslint-enable max-len */

export const temporaryNotificationMessageSchema: KeySchema<TemporaryNotificationMessage> = [
  ['id', deserializeString, serializeString],
  ['title', deserializeString, serializeString],
  ['message', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
  ['highlightToken', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeTemporaryNotificationMessage = createSchemaDeserializer(
  temporaryNotificationMessageType,
  temporaryNotificationMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeTemporaryNotificationMessage = createSchemaSerializer(
  temporaryNotificationMessageType,
  temporaryNotificationMessageSchema,
  { omitTrailingUndefinedParts: true },
);
