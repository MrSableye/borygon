import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  hpType,

  parseHpAndStatus,

  parsePokemon,

  pokemonType,

  statusType,
} from './types';

// `|-heal|POKEMON|HP STATUS`
// > Same as `-damage`, but the Pokémon has healed damage instead.
export const healEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    hp: hpType,
  }),
  t.partial({
    status: statusType,
  }),
]);
export type HealEvent = t.TypeOf<typeof healEventType>;
export const healEventSchema: KeySchema<HealEvent> = [
  ['pokemon', parsePokemon],
  { partialParser: parseHpAndStatus },
];
export const parseHealEvent = createSchemaParser(healEventType, healEventSchema);
