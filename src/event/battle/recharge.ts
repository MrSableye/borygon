import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-mustrecharge|POKEMON`
// > The Pokémon `POKEMON` must spend the turn recharging from a previous move.
export const rechargeEventType = t.type({
  pokemon: pokemonType,
});
export type RechargeEvent = t.TypeOf<typeof rechargeEventType>;
export const rechargeEventSchema: KeySchema<RechargeEvent> = [
  ['pokemon', parsePokemon],
];
export const parseRechargeEvent = createSchemaParser(rechargeEventType, rechargeEventSchema);
