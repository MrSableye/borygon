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

// `|-sideend|SIDE|CONDITION`
// > Indicates that the side condition `CONDITION` ended for the given `SIDE`.
// |-sideend|p2: Mr. Sableye|move: Aurora Veil
export const sideEndEventType = t.type({
  side: sideType,
  condition: t.string,
});
export type SideEndEvent = t.TypeOf<typeof sideEndEventType>;
export const sideEndEventSchema: KeySchema<SideEndEvent> = [
  ['side', parseSide],
  ['condition', parseString],
];
export const parseSideEndEvent = createSchemaParser(sideEndEventType, sideEndEventSchema);
