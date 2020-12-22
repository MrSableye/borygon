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

// `|-start|POKEMON|EFFECT`
// > A [*volatile* status](https://bulbapedia.bulbagarden.net/wiki/Status_condition#Volatile_status)
// > has been inflicted on the `POKEMON` Pokémon by `EFFECT`. (For example:
// > confusion, Taunt, Substitute).
export const startEffectEventType = t.type({
  pokemon: pokemonType,
  effect: t.string,
});
export type StartEffectEvent = t.TypeOf<typeof startEffectEventType>;
export const startEffectEventSchema: KeySchema<StartEffectEvent> = [
  ['pokemon', parsePokemon],
  ['effect', parseString],
];
export const parseStartEffectEvent = createSchemaParser(
  startEffectEventType,
  startEffectEventSchema,
);
