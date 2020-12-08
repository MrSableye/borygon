import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-endability|POKEMON`
// > The `POKEMON` has had its ability suppressed by Gastro Acid.
export const endAbilityEventType = t.type({
  pokemon: pokemonType,
});
export type EndAbilityEvent = t.TypeOf<typeof endAbilityEventType>;
export const endAbilityEventSchema: KeySchema<EndAbilityEvent> = [
  ['pokemon', parsePokemon],
];
export const parseEndAbilityEvent = createSchemaParser(endAbilityEventType, endAbilityEventSchema);
