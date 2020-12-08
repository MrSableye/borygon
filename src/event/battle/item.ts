import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-item|POKEMON|ITEM|[from]EFFECT`
// > The `ITEM` held by the `POKEMON` has been changed or revealed due to a move or
// > ability `EFFECT`.
// `|-item|POKEMON|ITEM`
// > `POKEMON` has just switched in, and its item `ITEM` is being announced to have a
// > long-term effect (will not use `[from]`). Air Balloon is the only current user of
// > this.
export const itemEventType = t.type({
  pokemon: pokemonType,
  item: t.string,
});
export type ItemEvent = t.TypeOf<typeof itemEventType>;
export const itemEventSchema: KeySchema<ItemEvent> = [
  ['pokemon', parsePokemon],
  ['item', parseString],
];
export const parseItemEvent = createSchemaParser(itemEventType, itemEventSchema);
