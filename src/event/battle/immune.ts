import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-immune|POKEMON`
// > The `POKEMON` was immune to a move.
export const immuneEventType = t.type({
  pokemon: pokemonType,
});
export type ImmuneEvent = t.TypeOf<typeof immuneEventType>;
export const immuneEventSchema: KeySchema<ImmuneEvent> = [
  ['pokemon', parsePokemon],
];
export const parseImmuneEvent = createSchemaParser(immuneEventType, immuneEventSchema);
