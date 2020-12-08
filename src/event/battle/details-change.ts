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

// `|detailschange|POKEMON|DETAILS|HP STATUS` or
// > The specified Pokémon has changed formes (via Mega Evolution, ability, etc.)
// > to `SPECIES`. If the forme change is permanent (Mega Evolution or a
// > Shaymin-Sky that is frozen), then `detailschange` will appear; otherwise,
// > the client will send `-formechange`.
// >
// > Syntax is the same as `|switch|` above.
export const detailsChangeEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hp: hpType,
    status: statusType,
  }),
]);
export type DetailsChangeEvent = t.TypeOf<typeof detailsChangeEventType>;
export const detailsChangeEventSchema: KeySchema<DetailsChangeEvent> = [
  ['pokemon', parsePokemon],
  ['details', parsePokemonDetails],
  { partialParser: parseHpAndStatus },
];
export const parseDetailsChangeEvent = createSchemaParser(
  detailsChangeEventType,
  detailsChangeEventSchema,
);
