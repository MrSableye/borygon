import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  hpType,
  parseHp,
  parsePokemon,
  pokemonType,
} from './types';

// `|-sethp|POKEMON|HP`
// > The specified Pokémon `POKEMON` now has `HP` hit points.
export const setHpEventType = t.type({
  pokemon: pokemonType,
  hp: hpType,
});
export type SetHpEvent = t.TypeOf<typeof setHpEventType>;
export const setHpEventSchema: KeySchema<SetHpEvent> = [
  ['pokemon', parsePokemon],
  ['hp', parseHp],
];
export const parseSetHpEvent = createSchemaParser(setHpEventType, setHpEventSchema);
