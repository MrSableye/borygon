import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|-ohko`
export const ohkoEventType = t.type({});
export type OhkoEvent = t.TypeOf<typeof ohkoEventType>;
export const parseOhkoEvent: ArgsParser<OhkoEvent> = () => ({ value: [{}, {}] });
