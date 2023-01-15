import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const seedMessageType = t.type({
  seed: t.array(t.number),
});

/**
 * A message that is sent when a battle's seed is announced.
 *
 * Serialized example: `|seed|1,2,3,4`
 *
 * Deserialized example:
 * ```json
 * {
 *   "seed": [1, 2, 3, 4]
 * }
 * ```
 *
 * @member seed The seed
 */
export type SeedMessage = t.TypeOf<typeof seedMessageType>;

export const seedMessageSchema: KeySchema<SeedMessage> = [
  ['seed', createArrayDeserializer(deserializeNumber), createArraySerializer(serializeNumber)],
];

export const deserializeSeedMessage = createSchemaDeserializer(seedMessageType, seedMessageSchema);
export const serializeSeedMessage = createSchemaSerializer(seedMessageType, seedMessageSchema);
