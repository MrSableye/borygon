import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
} from '../parser';
import { deserializePokemonSet, pokemonSetType, serializePokemonSet } from './types';

export const showTeamMessageType = t.type({
  team: t.array(pokemonSetType),
});

// TODO: Document this
export type ShowTeamMessage = t.TypeOf<typeof showTeamMessageType>;

export const showTeamMessageSchema: KeySchema<ShowTeamMessage> = [
  [
    'team',
    createArrayDeserializer(deserializePokemonSet, ']'),
    createArraySerializer(serializePokemonSet, ']'),
  ],
];

export const deserializeShowTeamMessage = createSchemaDeserializer(
  showTeamMessageType,
  showTeamMessageSchema,
);
export const serializeShowTeamMessage = createSchemaSerializer(
  showTeamMessageType,
  showTeamMessageSchema,
);
