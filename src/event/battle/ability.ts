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

// `|-ability|POKEMON|ABILITY`
// > `POKEMON` has just switched-in, and its ability `ABILITY` is being announced
// > to have a long-term effect (will not use `[from]`).
// >
// > Effects that start at switch-in include Mold Breaker and Neutralizing Gas. It
// > does not include abilities that activate once and don't have any long-term
// > effects, like Intimidate (Intimidate should use `-activate`).
// `|-ability|POKEMON|ABILITY|[from]EFFECT`
// > The `ABILITY` of the `POKEMON` has been changed due to a move/ability `EFFECT`.
// >
// > Note that Skill Swap does not send this message despite it changing abilities,
// > because it does not reveal abilities when used between allies in a Double or
// > Triple Battle.
export const abilityEventType = t.type({
  pokemon: pokemonType,
  ability: t.string,
});
export type AbilityEvent = t.TypeOf<typeof abilityEventType>;
export const abilityEventSchema: KeySchema<AbilityEvent> = [
  ['pokemon', parsePokemon],
  ['ability', parseString],
];
export const parseAbilityEvent = createSchemaParser(abilityEventType, abilityEventSchema);
