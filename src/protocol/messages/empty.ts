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

export const emptyMessageType = t.partial({
  message: t.string,
});

/* eslint-disable max-len */
/**
 * A message that is sent as either empty or a raw message.
 *
 * Serialized example: `||Ladder isn't responding, score probably updated but might not have (Request timeout).`
 *
 * Deserialized example:
 * ```json
 * {
 *   "message": "Ladder isn't responding, score probably updated but might not have (Request timeout)."
 * }
 * ```
 *
 * @member message The message
 */
export type EmptyMessage = t.TypeOf<typeof emptyMessageType>;
/* eslint-enable max-len */

export const emptyMessageSchema: KeySchema<EmptyMessage> = [
  ['message', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeEmptyMessage = createSchemaDeserializer(
  emptyMessageType,
  emptyMessageSchema,
  {
    concatenateLastArguments: true,
    skipKeywordArguments: true,
  },
);
export const serializeEmptyMessage = createSchemaSerializer(
  emptyMessageType,
  emptyMessageSchema,
  { omitTrailingUndefinedParts: true },
);
