import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
  parseNumber,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-hitcount|POKEMON|NUM`
// > A multi-hit move hit the `POKEMON` `NUM` times.
export const hitCountEventType = t.type({
  pokemon: pokemonType,
  numberOfHits: t.number,
});
export type HitCountEvent = t.TypeOf<typeof hitCountEventType>;
export const hitCountEventSchema: KeySchema<HitCountEvent> = [
  ['pokemon', parsePokemon],
  ['numberOfHits', parseNumber],
];
export const parseHitCountEvent = createSchemaParser(hitCountEventType, hitCountEventSchema);
