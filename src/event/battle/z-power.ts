import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-zpower|POKEMON`
// > The Pokémon `POKEMON` has used the z-move version of its move.
export const zPowerEventType = t.type({
  pokemon: pokemonType,
});
export type ZPowerEvent = t.TypeOf<typeof zPowerEventType>;
export const zPowerEventSchema: KeySchema<ZPowerEvent> = [
  ['pokemon', parsePokemon],
];
export const parseZPowerEvent = createSchemaParser(zPowerEventType, zPowerEventSchema);
