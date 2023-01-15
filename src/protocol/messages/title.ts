import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const titleMessageType = t.type({
  title: t.string,
});

/**
 * A message that is sent when a room's title is announced.
 *
 * Serialized example: `|title|My Cool Room`
 *
 * Deserialized example:
 * ```json
 * {
 *   "title": "My Cool Room"
 * }
 * ```
 *
 * @member title The room's title
 */
export type TitleMessage = t.TypeOf<typeof titleMessageType>;

export const titleMessageSchema: KeySchema<TitleMessage> = [
  ['title', deserializeString, serializeString],
];

export const deserializeTitleMessage = createSchemaDeserializer(
  titleMessageType,
  titleMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeTitleMessage = createSchemaSerializer(
  titleMessageType,
  titleMessageSchema,
);
