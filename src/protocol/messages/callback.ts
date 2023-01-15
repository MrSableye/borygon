import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSubcommandDeserializer,
  KeySchema,
  deserializeNumber,
  deserializeString,
  serializeString,
  serializeNumber,
  createSchemaSerializer,
  createSubcommandSerializer,
} from '../parser';
import {
  noArgsMessageType,
  deserializeNoArgsMessage,
  deserializeSinglePokemonMessage,
  singlePokemonMessageType,
  serializeSinglePokemonMessage,
  serializeNoArgsMessage,
} from './common';
import { deserializePokemon, pokemonType, serializePokemon } from './types';

// TODO: Document this file
const cantMessageType = t.type({
  pokemon: pokemonType,
  effect: t.string,
  moveId: t.string,
});

type CantMessage = t.TypeOf<typeof cantMessageType>;

const cantMessageSchema: KeySchema<CantMessage> = [
  ['pokemon', deserializePokemon, serializePokemon],
  ['effect', deserializeString, serializeString],
  ['moveId', deserializeString, serializeString],
];

const deserializeCantMessageType = createSchemaDeserializer(cantMessageType, cantMessageSchema);
const serializeCantMessageType = createSchemaSerializer(cantMessageType, cantMessageSchema);

const trappedMessageType = t.type({
  position: t.number,
});

type TrappedMessage = t.TypeOf<typeof trappedMessageType>;

const trappedMessageSchema: KeySchema<TrappedMessage> = [
  ['position', deserializeNumber, serializeNumber],
];

const deserializeTrappedMessage = createSchemaDeserializer(
  trappedMessageType,
  trappedMessageSchema,
);
const serializeTrappedMessage = createSchemaSerializer(
  trappedMessageType,
  trappedMessageSchema,
);

const callbackMessageType = t.type({
  event: t.union([
    t.tuple([t.literal('cant'), cantMessageType]),
    t.tuple([t.literal('cantmega'), singlePokemonMessageType]),
    t.tuple([t.literal('cantz'), singlePokemonMessageType]),
    t.tuple([t.literal('decision'), noArgsMessageType]),
    t.tuple([t.literal('trapped'), trappedMessageType]),
    t.tuple([t.literal('unhandled'), t.string]),
  ]),
});

export type CallbackMessage = t.TypeOf<typeof callbackMessageType>;

export const callbackMessageSchema: KeySchema<CallbackMessage> = [
  [
    'event',
    createSubcommandDeserializer({
      cant: deserializeCantMessageType,
      cantmega: deserializeSinglePokemonMessage,
      cantz: deserializeSinglePokemonMessage,
      decision: deserializeNoArgsMessage,
      trapped: deserializeTrappedMessage,
    }),
    createSubcommandSerializer({
      cant: serializeCantMessageType,
      cantmega: serializeSinglePokemonMessage,
      cantz: serializeSinglePokemonMessage,
      decision: serializeNoArgsMessage,
      trapped: serializeTrappedMessage,
    }),
  ],
];

export const deserializeCallbackMessage = createSchemaDeserializer(
  callbackMessageType,
  callbackMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeCallbackMessage = createSchemaSerializer(
  callbackMessageType,
  callbackMessageSchema,
);
