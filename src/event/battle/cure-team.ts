import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-cureteam|POKEMON`
// > The Pokémon `POKEMON` has used a move that cures its team of status effects,
// > like Heal Bell.
export const cureTeamEventType = t.type({
  pokemon: pokemonType,
});
export type CureTeamEvent = t.TypeOf<typeof cureTeamEventType>;
export const cureTeamEventSchema: KeySchema<CureTeamEvent> = [
  ['pokemon', parsePokemon],
];
export const parseCureTeamEvent = createSchemaParser(cureTeamEventType, cureTeamEventSchema);
