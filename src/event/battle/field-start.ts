import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';

// `|-fieldstart|CONDITION`
// > The field condition `CONDITION` has started. Field conditions are all effects that
// > affect the entire field and aren't a weather. (For example: Trick Room, Grassy
// > Terrain)
// |-fieldstart|move: Grassy Terrain|[from] ability: Grassy Surge|[of] p2a: Rillaboom
// aliased to |-fieldactivate
export const fieldStartEventType = t.type({
  condition: t.string,
});
export type FieldStartEvent = t.TypeOf<typeof fieldStartEventType>;
export const fieldStartEventSchema: KeySchema<FieldStartEvent> = [
  ['condition', parseString],
];
export const parseFieldStartEvent = createSchemaParser(fieldStartEventType, fieldStartEventSchema);
