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

// `|-burst|POKEMON|SPECIES|ITEM`
// > The Pokémon `POKEMON` has used `ITEM` to Ultra Burst into `SPECIES`.
export const ultraBurstEventType = t.type({
  pokemon: pokemonType,
  species: t.string,
  item: t.string,
});
export type UltraBurstEvent = t.TypeOf<typeof ultraBurstEventType>;
export const ultraBurstEventSchema: KeySchema<UltraBurstEvent> = [
  ['pokemon', parsePokemon],
  ['species', parseString],
  ['item', parseString],
];
export const parseUltraBurstEvent = createSchemaParser(ultraBurstEventType, ultraBurstEventSchema);
