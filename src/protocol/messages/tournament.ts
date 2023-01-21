import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
  createJsonDeserializer,
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  createSubcommandDeserializer,
  createSubcommandSerializer,
  deserializeNumber,
  Deserializer,
  deserializeString,
  KeySchema,
  serializeJson,
  serializeNumber,
  Serializer,
  serializeString,
} from '../parser';
import { noArgsMessageType, deserializeNoArgsMessage, serializeNoArgsMessage } from './common';
import { deserializeUser, serializeUser, userType } from './types';

// TODO: Document this whole file
// TODO: This file has lots of JSON with subtypes that could be parsed better (e.g.: users as Users)
const tournamentErrorType = t.keyof({
  AlreadyDisqualified: true,
  AlreadyStarted: true,
  AltUserAlreadyAdded: true,
  Banned: true,
  BracketFrozen: true,
  BracketNotFrozen: true,
  Full: true,
  InvalidAutoDisqualifyTimeout: true,
  InvalidAutoStartTimeout: true,
  InvalidMatch: true,
  NotEnoughUsers: true,
  NotStarted: true,
  UserAlreadyAdded: true,
  UserNotAdded: true,
  UserNotNamed: true,
});

type TournamentError = t.TypeOf<typeof tournamentErrorType>;

export const deserializeTournamentError: Deserializer<TournamentError> = (input: string) => {
  if ((tournamentErrorType.keys as any)[input]) {
    return { value: input as TournamentError };
  }

  return { errors: [`${input} is not a valid tournament error type`] };
};

export const serializeTournamentError: Serializer<TournamentError> = (input) => ({
  value: input,
});

const tournamentErrorMessageType = t.intersection([
  t.type({
    errorType: tournamentErrorType,
  }),
  t.partial({
    errorMessage: t.string,
  }),
]);

type TournamentErrorMessage = t.TypeOf<typeof tournamentErrorMessageType>;

const tournamentErrorMessageSchema: KeySchema<TournamentErrorMessage> = [
  ['errorType', deserializeTournamentError, serializeTournamentError],
  ['errorMessage', createOptionalDeserializer(deserializeString), createOptionalSerializer(serializeString)],
];

const deserializeTournamentErrorMessage = createSchemaDeserializer(tournamentErrorMessageType, tournamentErrorMessageSchema, { skipKeywordArguments: true });
const serializeTournamentErrorMessage = createSchemaSerializer(tournamentErrorMessageType, tournamentErrorMessageSchema);

const singleUserMessageType = t.type({
  user: userType,
});

type SingleUserMessage = t.TypeOf<typeof singleUserMessageType>;

const singleUserMessageSchema: KeySchema<SingleUserMessage> = [
  ['user', deserializeUser, serializeUser],
];

const deserializeSingleUserMessage = createSchemaDeserializer(singleUserMessageType, singleUserMessageSchema, { skipKeywordArguments: true });
const serializeSingleUserMessage = createSchemaSerializer(singleUserMessageType, singleUserMessageSchema);

const tournamentReplaceMessageType = t.type({
  newUser: userType,
  oldUser: userType,
});

type TournamentReplaceMessage = t.TypeOf<typeof tournamentReplaceMessageType>;

const tournamentReplaceMessageSchema: KeySchema<TournamentReplaceMessage> = [
  ['newUser', deserializeUser, serializeUser],
  ['oldUser', deserializeUser, serializeUser],
];

const deserializeTournamentReplaceMessage = createSchemaDeserializer(tournamentReplaceMessageType, tournamentReplaceMessageSchema, { skipKeywordArguments: true });
const serializeTournamentReplaceMessage = createSchemaSerializer(tournamentReplaceMessageType, tournamentReplaceMessageSchema);

const tournamentStartMessageType = t.type({
  total: t.number,
});

type TournamentStartMessage = t.TypeOf<typeof tournamentStartMessageType>;

const tournamentStartMessageSchema: KeySchema<TournamentStartMessage> = [
  ['total', deserializeNumber, serializeNumber],
];

