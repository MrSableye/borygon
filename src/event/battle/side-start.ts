import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import {
  parseSide,
  sideType,
} from './types';

// `|-sidestart|SIDE|CONDITION`
// > A side condition `CONDITION` has started on `SIDE`. Side conditions are all
// > effects that affect one side of the field. (For example: Tailwind, Stealth
// > Rock, Reflect)
// -sidestart|p2: Mr. Sableye|move: Tailwind
export const sideStartEventType = t.type({
  side: sideType,
  condition: t.string,
});
export type SideStartEvent = t.TypeOf<typeof sideStartEventType>;
export const sideStartEventSchema: KeySchema<SideStartEvent> = [
  ['side', parseSide],
  ['condition', parseString],
];
export const parseSideStartEvent = createSchemaParser(sideStartEventType, sideStartEventSchema);
