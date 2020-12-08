import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  hpType,

  parseHpAndStatus,

  parsePokemon,
  parsePokemonDetails,

  pokemonDetailsType,
  pokemonType,

  statusType,
} from './types';

// `|switch|POKEMON|DETAILS|HP STATUS` or
// > A Pokémon identified by `POKEMON` has switched in (if there was an old
// > Pokémon in that position, it is switched out).
// >
// > For the DETAILS format, see "Identifying Pokémon" above.
// >
// > `POKEMON|DETAILS` represents all the information that can be used to tell
// > Pokémon apart. If two pokemon have the same `POKEMON|DETAILS` (which will
// > never happen in any format with Species Clause), you usually won't be able
// > to tell if the same pokemon switched in or a different pokemon switched
// > in.
// >
// > The switched Pokémon has HP `HP`, and status `STATUS`. `HP` is specified as
// > a fraction; if it is your own Pokémon then it will be `CURRENT/MAX`, if not,
// > it will be `/100` if HP Percentage Mod is in effect and `/48` otherwise.
// > `STATUS` can be left blank, or it can be `slp`, `par`, etc.
// >
// > `switch` means it was intentional, while `drag` means it was unintentional
// > (forced by Whirlwind, Roar, etc).
export const switchEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hp: hpType,
    status: statusType,
  }),
]);
export type SwitchEvent = t.TypeOf<typeof switchEventType>;
export const switchEventSchema: KeySchema<SwitchEvent> = [
  ['pokemon', parsePokemon],
  ['details', parsePokemonDetails],
  { partialParser: parseHpAndStatus },
];
export const parseSwitchEvent = createSchemaParser(switchEventType, switchEventSchema);
