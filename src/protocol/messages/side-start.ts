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

export const sideStartMessageType = t.type({
  side: sideType,
  condition: t.string,
});

/**
 * A message that is sent when a side condition starts.
 *
 * Serialized example: `|-sidestart|p1: zarel|move: Aurora Veil`
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
 * @member side The side whose condition started
 * @member condition The condition that started
 */
export type SideStartMessage = t.TypeOf<typeof sideStartMessageType>;

export const sideStartMessageSchema: KeySchema<SideStartMessage> = [
  ['side', deserializeSide, serializeSide],
  ['condition', deserializeString, serializeString],
];

export const deserializeSideStartMessage = createSchemaDeserializer(
  sideStartMessageType,
  sideStartMessageSchema,
);
export const serializeSideStartMessage = createSchemaSerializer(
  sideStartMessageType,
  sideStartMessageSchema,
);
