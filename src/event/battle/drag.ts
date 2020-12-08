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

// |drag|POKEMON|DETAILS|HP STATUS
export const dragEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    details: pokemonDetailsType,
  }),
  t.partial({
    hp: hpType,
    status: statusType,
  }),
]);
export type DragEvent = t.TypeOf<typeof dragEventType>;
export const dragEventSchema: KeySchema<DragEvent> = [
  ['pokemon', parsePokemon],
  ['details', parsePokemonDetails],
  { partialParser: parseHpAndStatus },
];
export const parseDragEvent = createSchemaParser(dragEventType, dragEventSchema);
