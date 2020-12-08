import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// `|tier|FORMATNAME`
// > The name of the format being played.
//     |tier|[Gen 7] Doubles Ubers
export const tierEventType = t.type({
  format: t.string,
});
export type TierEvent = t.TypeOf<typeof tierEventType>;
export const tierEventSchema: KeySchema<TierEvent> = [
  ['format', parseString],
];
export const parseTierEvent = createSchemaParser(tierEventType, tierEventSchema);
