import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|-clearallboost`
// > Clears all boosts from all Pokémon on both sides. (For example: Haze).
export const clearAllBoostEventType = t.type({});
export type ClearAllBoostEvent = t.TypeOf<typeof clearAllBoostEventType>;
export const parseClearAllBoostEvent: ArgsParser<ClearAllBoostEvent> = () => ({ value: [{}, {}] });
