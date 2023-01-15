import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';
import {
  deserializePokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const hitCountMessageType = t.type({
  pokemon: pokemonType,
  numberOfHits: t.number,
});

/**
 * A message that indicates the number of times a multi-hit move hit
 *
 * Serialized example: `|-hitcount|p1a: Cloyster|5`
 *
 * Deserialized example:
 * ```json
 * {
 *   "pokemon": {
 *     "name": "Cloyster",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "numberOfHits": 5
 * }
 * ```
 *
 * @member pokemon The Pokémon that used a multi-hit move
 * @member numberOfHits The number of times the move hit
 */
export type HitCountMessage = t.TypeOf<typeof hitCountMessageType>;

export const hitCountMessageSchema: KeySchema<HitCountMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['numberOfHits', deserializeNumber, serializeNumber],
];

export const deserializeHitCountMessage = createSchemaDeserializer(
  hitCountMessageType,
  hitCountMessageSchema,
);
export const serializeHitCountMessage = createSchemaSerializer(
  hitCountMessageType,
  hitCountMessageSchema,
);
