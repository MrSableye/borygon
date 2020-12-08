import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,

  parseString,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-end|POKEMON|EFFECT`
// > The volatile status from `EFFECT` inflicted on the `POKEMON` Pokémon has
// > ended.
export const endEffectEventType = t.type({
  pokemon: pokemonType,
  effect: t.string,
});
export type EndEffectEvent = t.TypeOf<typeof endEffectEventType>;
export const endEffectEventSchema: KeySchema<EndEffectEvent> = [
  ['pokemon', parsePokemon],
  ['effect', parseString],
];
export const parseEndEffectEvent = createSchemaParser(endEffectEventType, endEffectEventSchema);
