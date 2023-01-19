import {
  CommonMessageMessage, deserializeCommonMessageMessage, serializeCommonMessageMessage,
  NoArgsMessage, deserializeNoArgsMessage, serializeNoArgsMessage,
  SinglePokemonMessageType, deserializeSinglePokemonMessage, serializeSinglePokemonMessage,
} from './messages/common';
import { AbilityMessage, deserializeAbilityMessage, serializeAbilityMessage } from './messages/ability';
import { ActivateMessage, deserializeActivateMessage, serializeActivateMessage } from './messages/activate';
import { AnimationMessage, deserializeAnimationMessage, serializeAnimationMessage } from './messages/animation';
import { BattleMessage, deserializeBattleMessage, serializeBattleMessage } from './messages/battle';
import { BlockMessage, deserializeBlockMessage, serializeBlockMessage } from './messages/block';
import { BoostMessage, deserializeBoostMessage, serializeBoostMessage } from './messages/boost';
import { CallbackMessage, deserializeCallbackMessage, serializeCallbackMessage } from './messages/callback';
import { CanDynamaxMessage, deserializeCanDynamaxMessage, serializeCanDynamaxMessage } from './messages/can-dynamax';
import { CantMessage, deserializeCantMessage, serializeCantMessage } from './messages/cant';
import { ChallengeMessage, deserializeChallengeMessage, serializeChallengeMessage } from './messages/challenge';
import { ChatMessage, deserializeChatMessage, serializeChatMessage } from './messages/chat';
import { ChoiceMessage, deserializeChoiceMessage, serializeChoiceMessage } from './messages/choice';
import { ClearPositiveBoostMessage, deserializeClearPositiveBoostMessage, serializeClearPositiveBoostMessage } from './messages/clear-positive-boost';
import { CopyBoostMessage, deserializeCopyBoostMessage, serializeCopyBoostMessage } from './messages/copy-boost';
import { CureStatusMessage, deserializeCureStatusMessage, serializeCureStatusMessage } from './messages/cure-status';
import { CustomGroupsMessage, deserializeCustomGroupsMessage, serializeCustomGroupsMessage } from './messages/custom-groups';
import { DamageMessage, deserializeDamageMessage, serializeDamageMessage } from './messages/damage';
import { DetailsChangeMessage, deserializeDetailsChangeMessage, serializeDetailsChangeMessage } from './messages/details-change';
import { DragMessage, deserializeDragMessage, serializeDragMessage } from './messages/drag';
import { EmptyMessage, deserializeEmptyMessage, serializeEmptyMessage } from './messages/empty';
import { EndAbilityMessage, deserializeEndAbilityMessage, serializeEndAbilityMessage } from './messages/end-ability';
import { EndEffectMessage, deserializeEndEffectMessage, serializeEndEffectMessage } from './messages/end-effect';
import { EndItemMessage, deserializeEndItemMessage, serializeEndItemMessage } from './messages/end-item';
import { EndTeamPreviewMessage, deserializeEndTeamPreviewMessage, serializeEndTeamPreviewMessage } from './messages/end-team-preview';
import { ErrorInitializingRoomMessage, deserializeErrorInitializingRoomMessage, serializeErrorInitializingRoomMessage } from './messages/error-initializing-room';
import { FailMessage, deserializeFailMessage, serializeFailMessage } from './messages/fail';
import { FieldEndMessage, deserializeFieldEndMessage, serializeFieldEndMessage } from './messages/field-end';
import { FieldStartMessage, deserializeFieldStartMessage, serializeFieldStartMessage } from './messages/field-start';
import { FormatsMessage, deserializeFormatsMessage, serializeFormatsMessage } from './messages/formats';
import { FormeChangeMessage, deserializeFormeChangeMessage, serializeFormeChangeMessage } from './messages/forme-change';
import { GameTypeMessage, deserializeGameTypeMessage, serializeGameTypeMessage } from './messages/game-type';
import { GenerationMessage, deserializeGenerationMessage, serializeGenerationMessage } from './messages/generation';
import { HealMessage, deserializeHealMessage, serializeHealMessage } from './messages/heal';
import { HideLinesMessage, deserializeHideLinesMessage, serializeHideLinesMessage } from './messages/hide-lines';
import { HitCountMessage, deserializeHitCountMessage, serializeHitCountMessage } from './messages/hit-count';
import { InitializeRoomMessage, deserializeInitializeRoomMessage, serializeInitializeRoomMessage } from './messages/initialize-room';
import { ImmuneMessage, deserializeImmuneMessage, serializeImmuneMessage } from './messages/immune';
import { ItemMessage, deserializeItemMessage, serializeItemMessage } from './messages/item';
import { JoinMessage, deserializeJoinMessage, serializeJoinMessage } from './messages/join';
import { LeaveMessage, deserializeLeaveMessage, serializeLeaveMessage } from './messages/leave';
import { MegaEvolutionMessage, deserializeMegaEvolutionMessage, serializeMegaEvolutionMessage } from './messages/mega-evolution';
import { MissMessage, deserializeMissMessage, serializeMissMessage } from './messages/miss';
import { MoveMessage, deserializeMoveMessage, serializeMoveMessage } from './messages/move';
import { NameChangeMessage, deserializeNameChangeMessage, serializeNameChangeMessage } from './messages/name-change';
import { NameTakenMessage, deserializeNameTakenMessage, serializeNameTakenMessage } from './messages/name-taken';
import { NoTargetMessage, deserializeNoTargetMessage, serializeNoTargetMessage } from './messages/no-target';
import { NotificationMessage, deserializeNotificationMessage, serializeNotificationMessage } from './messages/notification';
import { PlayerMessage, deserializePlayerMessage, serializePlayerMessage } from './messages/player';
import { PmMessage, deserializePmMessage, serializePmMessage } from './messages/pm';
import { PrepareMoveMessage, deserializePrepareMoveMessage, serializePrepareMoveMessage } from './messages/prepare-move';
import { QueryResponseMessage, deserializeQueryResponseMessage, serializeQueryResponseMessage } from './messages/query-response';
import { RatedMessage, deserializeRatedMessage, serializeRatedMessage } from './messages/rated';
import { ReplaceMessage, deserializeReplaceMessage, serializeReplaceMessage } from './messages/replace';
import { RequestMessage, deserializeRequestMessage, serializeRequestMessage } from './messages/request';
import { RequestRegistrationMessage, deserializeRequestRegistrationMessage, serializeRequestRegistrationMessage } from './messages/request-registration';
import { RoomErrorMessage, deserializeRoomErrorMessage, serializeRoomErrorMessage } from './messages/room-error';
import { RuleMessage, deserializeRuleMessage, serializeRuleMessage } from './messages/rule';
import { SeedMessage, deserializeSeedMessage, serializeSeedMessage } from './messages/seed';
import { SetBoostMessage, deserializeSetBoostMessage, serializeSetBoostMessage } from './messages/set-boost';
import { SetHpMessage, deserializeSetHpMessage, serializeSetHpMessage } from './messages/set-hp';
import { SideEndMessage, deserializeSideEndMessage, serializeSideEndMessage } from './messages/side-end';
import { SideStartMessage, deserializeSideStartMessage, serializeSideStartMessage } from './messages/side-start';
import { SingleMoveMessage, deserializeSingleMoveMessage, serializeSingleMoveMessage } from './messages/single-move';
import { SingleTurnMoveMessage, deserializeSingleTurnMoveMessage, serializeSingleTurnMoveMessage } from './messages/single-turn';
import { StartEffectMessage, deserializeStartEffectMessage, serializeStartEffectMessage } from './messages/start-effect';
import { StatusMessage, deserializeStatusMessage, serializeStatusMessage } from './messages/status';
import { SwapBoostMessage, deserializeSwapBoostMessage, serializeSwapBoostMessage } from './messages/swap-boost';
import { SwapMessage, deserializeSwapMessage, serializeSwapMessage } from './messages/swap';
import { SwitchMessage, deserializeSwitchMessage, serializeSwitchMessage } from './messages/switch';
import { TeamPreviewMessage, deserializeTeamPreviewMessage, serializeTeamPreviewMessage } from './messages/team-preview';
import { TeamSizeMessage, deserializeTeamSizeMessage, serializeTeamSizeMessage } from './messages/team-size';
import { TemporaryNotificationMessage, deserializeTemporaryNotificationMessage, serializeTemporaryNotificationMessage } from './messages/temporary-notification';
import { TemporaryNotificationOffMessage, deserializeTemporaryNotificationOffMessage, serializeTemporaryNotificationOffMessage } from './messages/temporary-notification-off';
import { TerastallizeMessage, deserializeTerastallizeMessage, serializeTerastallizeMessage } from './messages/terastallize';
import { TierMessage, deserializeTierMessage, serializeTierMessage } from './messages/tier';
import { TimestampChatDeltaMessage, deserializeTimestampChatDeltaMessage, serializeTimestampChatDeltaMessage } from './messages/timestamp-chat-delta';
import { TimestampChatMessage, deserializeTimestampChatMessage, serializeTimestampChatMessage } from './messages/timestamp-chat';
import { TimestampMessage, deserializeTimestampMessage, serializeTimestampMessage } from './messages/timestamp';
import { TitleMessage, deserializeTitleMessage, serializeTitleMessage } from './messages/title';
import { TournamentMessage, deserializeTournamentMessage, serializeTournamentMessage } from './messages/tournament';
import { TransformMessage, deserializeTransformMessage, serializeTransformMessage } from './messages/transform';
import { TurnMessage, deserializeTurnMessage, serializeTurnMessage } from './messages/turn';
import { UltraBurstMessage, deserializeUltraBurstMessage, serializeUltraBurstMessage } from './messages/ultra-burst';
import { UnboostMessage, deserializeUnboostMessage, serializeUnboostMessage } from './messages/unboost';
import { UnlinkMessage, deserializeUnlinkMessage, serializeUnlinkMessage } from './messages/unlink';
import { UpdateChallengesMessage, deserializeUpdateChallengesMessage, serializeUpdateChallengesMessage } from './messages/update-challenges';
import { UpdateHtmlMessage, deserializeUpdateHtmlMessage, serializeUpdateHtmlMessage } from './messages/update-html';
import { UpdatePokemonMessage, deserializeUpdatePokemonMessage, serializeUpdatePokemonMessage } from './messages/update-pokemon';
import { UpdateSearchMessage, deserializeUpdateSearchMessage, serializeUpdateSearchMessage } from './messages/update-search';
import { UpdateUserMessage, deserializeUpdateUserMessage, serializeUpdateUserMessage } from './messages/update-user';
import { UserCountMessage, deserializeUserCountMessage, serializeUserCountMessage } from './messages/user-count';
import { UsersMessage, deserializeUsersMessage, serializeUsersMessage } from './messages/users';
import { WaitingMessage, deserializeWaitingMessage, serializeWaitingMessage } from './messages/waiting';
import { WeatherMessage, deserializeWeatherMessage, serializeWeatherMessage } from './messages/weather';
import { WinMessage, deserializeWinMessage, serializeWinMessage } from './messages/win';
import { ArgsDeserializer, ArgsSerializer, KeywordArguments } from './parser';

