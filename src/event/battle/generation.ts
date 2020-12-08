import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';

// `|gen|GENNUM`
// > Generation number, from 1 to 7. Stadium counts as its respective gens;
// > Let's Go counts as 7, and modded formats count as whatever gen they were
// > based on.
//     |gen|7
export const generationEventType = t.type({
  generation: t.number,
});
export type GenerationEvent = t.TypeOf<typeof generationEventType>;
export const generationEventSchema: KeySchema<GenerationEvent> = [
  ['generation', parseNumber],
];
export const parseGenerationEvent = createSchemaParser(generationEventType, generationEventSchema);
