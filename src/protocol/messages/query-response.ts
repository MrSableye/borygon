import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeJson,
  serializeString,
} from '../parser';

export const queryResponseMessageType = t.type({
  responseType: t.string,
  response: t.unknown,
});

/* eslint-disable max-len */
/**
 * A message that is sent when in response to a query.
 *
 * Serialized example: `|queryresponse|userdetails|{"id":"zarel","userid":"zarel","name":"zarel","avatar":"supernerd-gen2","group":"~","autoconfirmed":true,"status":"Can't coding","rooms":{"#lobby":{}}}`
 *
 * Deserialized example:
 * ```json
 * {
 *   "responseType": "userdetails",
 *   "response": {
 *     "id": "zarel",
 *     "userid": "zarel",
 *     "name": "zarel",
 *     "avatar": "supernerd-gen2",
 *     "group": "~",
 *     "autoconfirmed": true,
 *     "status": "Can't coding",
 *     "rooms":{ "#lobby": {} }
 *   }
 * }
 * ```
 *
 * @member responseType The type of query response
 * @member response The JSON response
 */
export type QueryResponseMessage = t.TypeOf<typeof queryResponseMessageType>;
/* eslint-enable max-len */

export const queryResponseMessageSchema: KeySchema<QueryResponseMessage> = [
  ['responseType', deserializeString, serializeString],
  ['response', createJsonDeserializer(t.unknown), serializeJson],
];

export const deserializeQueryResponseMessage = createSchemaDeserializer(
  queryResponseMessageType,
  queryResponseMessageSchema,
  { concatenateLastArguments: true },
);
export const serializeQueryResponseMessage = createSchemaSerializer(
  queryResponseMessageType,
  queryResponseMessageSchema,
);