export interface PokemonShowdownMessages {
  ability: AbilityMessage;
  activate: ActivateMessage;
  animation: AnimationMessage;
  battle: BattleMessage;
  battleStart: NoArgsMessage;
  bigError: CommonMessageMessage;
  block: BlockMessage;
  boost: BoostMessage;
  callback: CallbackMessage;
  canDynamax: CanDynamaxMessage;
  cant: CantMessage;
  center: NoArgsMessage;
  challenge: ChallengeMessage;
  chat: ChatMessage;
  chatMessage: CommonMessageMessage;
  chatMessageRaw: CommonMessageMessage;
  choice: ChoiceMessage;
  clearAllBoost: NoArgsMessage;
  clearBoost: SinglePokemonMessageType;
  clearNegativeBoost: SinglePokemonMessageType;
  clearPositiveBoost: ClearPositiveBoostMessage;
  combine: NoArgsMessage;
  controlsHtml: CommonMessageMessage;
  copyBoost: CopyBoostMessage;
  crit: SinglePokemonMessageType;
  cureStatus: CureStatusMessage;
  cureTeam: SinglePokemonMessageType;
  customGroups: CustomGroupsMessage;
  damage: DamageMessage;
  debug: CommonMessageMessage;
  default: string[];
  deinitializeRoom: NoArgsMessage;
  detailsChange: DetailsChangeMessage;
  disconnect: CommonMessageMessage;
  drag: DragMessage;
  empty: EmptyMessage;
  endAbility: EndAbilityMessage;
  endEffect: EndEffectMessage;
  endItem: EndItemMessage;
  endTeamPreview: EndTeamPreviewMessage;
  error: CommonMessageMessage;
  errorInitializingRoom: ErrorInitializingRoomMessage;
  expire: CommonMessageMessage;
  fail: FailMessage;
  faint: SinglePokemonMessageType;
  fieldEnd: FieldEndMessage;
  fieldHtml: CommonMessageMessage;
  fieldStart: FieldStartMessage;
  formats: FormatsMessage;
  formeChange: FormeChangeMessage;
  gameType: GameTypeMessage;
  generation: GenerationMessage;
  heal: HealMessage;
  hideLines: HideLinesMessage;
  hint: CommonMessageMessage;
  hitCount: HitCountMessage;
  html: CommonMessageMessage;
  immune: ImmuneMessage;
  inactive: CommonMessageMessage;
  inactiveOff: CommonMessageMessage;
  initializationDone: NoArgsMessage;
  initializeRoom: InitializeRoomMessage;
  invertBoost: SinglePokemonMessageType;
  item: ItemMessage;
  join: JoinMessage;
  leave: LeaveMessage;
  megaEvolution: MegaEvolutionMessage;
  miscellaneousMessage: CommonMessageMessage;
  miss: MissMessage;
  move: MoveMessage;
  nameChange: NameChangeMessage;
  nameTaken: NameTakenMessage;
  noTarget: NoTargetMessage;
  nothing: NoArgsMessage;
  notification: NotificationMessage;
  ohko: NoArgsMessage;
  player: PlayerMessage;
  pm: PmMessage;
  popup: CommonMessageMessage;
  prepareMove: PrepareMoveMessage;
  primalReversion: SinglePokemonMessageType;
  queryResponse: QueryResponseMessage;
  rated: RatedMessage;
  raw: CommonMessageMessage;
  recharge: SinglePokemonMessageType;
  refresh: NoArgsMessage;
  replace: ReplaceMessage;
  request: RequestMessage;
  requestRegistration: RequestRegistrationMessage;
  resisted: SinglePokemonMessageType;
  roomError: RoomErrorMessage;
  rule: RuleMessage;
  seed: SeedMessage;
  setBoost: SetBoostMessage;
  setHp: SetHpMessage;
  sideEnd: SideEndMessage;
  sideStart: SideStartMessage;
  silentJoin: JoinMessage;
  silentLeave: LeaveMessage;
  silentNameChange: NameChangeMessage;
  singleMove: SingleMoveMessage;
  singleTurnMove: SingleTurnMoveMessage;
  startEffect: StartEffectMessage;
  startTeamPreview: NoArgsMessage;
  status: StatusMessage;
  superEffective: SinglePokemonMessageType;
  swap: SwapMessage;
  swapBoost: SwapBoostMessage;
  swapSideConditions: NoArgsMessage;
  switch: SwitchMessage;
  teamPreview: TeamPreviewMessage;
  teamSize: TeamSizeMessage;
  temporaryNotification: TemporaryNotificationMessage;
  temporaryNotificationOff: TemporaryNotificationOffMessage;
  terastallize: TerastallizeMessage;
  tie: NoArgsMessage;
  tier: TierMessage;
  timestamp: TimestampMessage;
  timestampChat: TimestampChatMessage;
  timestampChatDelta: TimestampChatDeltaMessage;
  title: TitleMessage;
  tournament: TournamentMessage;
  transform: TransformMessage;
  turn: TurnMessage;
  ultraBurst: UltraBurstMessage;
  unboost: UnboostMessage;
  unhandled: string[];
  unlink: UnlinkMessage;
  updateChallenges: UpdateChallengesMessage;
  updateHtml: UpdateHtmlMessage;
  updatePokemon: UpdatePokemonMessage;
  updateSearch: UpdateSearchMessage;
  updateUser: UpdateUserMessage;
  upkeep: NoArgsMessage;
  userCount: UserCountMessage;
  users: UsersMessage;
  variation: CommonMessageMessage;
  waiting: WaitingMessage;
  warning: CommonMessageMessage;
  weather: WeatherMessage;
  win: WinMessage;
  zBroken: SinglePokemonMessageType;
  zPower: SinglePokemonMessageType;
}

