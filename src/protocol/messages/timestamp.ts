import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const timestampMessageType = t.type({
  timestamp: t.number,
});

/**
 * A message that is sent when a timestamp is sent.
 *
 * Serialized example: `|t:|1`
 *
 * Deserialized example:
 * ```json
 * {
 *   "timestamp": 1
 * }
 * ```
 *
 * @member timestamp The timestamp
 */
export type TimestampMessage = t.TypeOf<typeof timestampMessageType>;

export const timestampMessageSchema: KeySchema<TimestampMessage> = [
  ['timestamp', deserializeNumber, serializeNumber],
];

export const deserializeTimestampMessage = createSchemaDeserializer(
  timestampMessageType,
  timestampMessageSchema,
);
export const serializeTimestampMessage = createSchemaSerializer(
  timestampMessageType,
  timestampMessageSchema,
);
