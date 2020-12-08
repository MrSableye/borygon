import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-supereffective|POKEMON`
// > A move was super effective against the `POKEMON`.
export const superEffectiveEventType = t.type({
  pokemon: pokemonType,
});
export type SuperEffectiveEvent = t.TypeOf<typeof superEffectiveEventType>;
export const superEffectiveEventSchema: KeySchema<SuperEffectiveEvent> = [
  ['pokemon', parsePokemon],
];
export const parseSuperEffectiveEvent = createSchemaParser(
  superEffectiveEventType,
  superEffectiveEventSchema,
);