export interface RawPokemonShowdownMessages {
  '-ability': AbilityMessage;
  '-activate': ActivateMessage;
  '-anim': AnimationMessage;
  '-block': BlockMessage;
  '-boost': BoostMessage;
  '-burst': UltraBurstMessage;
  '-candynamax': CanDynamaxMessage;
  '-center': NoArgsMessage;
  '-clearallboost': NoArgsMessage;
  '-clearboost': SinglePokemonMessageType;
  '-clearnegativeboost': SinglePokemonMessageType;
  '-clearpositiveboost': ClearPositiveBoostMessage;
  '-combine': NoArgsMessage;
  '-copyboost': CopyBoostMessage;
  '-crit': SinglePokemonMessageType;
  '-curestatus': CureStatusMessage;
  '-cureteam': SinglePokemonMessageType;
  '-damage': DamageMessage;
  '-end': EndEffectMessage;
  '-endability': EndAbilityMessage;
  '-enditem': EndItemMessage;
  '-fail': FailMessage;
  '-fieldactivate': FieldStartMessage;
  '-fieldend': FieldEndMessage;
  '-fieldstart': FieldStartMessage;
  '-formechange': FormeChangeMessage;
  '-heal': HealMessage;
  '-hint': CommonMessageMessage;
  '-hitcount': HitCountMessage;
  '-immune': ImmuneMessage;
  '-invertboost': SinglePokemonMessageType;
  '-item': ItemMessage;
  '-mega': MegaEvolutionMessage;
  '-message': CommonMessageMessage;
  '-miss': MissMessage;
  '-mustrecharge': SinglePokemonMessageType;
  '-notarget': NoTargetMessage;
  '-nothing': NoArgsMessage;
  '-ohko': NoArgsMessage;
  '-prepare': PrepareMoveMessage;
  '-primal': SinglePokemonMessageType;
  '-resisted': SinglePokemonMessageType;
  '-setboost': SetBoostMessage;
  '-sethp': SetHpMessage;
  '-sideend': SideEndMessage;
  '-sidestart': SideStartMessage;
  '-singlemove': SingleMoveMessage;
  '-singleturn': SingleTurnMoveMessage;
  '-start': StartEffectMessage;
  '-status': StatusMessage;
  '-supereffective': SinglePokemonMessageType;
  '-swapboost': SwapBoostMessage;
  '-swapsideconditions': NoArgsMessage;
  '-terastallize': TerastallizeMessage;
  '-transform': TransformMessage;
  '-unboost': UnboostMessage;
  '-waiting': WaitingMessage;
  '-weather': WeatherMessage;
  '-zbroken': SinglePokemonMessageType;
  '-zpower': SinglePokemonMessageType;
  ':': TimestampMessage;
  '': EmptyMessage;
  'c:': TimestampChatMessage;
  'chatmsg-raw': CommonMessageMessage;
  't:': TimestampMessage;
  askreg: RequestRegistrationMessage;
  b: BattleMessage;
  B: BattleMessage;
  battle: BattleMessage;
  bigerror: CommonMessageMessage;
  c: ChatMessage;
  callback: CallbackMessage;
  cant: CantMessage;
  challstr: ChallengeMessage;
  chat: ChatMessage;
  chatmsg: CommonMessageMessage;
  choice: ChoiceMessage;
  clearpoke: NoArgsMessage;
  controlshtml: CommonMessageMessage;
  customgroups: CustomGroupsMessage;
  debug: CommonMessageMessage;
  deinit: NoArgsMessage;
  detailschange: DetailsChangeMessage;
  disconnect: CommonMessageMessage;
  drag: DragMessage;
  error: CommonMessageMessage;
  expire: CommonMessageMessage;
  faint: SinglePokemonMessageType;
  fieldhtml: CommonMessageMessage;
  formats: FormatsMessage;
  gametype: GameTypeMessage;
  gen: GenerationMessage;
  hidelines: HideLinesMessage;
  html: CommonMessageMessage;
  inactive: CommonMessageMessage;
  inactiveoff: CommonMessageMessage;
  init: InitializeRoomMessage;
  j: JoinMessage;
  J: JoinMessage;
  join: JoinMessage;
  l: LeaveMessage;
  L: LeaveMessage;
  leave: LeaveMessage;
  message: CommonMessageMessage;
  move: MoveMessage;
  n: NameChangeMessage;
  N: NameChangeMessage;
  name: NameChangeMessage;
  nametaken: NameTakenMessage;
  noinit: ErrorInitializingRoomMessage;
  notify: NotificationMessage;
  player: PlayerMessage;
  pm: PmMessage;
  poke: TeamPreviewMessage;
  popup: CommonMessageMessage;
  queryresponse: QueryResponseMessage;
  rated: RatedMessage;
  raw: CommonMessageMessage;
  refresh: NoArgsMessage;
  replace: ReplaceMessage;
  request: RequestMessage;
  roomerror: RoomErrorMessage;
  rule: RuleMessage;
  seed: SeedMessage;
  start: NoArgsMessage;
  swap: SwapMessage;
  switch: SwitchMessage;
  teampreview: EndTeamPreviewMessage;
  teamsize: TeamSizeMessage;
  tempnotify: TemporaryNotificationMessage;
  tempnotifyoff: TemporaryNotificationOffMessage;
  tie: NoArgsMessage;
  tier: TierMessage;
  title: TitleMessage;
  tournament: TournamentMessage;
  turn: TurnMessage;
  uhtml: UpdateHtmlMessage;
  uhtmlchange: UpdateHtmlMessage;
  unlink: UnlinkMessage;
  updatechallenges: UpdateChallengesMessage;
  updatepoke: UpdatePokemonMessage;
  updatesearch: UpdateSearchMessage;
  updateuser: UpdateUserMessage;
  upkeep: NoArgsMessage;
  usercount: UserCountMessage;
  users: UsersMessage;
  variation: CommonMessageMessage;
  warning: CommonMessageMessage;
  win: WinMessage;
}

