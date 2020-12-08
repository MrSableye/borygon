import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// `|-fieldend|CONDITION`
// > Indicates that the field condition `CONDITION` has ended.
// |-fieldend|move: Grassy Terrain
export const fieldEndEventType = t.type({
  condition: t.string,
});
export type FieldEndEvent = t.TypeOf<typeof fieldEndEventType>;
export const fieldEndEventSchema: KeySchema<FieldEndEvent> = [
  ['condition', parseString],
];
export const parseFieldEndEvent = createSchemaParser(fieldEndEventType, fieldEndEventSchema);
