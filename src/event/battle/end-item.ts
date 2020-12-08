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

// `|-enditem|POKEMON|ITEM|[from]EFFECT`
// > The `ITEM` held by `POKEMON` has been destroyed by a move or ability (like
// > Knock Off), and it now holds no item.
// >
// > This will be silent `[silent]` if the item's ownership was changed (with a move
// > or ability like Thief or Trick), even if the move or ability would result in
// > a Pokémon without an item.
// `|-enditem|POKEMON|ITEM`
// > `POKEMON`'s `ITEM` has destroyed itself (consumed Berries, Air Balloon). If a
// > berry is consumed, it also has an additional modifier `|[eat]` to indicate
// > that it was consumed.
// >
// > Sticky Barb does not announce itself with this or any other message when it
// > changes hands.
export const endItemEventType = t.type({
  pokemon: pokemonType,
  item: t.string,
});
export type EndItemEvent = t.TypeOf<typeof endItemEventType>;
export const endItemEventSchema: KeySchema<EndItemEvent> = [
  ['pokemon', parsePokemon],
  ['item', parseString],
];
export const parseEndItemEvent = createSchemaParser(endItemEventType, endItemEventSchema);