export const messageNameToClientMessageName: Record<keyof RawPokemonShowdownMessages, keyof PokemonShowdownMessages> = {
  '-ability': 'ability',
  '-activate': 'activate',
  '-anim': 'animation',
  '-block': 'block',
  '-boost': 'boost',
  '-burst': 'ultraBurst',
  '-candynamax': 'canDynamax',
  '-center': 'center',
  '-clearallboost': 'clearAllBoost',
  '-clearboost': 'clearBoost',
  '-clearnegativeboost': 'clearNegativeBoost',
  '-clearpositiveboost': 'clearPositiveBoost',
  '-combine': 'combine',
  '-copyboost': 'copyBoost',
  '-crit': 'crit',
  '-curestatus': 'cureStatus',
  '-cureteam': 'cureTeam',
  '-damage': 'damage',
  '-end': 'endEffect',
  '-endability': 'endAbility',
  '-enditem': 'endItem',
  '-fail': 'fail',
  '-fieldactivate': 'fieldStart',
  '-fieldend': 'fieldEnd',
  '-fieldstart': 'fieldStart',
  '-formechange': 'formeChange',
  '-heal': 'heal',
  '-hint': 'hint',
  '-hitcount': 'hitCount',
  '-immune': 'immune',
  '-invertboost': 'invertBoost',
  '-item': 'item',
  '-mega': 'megaEvolution',
  '-message': 'miscellaneousMessage',
  '-miss': 'miss',
  '-mustrecharge': 'recharge',
  '-notarget': 'noTarget',
  '-nothing': 'nothing',
  '-ohko': 'ohko',
  '-prepare': 'prepareMove',
  '-primal': 'primalReversion',
  '-resisted': 'resisted',
  '-setboost': 'setBoost',
  '-sethp': 'setHp',
  '-sideend': 'sideEnd',
  '-sidestart': 'sideStart',
  '-singlemove': 'singleMove',
  '-singleturn': 'singleTurnMove',
  '-start': 'startEffect',
  '-status': 'status',
  '-supereffective': 'superEffective',
  '-swapboost': 'swapBoost',
  '-swapsideconditions': 'swapSideConditions',
  '-terastallize': 'terastallize',
  '-transform': 'transform',
  '-unboost': 'unboost',
  '-waiting': 'waiting',
  '-weather': 'weather',
  '-zbroken': 'zBroken',
  '-zpower': 'zPower',
  ':': 'timestamp',
  '': 'empty',
  'c:': 'timestampChat',
  'chatmsg-raw': 'chatMessageRaw',
  't:': 'timestamp',
  askreg: 'requestRegistration',
  b: 'battle',
  B: 'battle',
  battle: 'battle',
  bigerror: 'bigError',
  c: 'chat',
  callback: 'callback',
  cant: 'cant',
  challstr: 'challenge',
  chat: 'chat',
  chatmsg: 'chatMessage',
  choice: 'choice',
  clearpoke: 'startTeamPreview',
  controlshtml: 'controlsHtml',
  customgroups: 'customGroups',
  debug: 'debug',
  deinit: 'deinitializeRoom',
  detailschange: 'detailsChange',
  disconnect: 'disconnect',
  drag: 'drag',
  error: 'error',
  expire: 'expire',
  faint: 'faint',
  fieldhtml: 'fieldHtml',
  formats: 'formats',
  gametype: 'gameType',
  gen: 'generation',
  hidelines: 'hideLines',
  html: 'html',
  inactive: 'inactive',
  inactiveoff: 'inactiveOff',
  init: 'initializeRoom',
  j: 'join',
  J: 'silentJoin',
  join: 'join',
  l: 'leave',
  L: 'silentLeave',
  leave: 'leave',
  message: 'miscellaneousMessage',
  move: 'move',
  n: 'nameChange',
  N: 'silentNameChange',
  name: 'nameChange',
  nametaken: 'nameTaken',
  noinit: 'errorInitializingRoom',
  notify: 'notification',
  player: 'player',
  pm: 'pm',
  poke: 'teamPreview',
  popup: 'popup',
  queryresponse: 'queryResponse',
  rated: 'rated',
  raw: 'raw',
  refresh: 'refresh',
  replace: 'replace',
  request: 'request',
  roomerror: 'roomError',
  rule: 'rule',
  seed: 'seed',
  start: 'battleStart',
  swap: 'swap',
  switch: 'switch',
  teampreview: 'endTeamPreview',
  teamsize: 'teamSize',
  tempnotify: 'temporaryNotification',
  tempnotifyoff: 'temporaryNotificationOff',
  tie: 'tie',
  tier: 'tier',
  title: 'title',
  tournament: 'tournament',
  turn: 'turn',
  uhtml: 'updateHtml',
  uhtmlchange: 'updateHtml',
  unlink: 'unlink',
  updatechallenges: 'updateChallenges',
  updatepoke: 'updatePokemon',
  updatesearch: 'updateSearch',
  updateuser: 'updateUser',
  upkeep: 'upkeep',
  usercount: 'userCount',
  users: 'users',
  variation: 'variation',
  warning: 'warning',
  win: 'win',
};

