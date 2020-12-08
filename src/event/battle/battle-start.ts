import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|start`
// > Indicates that the game has started.
//     |start
export const battleStartEventType = t.type({});
export type BattleStartEvent = t.TypeOf<typeof battleStartEventType>;
export const parseBattleStartEvent: ArgsParser<BattleStartEvent> = () => ({ value: [{}, {}] });
