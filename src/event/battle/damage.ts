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

// `|-damage|POKEMON|HP STATUS`
// > The specified Pokémon `POKEMON` has taken damage, and is now at
// > `HP STATUS` (see `|switch|` for details).
// >
// > If `HP` is 0, `STATUS` should be ignored. The current behavior is for
// > `STATUS` to be `fnt`, but this may change and should not be relied upon.
export const damageEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    hp: hpType,
  }),
  t.partial({
    status: statusType,
  }),
]);
export type DamageEvent = t.TypeOf<typeof damageEventType>;
export const damageEventSchema: KeySchema<DamageEvent> = [
  ['pokemon', parsePokemon],
  { partialParser: parseHpAndStatus },
];
export const parseDamageEvent = createSchemaParser(damageEventType, damageEventSchema);
