import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|-nothing`
// > **DEPRECATED**: A move did absolutely nothing. (For example: Splash). In the
// > future this will be of the form `|-activate||move:Splash`.
export const nothingEventType = t.type({});
export type NothingEvent = t.TypeOf<typeof nothingEventType>;
export const parseNothingEvent: ArgsParser<NothingEvent> = () => ({ value: [{}, {}] });
