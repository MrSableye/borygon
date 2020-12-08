import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|-combine
// > A move has been combined with another (For example: Fire Pledge).
export const combineEventType = t.type({});
export type CombineEvent = t.TypeOf<typeof combineEventType>;
export const parseCombineEvent: ArgsParser<CombineEvent> = () => ({ value: [{}, {}] });
