import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
  serializeJson,
} from '../parser';

const customGroupType = t.type({
  symbol: t.string,
  name: t.string,
  type: t.string,
});

export const customGroupsMessageType = t.type({
  groups: t.array(customGroupType),
});

/**
 * A message that is sent when custom groups are announced.
 *
 * Serialized example: `|customgroups|[{"symbol":"&","name":"Administrator","type":"leadership"}]`
 *
 * Deserialized example:
 * ```json
 * {
 *   "groups": [{
 *     "symbol": "&",
 *     "name": "Administrator",
 *     "type": "leadership"
 *   }]
 * }
 * ```
 *
 * @member groups The custom groups
 */
export type CustomGroupsMessage = t.TypeOf<typeof customGroupsMessageType>;

export const customGroupsMessageSchema: KeySchema<CustomGroupsMessage> = [
  ['groups', createJsonDeserializer(t.array(customGroupType)), serializeJson],
];

export const deserializeCustomGroupsMessage = createSchemaDeserializer(
  customGroupsMessageType,
  customGroupsMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeCustomGroupsMessage = createSchemaSerializer(
  customGroupsMessageType,
  customGroupsMessageSchema,
);
