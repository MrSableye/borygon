import * as t from 'io-ts';
import {
  createOptionalParser,
  createSchemaParser,
  KeySchema,
  parseString,
} from '../parser';
import {
  parsePokemon,
  pokemonType,
} from './types';

// `|-block|POKEMON|EFFECT|MOVE|ATTACKER`
// > An effect targeted at `POKEMON` was blocked by `EFFECT`. This may optionally
// > specify that the effect was a `MOVE` from `ATTACKER`. `[of]SOURCE` will note
// > the owner of the `EFFECT`, in the case that it's not `EFFECT` (for instance,
// > an ally with Aroma Veil.)
export const blockEventType = t.intersection([
  t.type({
    pokemon: pokemonType,
    effect: t.string,
  }),
  t.partial({
    move: t.string,
    attacker: pokemonType,
  }),
]);
export type BlockEvent = t.TypeOf<typeof blockEventType>;
export const blockEventSchema: KeySchema<BlockEvent> = [
  ['pokemon', parsePokemon],
  ['effect', parseString],
  ['move', createOptionalParser(parseString)],
  ['attacker', createOptionalParser(parsePokemon)],
];
export const parseBlockEvent = createSchemaParser(blockEventType, blockEventSchema);
