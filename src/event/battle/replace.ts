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

// `|replace|POKEMON|DETAILS|HP STATUS`
// > Illusion has ended for the specified Pokémon. Syntax is the same as
// > `|switch|` above, but remember that everything you thought you knew about the
// > previous Pokémon is now wrong.
// >
// > `POKEMON` will be the NEW Pokémon ID - i.e. it will have the nickname of the
// > Zoroark (or other Illusion user).
export const replaceEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hp: hpType,
    status: statusType,
  }),
]);
export type ReplaceEvent = t.TypeOf<typeof replaceEventType>;
export const replaceEventSchema: KeySchema<ReplaceEvent> = [
  ['pokemon', parsePokemon],
  ['details', parsePokemonDetails],
  { partialParser: parseHpAndStatus },
];
export const parseReplaceEvent = createSchemaParser(replaceEventType, replaceEventSchema);
