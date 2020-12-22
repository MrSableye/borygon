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

// `|-setboost|POKEMON|STAT|AMOUNT`
// > Same as `-boost` and `-unboost`, but `STAT` is *set* to `AMOUNT` instead of
// > boosted *by* `AMOUNT`. (For example: Anger Point, Belly Drum)
export const setBoostEventType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});
export type SetBoostEvent = t.TypeOf<typeof setBoostEventType>;
export const setBoostEventSchema: KeySchema<SetBoostEvent> = [
  ['pokemon', parsePokemon],
  ['stat', parseStat],
  ['amount', parseNumber],
];
export const parseSetBoostEvent = createSchemaParser(setBoostEventType, setBoostEventSchema);