export const getPokemonShowdownMessageKey = (key?: string): keyof PokemonShowdownMessages => {
  if (key === undefined) {
    return 'default';
  }

  return messageNameToClientMessageName[key as keyof RawPokemonShowdownMessages] || 'unhandled';
};

export type PokemonShowdownMessageDeserializers = {
  [key in keyof PokemonShowdownMessages]: ArgsDeserializer<PokemonShowdownMessages[key]>;
};

export const deserializers: PokemonShowdownMessageDeserializers = {
  ability: deserializeAbilityMessage,
  activate: deserializeActivateMessage,
  animation: deserializeAnimationMessage,
  battle: deserializeBattleMessage,
  battleStart: deserializeNoArgsMessage,
  bigError: deserializeCommonMessageMessage,
  block: deserializeBlockMessage,
  boost: deserializeBoostMessage,
  callback: deserializeCallbackMessage,
  canDynamax: deserializeCanDynamaxMessage,
  cant: deserializeCantMessage,
  center: deserializeNoArgsMessage,
  challenge: deserializeChallengeMessage,
  chat: deserializeChatMessage,
  chatMessage: deserializeCommonMessageMessage,
  chatMessageRaw: deserializeCommonMessageMessage,
  choice: deserializeChoiceMessage,
  clearAllBoost: deserializeNoArgsMessage,
  clearBoost: deserializeSinglePokemonMessage,
  clearNegativeBoost: deserializeSinglePokemonMessage,
  clearPositiveBoost: deserializeClearPositiveBoostMessage,
  combine: deserializeNoArgsMessage,
  controlsHtml: deserializeCommonMessageMessage,
  copyBoost: deserializeCopyBoostMessage,
  crit: deserializeSinglePokemonMessage,
  cureStatus: deserializeCureStatusMessage,
  cureTeam: deserializeSinglePokemonMessage,
  customGroups: deserializeCustomGroupsMessage,
  damage: deserializeDamageMessage,
  debug: deserializeCommonMessageMessage,
  default: (input) => ({ value: [input, {}] }),
  deinitializeRoom: deserializeNoArgsMessage,
  detailsChange: deserializeDetailsChangeMessage,
  disconnect: deserializeCommonMessageMessage,
  drag: deserializeDragMessage,
  empty: deserializeEmptyMessage,
  endAbility: deserializeEndAbilityMessage,
  endEffect: deserializeEndEffectMessage,
  endItem: deserializeEndItemMessage,
  endTeamPreview: deserializeEndTeamPreviewMessage,
  error: deserializeCommonMessageMessage,
  errorInitializingRoom: deserializeErrorInitializingRoomMessage,
  expire: deserializeCommonMessageMessage,
  fail: deserializeFailMessage,
  faint: deserializeSinglePokemonMessage,
  fieldEnd: deserializeFieldEndMessage,
  fieldHtml: deserializeCommonMessageMessage,
  fieldStart: deserializeFieldStartMessage,
  formats: deserializeFormatsMessage,
  formeChange: deserializeFormeChangeMessage,
  gameType: deserializeGameTypeMessage,
  generation: deserializeGenerationMessage,
  heal: deserializeHealMessage,
  hideLines: deserializeHideLinesMessage,
  hint: deserializeCommonMessageMessage,
  hitCount: deserializeHitCountMessage,
  html: deserializeCommonMessageMessage,
  immune: deserializeImmuneMessage,
  inactive: deserializeCommonMessageMessage,
  inactiveOff: deserializeCommonMessageMessage,
  initializationDone: deserializeNoArgsMessage,
  initializeRoom: deserializeInitializeRoomMessage,
  invertBoost: deserializeSinglePokemonMessage,
  item: deserializeItemMessage,
  join: deserializeJoinMessage,
  leave: deserializeLeaveMessage,
  megaEvolution: deserializeMegaEvolutionMessage,
  miscellaneousMessage: deserializeCommonMessageMessage,
  miss: deserializeMissMessage,
  move: deserializeMoveMessage,
  nameChange: deserializeNameChangeMessage,
  nameTaken: deserializeNameTakenMessage,
  noTarget: deserializeNoTargetMessage,
  nothing: deserializeNoArgsMessage,
  notification: deserializeNotificationMessage,
  ohko: deserializeNoArgsMessage,
  player: deserializePlayerMessage,
  pm: deserializePmMessage,
  popup: deserializeCommonMessageMessage,
  prepareMove: deserializePrepareMoveMessage,
  primalReversion: deserializeSinglePokemonMessage,
  queryResponse: deserializeQueryResponseMessage,
  rated: deserializeRatedMessage,
  raw: deserializeCommonMessageMessage,
  recharge: deserializeSinglePokemonMessage,
  refresh: deserializeNoArgsMessage,
  replace: deserializeReplaceMessage,
  request: deserializeRequestMessage,
  requestRegistration: deserializeRequestRegistrationMessage,
  resisted: deserializeSinglePokemonMessage,
  roomError: deserializeRoomErrorMessage,
  rule: deserializeRuleMessage,
  seed: deserializeSeedMessage,
  setBoost: deserializeSetBoostMessage,
  setHp: deserializeSetHpMessage,
  sideEnd: deserializeSideEndMessage,
  sideStart: deserializeSideStartMessage,
  silentJoin: deserializeJoinMessage,
  silentLeave: deserializeLeaveMessage,
  silentNameChange: deserializeNameChangeMessage,
  singleMove: deserializeSingleMoveMessage,
  singleTurnMove: deserializeSingleTurnMoveMessage,
  startEffect: deserializeStartEffectMessage,
  startTeamPreview: deserializeNoArgsMessage,
  status: deserializeStatusMessage,
  superEffective: deserializeSinglePokemonMessage,
  swap: deserializeSwapMessage,
  swapBoost: deserializeSwapBoostMessage,
  swapSideConditions: deserializeNoArgsMessage,
  switch: deserializeSwitchMessage,
  teamPreview: deserializeTeamPreviewMessage,
  teamSize: deserializeTeamSizeMessage,
  temporaryNotification: deserializeTemporaryNotificationMessage,
  temporaryNotificationOff: deserializeTemporaryNotificationOffMessage,
  terastallize: deserializeTerastallizeMessage,
  tie: deserializeNoArgsMessage,
  tier: deserializeTierMessage,
  timestamp: deserializeTimestampMessage,
  timestampChat: deserializeTimestampChatMessage,
  timestampChatDelta: deserializeTimestampChatDeltaMessage,
  title: deserializeTitleMessage,
  tournament: deserializeTournamentMessage,
  transform: deserializeTransformMessage,
  turn: deserializeTurnMessage,
  ultraBurst: deserializeUltraBurstMessage,
  unboost: deserializeUnboostMessage,
  unhandled: (input) => ({ value: [input, {}] }),
  unlink: deserializeUnlinkMessage,
  updateChallenges: deserializeUpdateChallengesMessage,
  updateHtml: deserializeUpdateHtmlMessage,
  updatePokemon: deserializeUpdatePokemonMessage,
  updateSearch: deserializeUpdateSearchMessage,
  updateUser: deserializeUpdateUserMessage,
  upkeep: deserializeNoArgsMessage,
  userCount: deserializeUserCountMessage,
  users: deserializeUsersMessage,
  variation: deserializeCommonMessageMessage,
  waiting: deserializeWaitingMessage,
  warning: deserializeCommonMessageMessage,
  weather: deserializeWeatherMessage,
  win: deserializeWinMessage,
  zBroken: deserializeSinglePokemonMessage,
  zPower: deserializeSinglePokemonMessage,
};

