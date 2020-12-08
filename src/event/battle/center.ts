import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|-center`
// > Appears in Triple Battles when only one Pokémon remains on each side, to indicate
// > that the Pokémon have been automatically centered.
export const centerEventType = t.type({});
export type CenterEvent = t.TypeOf<typeof centerEventType>;
export const parseCenterEvent: ArgsParser<CenterEvent> = () => ({ value: [{}, {}] });
