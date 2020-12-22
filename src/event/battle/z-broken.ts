import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-zbroken|POKEMON`
// > A z-move has broken through protect and hit the `POKEMON`.
export const zBrokenEventType = t.type({
  pokemon: pokemonType,
});
export type ZBrokenEvent = t.TypeOf<typeof zBrokenEventType>;
export const zBrokenEventSchema: KeySchema<ZBrokenEvent> = [
  ['pokemon', parsePokemon],
];
export const parseZBrokenEvent = createSchemaParser(zBrokenEventType, zBrokenEventSchema);
