import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|upkeep`
// > Signals the upkeep phase of the turn where the number of turns left for field
// > conditions are updated.
export const upkeepEventType = t.type({});
export type UpkeepEvent = t.TypeOf<typeof upkeepEventType>;
export const parseUpkeepEvent: ArgsParser<UpkeepEvent> = () => ({ value: [{}, {}] });