export type PokemonShowdownMessageSerializers = {
  [key in keyof PokemonShowdownMessages]: ArgsSerializer<PokemonShowdownMessages[key]>;
};

export const serializers: PokemonShowdownMessageSerializers = {
  ability: serializeAbilityMessage,
  activate: serializeActivateMessage,
  animation: serializeAnimationMessage,
  battle: serializeBattleMessage,
  battleStart: serializeNoArgsMessage,
  bigError: serializeCommonMessageMessage,
  block: serializeBlockMessage,
  boost: serializeBoostMessage,
  callback: serializeCallbackMessage,
  canDynamax: serializeCanDynamaxMessage,
  cant: serializeCantMessage,
  center: serializeNoArgsMessage,
  challenge: serializeChallengeMessage,
  chat: serializeChatMessage,
  chatMessage: serializeCommonMessageMessage,
  chatMessageRaw: serializeCommonMessageMessage,
  choice: serializeChoiceMessage,
  clearAllBoost: serializeNoArgsMessage,
  clearBoost: serializeSinglePokemonMessage,
  clearNegativeBoost: serializeSinglePokemonMessage,
  clearPositiveBoost: serializeClearPositiveBoostMessage,
  combine: serializeNoArgsMessage,
  controlsHtml: serializeCommonMessageMessage,
  copyBoost: serializeCopyBoostMessage,
  crit: serializeSinglePokemonMessage,
  cureStatus: serializeCureStatusMessage,
  cureTeam: serializeSinglePokemonMessage,
  customGroups: serializeCustomGroupsMessage,
  damage: serializeDamageMessage,
  debug: serializeCommonMessageMessage,
  default: (input) => ({ value: input }),
  deinitializeRoom: serializeNoArgsMessage,
  detailsChange: serializeDetailsChangeMessage,
  disconnect: serializeCommonMessageMessage,
  drag: serializeDragMessage,
  empty: serializeEmptyMessage,
  endAbility: serializeEndAbilityMessage,
  endEffect: serializeEndEffectMessage,
  endItem: serializeEndItemMessage,
  endTeamPreview: serializeEndTeamPreviewMessage,
  error: serializeCommonMessageMessage,
  errorInitializingRoom: serializeErrorInitializingRoomMessage,
  expire: serializeCommonMessageMessage,
  fail: serializeFailMessage,
  faint: serializeSinglePokemonMessage,
  fieldEnd: serializeFieldEndMessage,
  fieldHtml: serializeCommonMessageMessage,
  fieldStart: serializeFieldStartMessage,
  formats: serializeFormatsMessage,
  formeChange: serializeFormeChangeMessage,
  gameType: serializeGameTypeMessage,
  generation: serializeGenerationMessage,
  heal: serializeHealMessage,
  hideLines: serializeHideLinesMessage,
  hint: serializeCommonMessageMessage,
  hitCount: serializeHitCountMessage,
  html: serializeCommonMessageMessage,
  immune: serializeImmuneMessage,
  inactive: serializeCommonMessageMessage,
  inactiveOff: serializeCommonMessageMessage,
  initializationDone: serializeNoArgsMessage,
  initializeRoom: serializeInitializeRoomMessage,
  invertBoost: serializeSinglePokemonMessage,
  item: serializeItemMessage,
  join: serializeJoinMessage,
  leave: serializeLeaveMessage,
  megaEvolution: serializeMegaEvolutionMessage,
  miscellaneousMessage: serializeCommonMessageMessage,
  miss: serializeMissMessage,
  move: serializeMoveMessage,
  nameChange: serializeNameChangeMessage,
  nameTaken: serializeNameTakenMessage,
  noTarget: serializeNoTargetMessage,
  nothing: serializeNoArgsMessage,
  notification: serializeNotificationMessage,
  ohko: serializeNoArgsMessage,
  player: serializePlayerMessage,
  pm: serializePmMessage,
  popup: serializeCommonMessageMessage,
  prepareMove: serializePrepareMoveMessage,
  primalReversion: serializeSinglePokemonMessage,
  queryResponse: serializeQueryResponseMessage,
  rated: serializeRatedMessage,
  raw: serializeCommonMessageMessage,
  recharge: serializeSinglePokemonMessage,
  refresh: serializeNoArgsMessage,
  replace: serializeReplaceMessage,
  request: serializeRequestMessage,
  requestRegistration: serializeRequestRegistrationMessage,
  resisted: serializeSinglePokemonMessage,
  roomError: serializeRoomErrorMessage,
  rule: serializeRuleMessage,
  seed: serializeSeedMessage,
  setBoost: serializeSetBoostMessage,
  setHp: serializeSetHpMessage,
  sideEnd: serializeSideEndMessage,
  sideStart: serializeSideStartMessage,
  silentJoin: serializeJoinMessage,
  silentLeave: serializeLeaveMessage,
  silentNameChange: serializeNameChangeMessage,
  singleMove: serializeSingleMoveMessage,
  singleTurnMove: serializeSingleTurnMoveMessage,
  startEffect: serializeStartEffectMessage,
  startTeamPreview: serializeNoArgsMessage,
  status: serializeStatusMessage,
  superEffective: serializeSinglePokemonMessage,
  swap: serializeSwapMessage,
  swapBoost: serializeSwapBoostMessage,
  swapSideConditions: serializeNoArgsMessage,
  switch: serializeSwitchMessage,
  teamPreview: serializeTeamPreviewMessage,
  teamSize: serializeTeamSizeMessage,
  temporaryNotification: serializeTemporaryNotificationMessage,
  temporaryNotificationOff: serializeTemporaryNotificationOffMessage,
  terastallize: serializeTerastallizeMessage,
  tie: serializeNoArgsMessage,
  tier: serializeTierMessage,
  timestamp: serializeTimestampMessage,
  timestampChat: serializeTimestampChatMessage,
  timestampChatDelta: serializeTimestampChatDeltaMessage,
  title: serializeTitleMessage,
  tournament: serializeTournamentMessage,
  transform: serializeTransformMessage,
  turn: serializeTurnMessage,
  ultraBurst: serializeUltraBurstMessage,
  unboost: serializeUnboostMessage,
  unhandled: (input) => ({ value: input }),
  unlink: serializeUnlinkMessage,
  updateChallenges: serializeUpdateChallengesMessage,
  updateHtml: serializeUpdateHtmlMessage,
  updatePokemon: serializeUpdatePokemonMessage,
  updateSearch: serializeUpdateSearchMessage,
  updateUser: serializeUpdateUserMessage,
  upkeep: serializeNoArgsMessage,
  userCount: serializeUserCountMessage,
  users: serializeUsersMessage,
  variation: serializeCommonMessageMessage,
  waiting: serializeWaitingMessage,
  warning: serializeCommonMessageMessage,
  weather: serializeWeatherMessage,
  win: serializeWinMessage,
  zBroken: serializeSinglePokemonMessage,
  zPower: serializeSinglePokemonMessage,
};