const deserializeTournamentStartMessage = createSchemaDeserializer(tournamentStartMessageType, tournamentStartMessageSchema, { skipKeywordArguments: true });
const serializeTournamentStartMessage = createSchemaSerializer(tournamentStartMessageType, tournamentStartMessageSchema);

const onOffType = t.keyof({
  on: true,
  off: true,
});

type OnOff = t.TypeOf<typeof onOffType>;

export const deserializeOnOff: Deserializer<OnOff> = (input: string) => {
  if ((onOffType.keys as any)[input]) {
    return { value: input as OnOff };
  }

  return { errors: [`${input} is not a valid on-off type`] };
};

export const serializeOnOff: Serializer<OnOff> = (input) => ({
  value: input,
});

const tournamentAutoStartMessageType = t.intersection([
  t.type({
    onOff: onOffType,
  }),
  t.partial({
    timeout: t.number,
  }),
]);

type TournamentAutoStartMessage = t.TypeOf<typeof tournamentAutoStartMessageType>;

const tournamentAutoStartMessageSchema: KeySchema<TournamentAutoStartMessage> = [
  ['onOff', deserializeOnOff, serializeOnOff],
  ['timeout', createOptionalDeserializer(deserializeNumber), createOptionalSerializer(serializeNumber)],
];

const deserializeTournamentAutoStartMessage = createSchemaDeserializer(tournamentAutoStartMessageType, tournamentAutoStartMessageSchema, { skipKeywordArguments: true });
const serializeTournamentAutoStartMessage = createSchemaSerializer(tournamentAutoStartMessageType, tournamentAutoStartMessageSchema);

const allowDisallowType = t.keyof({
  allow: true,
  disallow: true,
});

type AllowDisallow = t.TypeOf<typeof allowDisallowType>;

export const deserializeAllowDisallow: Deserializer<AllowDisallow> = (input: string) => {
  if ((allowDisallowType.keys as any)[input]) {
    return { value: input as AllowDisallow };
  }

  return { errors: [`${input} is not a valid allow-disallow type`] };
};

export const serializeAllowDisallow: Serializer<AllowDisallow> = (input) => ({
  value: input,
});

const tournamentScoutingMessageType = t.type({
  allowDisallow: allowDisallowType,
});

type TournamentScoutingMessage = t.TypeOf<typeof tournamentScoutingMessageType>;

const tournamentScoutingMessageSchema: KeySchema<TournamentScoutingMessage> = [
  ['allowDisallow', deserializeAllowDisallow, serializeAllowDisallow],
];

const deserializeTournamentScoutingMessage = createSchemaDeserializer(tournamentScoutingMessageType, tournamentScoutingMessageSchema, { skipKeywordArguments: true });
const serializeTournamentScoutingMessage = createSchemaSerializer(tournamentScoutingMessageType, tournamentScoutingMessageSchema);

const onOffTargetType = t.keyof({
  on: true,
  off: true,
  target: true,
});

type OnOffTarget = t.TypeOf<typeof onOffTargetType>;

export const deserializeOnOffTarget: Deserializer<OnOffTarget> = (input: string) => {
  if ((onOffTargetType.keys as any)[input]) {
    return { value: input as OnOffTarget };
  }

  return { errors: [`${input} is not a valid on-off-target type`] };
};

export const serializeOnOffTarget: Serializer<OnOffTarget> = (input) => ({
  value: input,
});

const tournamentAutoDqMessageType = t.intersection([
  t.type({
    onOffTarget: onOffTargetType,
  }),
  t.partial({
    timeout: t.number,
  }),
]);

type TournamentAutoDqMessage = t.TypeOf<typeof tournamentAutoDqMessageType>;

const tournamentAutoDqMessageSchema: KeySchema<TournamentAutoDqMessage> = [
  ['onOffTarget', deserializeOnOffTarget, serializeOnOffTarget],
  ['timeout', createOptionalDeserializer(deserializeNumber), createOptionalSerializer(serializeNumber)],
];

