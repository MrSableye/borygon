import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|title|title
export const titleEventType = t.type({
  title: t.string,
});
export type TitleEvent = t.TypeOf<typeof titleEventType>;
export const titleEventSchema: KeySchema<TitleEvent> = [
  ['title', parseString],
];
export const parseTitleEvent = createSchemaParser(
  titleEventType,
  titleEventSchema,
  { concatenateLastArguments: true },
);
