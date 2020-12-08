import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parsePokemon,

  pokemonType,
} from './types';

// `|-notarget|POKEMON`
// > A move has failed due to their being no target Pokémon `POKEMON`. `POKEMON` is
// > not present in Generation 1. This action is specific to Generations 1-4 as in
// > later Generations a failed move will display using `-fail`.
export const noTargetEventType = t.type({
  pokemon: pokemonType,
});
export type NoTargetEvent = t.TypeOf<typeof noTargetEventType>;
export const noTargetEventSchema: KeySchema<NoTargetEvent> = [
  ['pokemon', parsePokemon],
];
export const parseNoTargetEvent = createSchemaParser(noTargetEventType, noTargetEventSchema);