const deserializeTournamentAutoDqMessage = createSchemaDeserializer(tournamentAutoDqMessageType, tournamentAutoDqMessageSchema, { skipKeywordArguments: true });
const serializeTournamentAutoDqMessage = createSchemaSerializer(tournamentAutoDqMessageType, tournamentAutoDqMessageSchema);

const tournamentBattleStartMessageType = t.type({
  user1: userType,
  user2: userType,
  roomId: t.string,
});

type TournamentBattleStartMessage = t.TypeOf<typeof tournamentBattleStartMessageType>;

const tournamentBattleStartMessageSchema: KeySchema<TournamentBattleStartMessage> = [
  ['user1', deserializeUser, serializeUser],
  ['user2', deserializeUser, serializeUser],
  ['roomId', deserializeString, serializeString],
];

const deserializeTournamentBattleStartMessage = createSchemaDeserializer(tournamentBattleStartMessageType, tournamentBattleStartMessageSchema, { skipKeywordArguments: true });
const serializeTournamentBattleStartMessage = createSchemaSerializer(tournamentBattleStartMessageType, tournamentBattleStartMessageSchema);

const resultType = t.keyof({
  win: true,
  loss: true,
  draw: true,
  '': true,
});

type Result = t.TypeOf<typeof resultType>;

export const deserializeResult: Deserializer<Result> = (input: string) => {
  if ((resultType.keys as any)[input]) {
    return { value: input as Result };
  }

  return { errors: [`${input} is not a valid result type`] };
};

export const serializeResult: Serializer<Result> = (input) => ({
  value: input,
});

const successFailType = t.keyof({
  success: true,
  fail: true,
});

type SuccessFail = t.TypeOf<typeof successFailType>;

export const deserializeSuccessFail: Deserializer<SuccessFail> = (input: string) => {
  if ((successFailType.keys as any)[input]) {
    return { value: input as SuccessFail };
  }

  return { errors: [`${input} is not a valid success-fail type`] };
};

export const serializeSuccessFail: Serializer<SuccessFail> = (input) => ({
  value: input,
});

const tournamentBattleEndMessageType = t.type({
  user1: userType,
  user2: userType,
  result: resultType,
  score: t.array(t.number),
  successFail: successFailType,
  roomId: t.string,
});

type TournamentBattleEndMessage = t.TypeOf<typeof tournamentBattleEndMessageType>;

const tournamentBattleEndMessageSchema: KeySchema<TournamentBattleEndMessage> = [
  ['user1', deserializeUser, serializeUser],
  ['user2', deserializeUser, serializeUser],
  ['result', deserializeResult, serializeResult],
  ['score', createArrayDeserializer(deserializeNumber), createArraySerializer(serializeNumber)], // TODO: This is a tuple
  ['successFail', deserializeSuccessFail, serializeSuccessFail],
  ['roomId', deserializeString, serializeString],
];

const deserializeTournamentBattleEndMessage = createSchemaDeserializer(tournamentBattleEndMessageType, tournamentBattleEndMessageSchema, { skipKeywordArguments: true });
const serializeTournamentBattleEndMessage = createSchemaSerializer(tournamentBattleEndMessageType, tournamentBattleEndMessageSchema);

const tournamentCreateMessageType = t.intersection([
  t.type({
    format: t.string,
    generator: t.string,
    cap: t.number,
  }),
  t.partial({
    name: t.string,
  }),
]);

type TournamentCreateMessage = t.TypeOf<typeof tournamentCreateMessageType>;

const tournamentCreateMessageSchema: KeySchema<TournamentCreateMessage> = [
  ['format', deserializeString, serializeString],
  ['generator', deserializeString, serializeString],
  ['cap', deserializeNumber, serializeNumber],
  ['name', createOptionalDeserializer(deserializeString, false), createOptionalSerializer(serializeString)],
];

const deserializeTournamentCreateMessage = createSchemaDeserializer(tournamentCreateMessageType, tournamentCreateMessageSchema, { skipKeywordArguments: true });
const serializeTournamentCreateMessage = createSchemaSerializer(tournamentCreateMessageType, tournamentCreateMessageSchema);

