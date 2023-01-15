import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import {
  deserializePlayer,
  playerType,
  serializePlayer,
} from './types';

export const canDynamaxMessageType = t.type({
  side: playerType,
});

/**
 * A message that is sent when a side is able to Dynamax.
 *
 * Serialized example: `|-candynamax|p1`
 *
 * Deserialized example:
 * ```json
 * {
 *   "side": "p1"
 * }
 * ```
 *
 * @member side The side that can Dynamax
 */
export type CanDynamaxMessage = t.TypeOf<typeof canDynamaxMessageType>;

export const canDynamaxMessageSchema: KeySchema<CanDynamaxMessage> = [
  ['side', deserializePlayer, serializePlayer],
];

export const deserializeCanDynamaxMessage = createSchemaDeserializer(
  canDynamaxMessageType,
  canDynamaxMessageSchema,
  { skipKeywordArguments: true },
);
export const serializeCanDynamaxMessage = createSchemaSerializer(
  canDynamaxMessageType,
  canDynamaxMessageSchema,
);
