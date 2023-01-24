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

export const splitMessageType = t.type({
  side: playerType,
});

/**
 * A message that is sent before a set of privileged messages.
 * This should NOT be seen by a normal client.
 *
 * Serialized example: `|split|p1`
 *
 * Deserialized example:
 * ```json
 * {
 *   "side": "p1"
 * }
 * ```
 *
 * @member side The side that should see the privileged information
 */
export type SplitMessageType = t.TypeOf<typeof splitMessageType>;

export const splitMessageSchema: KeySchema<SplitMessageType> = [
  ['side', deserializePlayer, serializePlayer],
];

export const deserializeSplitMessage = createSchemaDeserializer(
  splitMessageType,
  splitMessageSchema,
  { skipKeywordArguments: true },
);
export const serializeSplitMessage = createSchemaSerializer(
  splitMessageType,
  splitMessageSchema,
);