const tournamentStateType = t.keyof({
  available: true, finished: true, inprogress: true, challenging: true, unavailable: true, '': true,
});
type TournamentState = t.TypeOf<typeof tournamentStateType>;

interface TournamentBracketEliminationNode {
  team?: string;
  state?: TournamentState;
  score?: [number, number] | null;
  result?: Result;
  children?: TournamentBracketEliminationNode[];
  room?: string;
}

const tournamentBracketEliminationNodeType: t.Type<TournamentBracketEliminationNode> = t.recursion('TournamentBracketEliminationNode', () => t.partial({
  team: t.string,
  state: tournamentStateType,
  result: resultType,
  score: t.union([t.tuple([t.number, t.number]), t.null]),
  children: t.array(tournamentBracketEliminationNodeType),
  room: t.string,
}));

const tournamentBracketNodeType = t.intersection([
  t.type({
    type: t.literal('tree'),
  }),
  t.union([
    t.type({
      rootNode: t.union([tournamentBracketEliminationNodeType, t.null]),
    }),
    t.type({
      users: t.array(t.string),
    }),
  ]),
]);

const tournamentBracketTableCellType = t.intersection([
  t.type({
    state: tournamentStateType,
  }),
  t.partial({
    result: resultType,
    score: t.tuple([t.number, t.number]),
  }),
]);

const tournamentBracketTableType = t.type({
  type: t.literal('table'),
  tableHeaders: t.type({
    cols: t.array(t.string),
    rows: t.array(t.string),
  }),
  tableContents: t.array(t.array(t.union([tournamentBracketTableCellType, t.null]))),
  scores: t.array(t.number),
});

const tournamentBracketDataType = t.union([
  tournamentBracketTableType,
  tournamentBracketNodeType,
]);

const tournamentUpdateType = t.partial({
  bracketData: tournamentBracketDataType,
  challenged: t.union([t.string, t.null]),
  challenges: t.array(t.string),
  challengeBys: t.array(t.string),
  challenging: t.string,
  format: t.string,
  generator: t.string,
  isJoined: t.boolean,
  isStarted: t.boolean,
  playerCap: t.union([t.string, t.number]), // TODO: Parse this as number
  teambuilderFormat: t.string,
  title: t.string,
});

const tournamentUpdateMessageType = t.type({
  update: tournamentUpdateType,
});

type TournamentUpdateMessage = t.TypeOf<typeof tournamentUpdateMessageType>;

const tournamentUpdateMessageSchema: KeySchema<TournamentUpdateMessage> = [
  ['update', createJsonDeserializer(tournamentUpdateType), serializeJson],
];

const deserializeTournamentUpdateMessage = createSchemaDeserializer(tournamentUpdateMessageType, tournamentUpdateMessageSchema, { skipKeywordArguments: true });
const serializeTournamentUpdateMessage = createSchemaSerializer(tournamentUpdateMessageType, tournamentUpdateMessageSchema);

const tournamentEndUpdateType = t.type({
  results: t.array(t.array(t.string)),
  format: t.string,
  generator: t.string,
  bracketData: tournamentBracketDataType,
});

const tournamentEndMessageType = t.type({
  endUpdate: tournamentEndUpdateType,
});

type TournamentEndMessage = t.TypeOf<typeof tournamentEndMessageType>;

const tournamentEndMessageSchema: KeySchema<TournamentEndMessage> = [
  ['endUpdate', createJsonDeserializer(tournamentEndUpdateType), serializeJson],
];

const deserializeTournamentEndMessage = createSchemaDeserializer(tournamentEndMessageType, tournamentEndMessageSchema, { skipKeywordArguments: true });
const serializeTournamentEndMessage = createSchemaSerializer(tournamentEndMessageType, tournamentEndMessageSchema);

const tournamentInfoMessageType = t.type({
  updates: t.array(tournamentUpdateType),
});

type TournamentInfoMessage = t.TypeOf<typeof tournamentInfoMessageType>;

