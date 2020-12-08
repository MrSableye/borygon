import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';

// `|-activate|EFFECT`
// > A miscellaneous effect has activated. This is triggered whenever an effect could
// > not be better described by one of the other minor messages: for example, healing
// > abilities like Water Absorb simply use `-heal`.
// >
// > Items usually activate with `-end`, although items with two messages, like Berries
// > ("POKEMON ate the Leppa Berry! POKEMON restored PP...!"), will send the "ate"
// > message as `-eat`, and the "restored" message as `-activate`.
export const activateEventType = t.type({
  effect: t.string,
});
export type ActivateEvent = t.TypeOf<typeof activateEventType>;
export const activateEventSchema: KeySchema<ActivateEvent> = [
  ['effect', parseString],
];
export const parseActivateEvent = createSchemaParser(activateEventType, activateEventSchema);
