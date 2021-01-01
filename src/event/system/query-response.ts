import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|queryresponse|RESPONSETYPE|RESPONSE
export const queryResponseEventType = t.type({
  responseType: t.string,
  response: t.string,
});
export type QueryResponseEvent = t.TypeOf<typeof queryResponseEventType>;
export const queryResponseEventSchema: KeySchema<QueryResponseEvent> = [
  ['responseType', parseString],
  ['response', parseString],
];
export const parseQueryResponseEvent = createSchemaParser(
  queryResponseEventType,
  queryResponseEventSchema,
  { concatenateLastArguments: true },
);