const tournamentInfoMessageSchema: KeySchema<TournamentInfoMessage> = [
  ['updates', createJsonDeserializer(t.array(tournamentUpdateType)), serializeJson],
];

const deserializeTournamentInfoMessage = createSchemaDeserializer(tournamentInfoMessageType, tournamentInfoMessageSchema, { skipKeywordArguments: true });
const serializeTournamentInfoMessage = createSchemaSerializer(tournamentInfoMessageType, tournamentInfoMessageSchema);

const tournamentMessageType = t.type({
  event: t.union([
    t.tuple([t.literal('autodq'), tournamentAutoDqMessageType]),
    t.tuple([t.literal('autostart'), tournamentAutoStartMessageType]),
    t.tuple([t.literal('battleend'), tournamentBattleEndMessageType]),
    t.tuple([t.literal('battlestart'), tournamentBattleStartMessageType]),
    t.tuple([t.literal('create'), tournamentCreateMessageType]),
    t.tuple([t.literal('unhandled'), t.string]),
    t.tuple([t.literal('disqualify'), singleUserMessageType]),
    t.tuple([t.literal('error'), tournamentErrorMessageType]),
    t.tuple([t.literal('forceend'), noArgsMessageType]),
    t.tuple([t.literal('info'), tournamentInfoMessageType]),
    t.tuple([t.literal('join'), singleUserMessageType]),
    t.tuple([t.literal('leave'), singleUserMessageType]),
    t.tuple([t.literal('replace'), tournamentReplaceMessageType]),
    t.tuple([t.literal('scouting'), tournamentScoutingMessageType]),
    t.tuple([t.literal('start'), tournamentStartMessageType]),
    t.tuple([t.literal('update'), tournamentUpdateMessageType]),
    t.tuple([t.literal('end'), tournamentEndMessageType]),
    t.tuple([t.literal('updateEnd'), noArgsMessageType]),
  ]),
});

export type TournamentMessage = t.TypeOf<typeof tournamentMessageType>;

export const tournamentMessageSchema: KeySchema<TournamentMessage> = [
  [
    'event',
    createSubcommandDeserializer({
      autodq: deserializeTournamentAutoDqMessage,
      autostart: deserializeTournamentAutoStartMessage,
      battleend: deserializeTournamentBattleEndMessage,
      battlestart: deserializeTournamentBattleStartMessage,
      create: deserializeTournamentCreateMessage,
      disqualify: deserializeSingleUserMessage,
      error: deserializeTournamentErrorMessage,
      forceend: deserializeNoArgsMessage,
      info: deserializeTournamentInfoMessage,
      join: deserializeSingleUserMessage,
      leave: deserializeSingleUserMessage,
      replace: deserializeTournamentReplaceMessage,
      scouting: deserializeTournamentScoutingMessage,
      start: deserializeTournamentStartMessage,
      update: deserializeTournamentUpdateMessage,
      end: deserializeTournamentEndMessage,
      updateEnd: deserializeNoArgsMessage,
    }),
    createSubcommandSerializer({
      autodq: serializeTournamentAutoDqMessage,
      autostart: serializeTournamentAutoStartMessage,
      battleend: serializeTournamentBattleEndMessage,
      battlestart: serializeTournamentBattleStartMessage,
      create: serializeTournamentCreateMessage,
      disqualify: serializeSingleUserMessage,
      error: serializeTournamentErrorMessage,
      forceend: serializeNoArgsMessage,
      info: serializeTournamentInfoMessage,
      join: serializeSingleUserMessage,
      leave: serializeSingleUserMessage,
      replace: serializeTournamentReplaceMessage,
      scouting: serializeTournamentScoutingMessage,
      start: serializeTournamentStartMessage,
      update: serializeTournamentUpdateMessage,
      end: serializeTournamentEndMessage,
      updateEnd: serializeNoArgsMessage,
    }),
  ],
];

export const deserializeTournamentMessage = createSchemaDeserializer(
  tournamentMessageType,
  tournamentMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeTournamentMessage = createSchemaSerializer(
  tournamentMessageType,
  tournamentMessageSchema,
);
