import * as t from 'io-ts';
import {
  createNullableDeserializer,
  createNullableSerializer,
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';
import {
  deserializePokemon,
  Pokemon,
  pokemonType,
  serializePokemon,
} from './types';

export const animationMessageType = t.intersection([
  t.type({
    source: pokemonType,
    move: t.string,
  }),
  t.partial({
    target: t.union([pokemonType, t.null]),
  }),
]);

/**
 * A message that is sent when an animation is manually triggered.
 *
 * Serialized example: `|-anim|p1a: Landorus-Therian|Scald|p2a: Toxapex`
 *
 * Deserialized example:
 * ```json
 * {
 *   "source": {
 *     "name": "Landorus-Therian",
 *     "player": "p1",
 *     "subPosition": "a"
 *   },
 *   "move": "Scald"
 *   "target": {
 *     "name": "Toxapex",
 *     "player": "p2",
 *     "subPosition": "a"
 *   },
 * }
 * ```
 *
 * @member source The Pokémon that is the source of the animation
 * @member move The move animation to use
 * @member target The Pokémon that is the target of the animation
 */
export type AnimationMessage = t.TypeOf<typeof animationMessageType>;

export const animationMessageSchema: KeySchema<AnimationMessage> = [
  ['source', deserializePokemon, serializePokemon],
  ['move', deserializeString, serializeString],
  [
    'target',
    createNullableDeserializer<Pokemon | undefined>(createOptionalDeserializer(deserializePokemon)),
    createNullableSerializer(createOptionalSerializer(serializePokemon)),
  ],
];

export const deserializeAnimationMessage = createSchemaDeserializer(
  animationMessageType,
  animationMessageSchema,
);
export const serializeAnimationMessage = createSchemaSerializer(
  animationMessageType,
  animationMessageSchema,
  { omitTrailingUndefinedParts: true },
);
