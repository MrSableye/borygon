import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const updateHtmlMessageType = t.type({
  name: t.string,
  message: t.string,
});

/**
 * A message that is sent when updatable HTML is changed.
 *
 * Serialized example: `|uhtml|mycoolhtml|<div>My Cool HTML!</div>`
 *
 * Deserialized example:
 * ```json
 * {
 *   "name": "mycoolhtml",
 *   "message": "<div>My Cool HTML!</div>"
 * }
 * ```
 *
 * @member name The name of the updatable HTML
 * @member message The HTML content
 */
export type UpdateHtmlMessage = t.TypeOf<typeof updateHtmlMessageType>;

export const updateHtmlMessageSchema: KeySchema<UpdateHtmlMessage> = [
  ['name', deserializeString, serializeString],
  ['message', deserializeString, serializeString],
];

export const deserializeUpdateHtmlMessage = createSchemaDeserializer(
  updateHtmlMessageType,
  updateHtmlMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeUpdateHtmlMessage = createSchemaSerializer(
  updateHtmlMessageType,
  updateHtmlMessageSchema,
);
