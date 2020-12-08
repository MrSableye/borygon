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

// `|-boost|POKEMON|STAT|AMOUNT`
// > The specified Pokémon `POKEMON` has gained `AMOUNT` in `STAT`, using the
// > standard rules for Pokémon stat changes in-battle. `STAT` is a standard
// > three-letter abbreviation fot the stat in question, so Speed will be `spe`,
// > Special Defense will be `spd`, etc.
export const boostEventType = t.type({
  pokemon: pokemonType,
  stat: statType,
  amount: t.number,
});
export type BoostEvent = t.TypeOf<typeof boostEventType>;
export const boostEventSchema: KeySchema<BoostEvent> = [
  ['pokemon', parsePokemon],
  ['stat', parseStat],
  ['amount', parseNumber],
];
export const parseBoostEvent = createSchemaParser(boostEventType, boostEventSchema);
