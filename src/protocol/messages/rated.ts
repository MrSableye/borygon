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

export const ratedMessageType = t.partial({
  message: t.string,
});

/**
 * A message that is sent when a battle is rated.
 *
 * Serialized example: `|rated|This is a rated battle.`
 *
 * Deserialized example:
 * ```json
 * {
 *   "message": "This is a rated battle."
 * }
 * ```
 *
 * @member message An optional message
 */
export type RatedMessage = t.TypeOf<typeof ratedMessageType>;

export const ratedMessageSchema: KeySchema<RatedMessage> = [
  ['message', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

export const deserializeRatedMessage = createSchemaDeserializer(
  ratedMessageType,
  ratedMessageSchema,
);
export const serializeRatedMessage = createSchemaSerializer(
  ratedMessageType,
  ratedMessageSchema,
);
