import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const fieldEndMessageType = t.type({
  condition: t.string,
});

/**
 * A message that is sent when a field condition ends.
 *
 * Serialized example: `|-fieldend|move: Grassy Terrain`
 *
 * Deserialized example:
 * ```json
 * {
 *   "condition": "move: Grassy Terrain"
 * }
 * ```
 *
 * @member condition The field condition that ended
 */
export type FieldEndMessage = t.TypeOf<typeof fieldEndMessageType>;

export const fieldEndMessageSchema: KeySchema<FieldEndMessage> = [
  ['condition', deserializeString, serializeString],
];

export const deserializeFieldEndMessage = createSchemaDeserializer(
  fieldEndMessageType,
  fieldEndMessageSchema,
);
export const serializeFieldEndMessage = createSchemaSerializer(
  fieldEndMessageType,
  fieldEndMessageSchema,
);
