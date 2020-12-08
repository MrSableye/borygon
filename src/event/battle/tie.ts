import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|tie`
// > The battle has ended in a tie.
export const tieEventType = t.type({});
export type TieEvent = t.TypeOf<typeof tieEventType>;
export const parseTieEvent: ArgsParser<TieEvent> = () => ({ value: [{}, {}] });
