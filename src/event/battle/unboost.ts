import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';
import {
  parsePokemon,

  parseStat,

  pokemonType,

  statType,
} from './types';

// `|-unboost|POKEMON|STAT|AMOUNT`
// > Same as `-boost`, but for negative stat changes instead.
export const unboostEventType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});
export type UnboostEvent = t.TypeOf<typeof unboostEventType>;
export const unboostEventSchema: KeySchema<UnboostEvent> = [
  ['pokemon', parsePokemon],
  ['stat', parseStat],
  ['amount', parseNumber],
];
export const parseUnboostEvent = createSchemaParser(unboostEventType, unboostEventSchema);