export const pokemonShowdownMessageNames = Object.keys(deserializers) as (keyof PokemonShowdownMessages)[];

export type RoomMessages = {
  [K in keyof PokemonShowdownMessages]: {
    room: string,
    rawMessageName?: keyof RawPokemonShowdownMessages,
    rawMessage: string,
    messageName: K,
    message: [PokemonShowdownMessages[K], Record<string, string>]
  };
};

type RoomMessage = RoomMessages[keyof RoomMessages];

export interface RoomMessageError {
  room: string;
  rawMessageName: keyof RawPokemonShowdownMessages;
  rawMessage: string,
  messageName: string,
  errors: string[],
}

export type RoomMessageResult = { value: RoomMessage } | { error: RoomMessageError };

export const deserializeRawMessages = (rawMessagesInput: string): RoomMessageResult[] => {
  const rawMessages = rawMessagesInput.split('\n');
  let room = 'lobby';

  return rawMessages
    .map((rawMessage) => {
      if (rawMessage.charAt(0) === '>') {
        room = rawMessage.substr(1);
        return undefined;
      }

      if (rawMessage.charAt(0) !== '|') {
        return {
          value: {
            room,
            rawMessage,
            messageName: 'default',
            message: [[rawMessage], {}],
          },
        };
      }

      const [, rawMessageName, ...args] = rawMessage
        .split('|');
      const messageName = getPokemonShowdownMessageKey(rawMessageName);
      const deserializer = deserializers[messageName] || deserializers.unhandled;
      const result = deserializer(args);

      if ('value' in result) {
        return {
          value: {
            room,
            rawMessageName,
            rawMessage,
            messageName,
            message: result.value,
          },
        };
      }

      return {
        error: {
          room,
          rawMessageName,
          rawMessage,
          messageName,
          errors: result.errors,
        },
      };
    })
    .filter(
      (messageDeserializeResult) => messageDeserializeResult !== undefined,
    ) as RoomMessageResult[];
};

export const serializeMessage = <K extends keyof RawPokemonShowdownMessages>(
  messageType: K | undefined,
  message: RawPokemonShowdownMessages[K],
  keywordArguments: KeywordArguments = {},
) => {
  const messageName = getPokemonShowdownMessageKey(messageType);
  const serializer = (serializers[messageName] || serializers.unhandled) as ArgsSerializer<typeof message>;
  const result = serializer(message, keywordArguments);

  if ('value' in result) {
    if (messageType === undefined) {
      return { value: [...result.value] };
    }

    return { value: [messageType, ...result.value] };
  }

  return result;
};
