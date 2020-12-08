import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';

// `|turn|NUMBER`
// > It is now turn `NUMBER`.
export const turnEventType = t.type({
  turn: t.number,
});
export type TurnEvent = t.TypeOf<typeof turnEventType>;
export const turnEventSchema: KeySchema<TurnEvent> = [
  ['turn', parseNumber],
];
export const parseTurnEvent = createSchemaParser(turnEventType, turnEventSchema);
