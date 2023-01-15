import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializeSide,
  serializeSide,
  sideType,
} from './types';

export const sideEndMessageType = t.type({
  side: sideType,
  condition: t.string,
});

/**
 * A message that is sent when a side condition ends.
 *
 * Serialized example: `|-sideend|p1: zarel|move: Aurora Veil`
 *
 * Deserialized example:
 * ```json
 * {
 *   "side": {
 *     "player": "p1",
 *     "playerName": "zarel"
 *   },
 *   "condition": "move: Aurora Veil"
 * }
 * ```
 *
 * @member side The side whose condition ended
 * @member condition The condition that ended
 */
export type SideEndMessage = t.TypeOf<typeof sideEndMessageType>;

export const sideEndMessageSchema: KeySchema<SideEndMessage> = [
  ['side', deserializeSide, serializeSide],
  ['condition', deserializeString, serializeString],
];

export const deserializeSideEndMessage = createSchemaDeserializer(
  sideEndMessageType,
  sideEndMessageSchema,
);
export const serializeSideEndMessage = createSchemaSerializer(
  sideEndMessageType,
  sideEndMessageSchema,
);
