import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const fieldStartMessageType = t.type({
  condition: t.string,
});

/**
 * A message that is sent when a field condition starts.
 *
 * Serialized example: `|-fieldstart|move: Grassy Terrain`
 *
 * Deserialized example:
 * ```json
 * {
 *   "condition": "move: Grassy Terrain"
 * }
 * ```
 *
 * @member condition The field condition that started
 */
export type FieldStartMessage = t.TypeOf<typeof fieldStartMessageType>;

export const fieldStartMessageSchema: KeySchema<FieldStartMessage> = [
  ['condition', deserializeString, serializeString],
];

export const deserializeFieldStartMessage = createSchemaDeserializer(
  fieldStartMessageType,
  fieldStartMessageSchema,
);
export const serializeFieldStartMessage = createSchemaSerializer(
  fieldStartMessageType,
  fieldStartMessageSchema,
);
