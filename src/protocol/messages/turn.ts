import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const turnMessageType = t.type({
  turn: t.number,
});

/**
 * A message that is sent when a battle's turn number is announced.
 *
 * Serialized example: `|turn|1`
 *
 * Deserialized example:
 * ```json
 * {
 *   "turn": 1
 * }
 * ```
 *
 * @member turn The turn number
 */
export type TurnMessage = t.TypeOf<typeof turnMessageType>;

export const turnMessageSchema: KeySchema<TurnMessage> = [
  ['turn', deserializeNumber, serializeNumber],
];

export const deserializeTurnMessage = createSchemaDeserializer(turnMessageType, turnMessageSchema);
export const serializeTurnMessage = createSchemaSerializer(turnMessageType, turnMessageSchema);
