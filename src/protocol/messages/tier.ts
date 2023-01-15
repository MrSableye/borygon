import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const tierMessageType = t.type({
  format: t.string,
});

/**
 * A message that is sent when a battle's format is announced.
 *
 * Serialized example: `|tier|[Gen 8] OU`
 *
 * Deserialized example:
 * ```json
 * {
 *   "format": "[Gen 8] OU"
 * }
 * ```
 *
 * @member pokemon The format that was announced
 */
export type TierMessage = t.TypeOf<typeof tierMessageType>;

export const tierMessageSchema: KeySchema<TierMessage> = [
  ['format', deserializeString, serializeString],
];

export const deserializeTierMessage = createSchemaDeserializer(
  tierMessageType,
  tierMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeTierMessage = createSchemaSerializer(
  tierMessageType,
  tierMessageSchema,
);
