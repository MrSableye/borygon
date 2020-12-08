import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|`
export const emptyEventType = t.type({});
export type EmptyEvent = t.TypeOf<typeof emptyEventType>;
export const parseEmptyEvent: ArgsParser<EmptyEvent> = () => ({ value: [{}, {}] });
