import { AbilityEvent, parseAbilityEvent } from './battle/ability';
import { ActivateEvent, parseActivateEvent } from './battle/activate';
import { BattleStartEvent, parseBattleStartEvent } from './battle/battle-start';
import { BlockEvent, parseBlockEvent } from './battle/block';
import { BoostEvent, parseBoostEvent } from './battle/boost';
import { CantEvent, parseCantEvent } from './battle/cant';
import { CenterEvent, parseCenterEvent } from './battle/center';
import { ClearAllBoostEvent, parseClearAllBoostEvent } from './battle/clear-all-boost';
import { ClearBoostEvent, parseClearBoostEvent } from './battle/clear-boost';
import { ClearNegativeBoostEvent, parseClearNegativeBoostEvent } from './battle/clear-negative-boost';
import { ClearPositiveBoostEvent, parseClearPositiveBoostEvent } from './battle/clear-positive-boost';
import { CombineEvent, parseCombineEvent } from './battle/combine';
import { CopyBoostEvent, parseCopyBoostEvent } from './battle/copy-boost';
import { CritEvent, parseCritEvent } from './battle/crit';
import { CureStatusEvent, parseCureStatusEvent } from './battle/cure-status';
import { CureTeamEvent, parseCureTeamEvent } from './battle/cure-team';
import { DamageEvent, parseDamageEvent } from './battle/damage';
import { DetailsChangeEvent, parseDetailsChangeEvent } from './battle/details-change';
import { DragEvent, parseDragEvent } from './battle/drag';
import { EmptyEvent, parseEmptyEvent } from './battle/empty';
import { EndAbilityEvent, parseEndAbilityEvent } from './battle/end-ability';
import { EndEffectEvent, parseEndEffectEvent } from './battle/end-effect';
import { EndItemEvent, parseEndItemEvent } from './battle/end-item';
import { EndTeamPreviewEvent, parseEndTeamPreviewEvent } from './battle/end-team-preview';
import { FailEvent, parseFailEvent } from './battle/fail';
import { FaintEvent, parseFaintEvent } from './battle/faint';
import { FieldEndEvent, parseFieldEndEvent } from './battle/field-end';
import { FieldStartEvent, parseFieldStartEvent } from './battle/field-start';
import { FormeChangeEvent, parseFormeChangeEvent } from './battle/forme-change';
import { GameTypeEvent, parseGameTypeEvent } from './battle/game-type';
import { GenerationEvent, parseGenerationEvent } from './battle/generation';
import { HealEvent, parseHealEvent } from './battle/heal';
import { HintEvent, parseHintEvent } from './battle/hint';
import { HitCountEvent, parseHitCountEvent } from './battle/hit-count';
import { ImmuneEvent, parseImmuneEvent } from './battle/immune';
import { InactiveEvent, parseInactiveEvent } from './battle/inactive';
import { InactiveOffEvent, parseInactiveOffEvent } from './battle/inactive-off';
import { InvertBoostEvent, parseInvertBoostEvent } from './battle/invert-boost';
import { ItemEvent, parseItemEvent } from './battle/item';
import { MegaEvolutionEvent, parseMegaEvolutionEvent } from './battle/mega-evolution';
import { MiscellaneousMessageEvent, parseMiscellaneousMessageEvent } from './battle/message';
import { MissEvent, parseMissEvent } from './battle/miss';
import { MoveEvent, parseMoveEvent } from './battle/move';
import { NoTargetEvent, parseNoTargetEvent } from './battle/no-target';
import { NothingEvent, parseNothingEvent } from './battle/nothing';
import { OhkoEvent, parseOhkoEvent } from './battle/ohko';
import { parsePlayerEvent, PlayerEvent } from './battle/player';
import { PrepareMoveEvent, parsePrepareMoveEvent } from './battle/prepare-move';
import { PrimalReversionEvent, parsePrimalReversionEvent } from './battle/primal-reversion';
import { parseRatedEvent, RatedEvent } from './battle/rated';
import { RechargeEvent, parseRechargeEvent } from './battle/recharge';
import { ReplaceEvent, parseReplaceEvent } from './battle/replace';
import { ResistedEvent, parseResistedEvent } from './battle/resisted';
import { parseRuleEvent, RuleEvent } from './battle/rule';
import { SetBoostEvent, parseSetBoostEvent } from './battle/set-boost';
import { SetHpEvent, parseSetHpEvent } from './battle/set-hp';
import { SideEndEvent, parseSideEndEvent } from './battle/side-end';
import { SideStartEvent, parseSideStartEvent } from './battle/side-start';
import { SingleMoveEvent, parseSingleMoveEvent } from './battle/single-move';
import { SingleTurnMoveEvent, parseSingleTurnMoveEvent } from './battle/single-turn';
import { StartEffectEvent, parseStartEffectEvent } from './battle/start-effect';
import { parseStartTeamPreviewEvent, StartTeamPreviewEvent } from './battle/start-team-preview';
import { StatusEvent, parseStatusEvent } from './battle/status';
import { SuperEffectiveEvent, parseSuperEffectiveEvent } from './battle/super-effective';
import { SwapEvent, parseSwapEvent } from './battle/swap';
import { SwapBoostEvent, parseSwapBoostEvent } from './battle/swap-boost';
import { SwitchEvent, parseSwitchEvent } from './battle/switch';
import { parseTeamPreviewEvent, TeamPreviewEvent } from './battle/team-preview';
import { parseTeamSizeEvent, TeamSizeEvent } from './battle/team-size';
import { TieEvent, parseTieEvent } from './battle/tie';
import { parseTierEvent, TierEvent } from './battle/tier';
import { TimestampEvent, parseTimestampEvent } from './battle/timestamp';
import { TransformEvent, parseTransformEvent } from './battle/transform';
import { TurnEvent, parseTurnEvent } from './battle/turn';
import { UltraBurstEvent, parseUltraBurstEvent } from './battle/ultra-burst';
import { UnboostEvent, parseUnboostEvent } from './battle/unboost';
import { UpkeepEvent, parseUpkeepEvent } from './battle/upkeep';
import { WaitingEvent, parseWaitingEvent } from './battle/waiting';
import { WeatherEvent, parseWeatherEvent } from './battle/weather';
import { WinEvent, parseWinEvent } from './battle/win';
import { ZBrokenEvent, parseZBrokenEvent } from './battle/z-broken';
import { ZPowerEvent, parseZPowerEvent } from './battle/z-power';
import { ArgsParser } from './parser';
import { ChallengeEvent, parseChallengeEvent } from './system/challenge';
import { ChatEvent, parseChatEvent } from './system/chat';
import { parseDeinitializeRoomEvent, DeinitializeRoomEvent } from './system/deinitialize-room';
import { parseErrorInitializingRoomEvent, ErrorInitializingRoomEvent } from './system/error-initializing-room';
import { InitializeRoomEvent, parseInitializeRoomEvent } from './system/initialize-room';
import { JoinEvent, parseJoinEvent } from './system/join';
import { LeaveEvent, parseLeaveEvent } from './system/leave';
import { NameChangeEvent, parseNameChangeEvent } from './system/name-change';
import { NameTakenEvent, parseNameTakenEvent } from './system/name-taken';
import { PmEvent, parsePmEvent } from './system/pm';
import { parseQueryResponseEvent, QueryResponseEvent } from './system/query-response';
import { RawEvent, parseRawEvent } from './system/raw';
import { parseRequestRegistrationEvent, RequestRegistrationEvent } from './system/request-registration';
import { parseTimestampChatEvent, TimestampChatEvent } from './system/timestamp-chat';
import { parseTitleEvent, TitleEvent } from './system/title';
import { parseUserCountEvent, UserCountEvent } from './system/user-count';

export interface PokemonShowdownEvents {
  player: PlayerEvent;
  teamSize: TeamSizeEvent;
  gameType: GameTypeEvent;
  generation: GenerationEvent;
  tier: TierEvent;
  rated: RatedEvent;
  rule: RuleEvent;
  startTeamPreview: StartTeamPreviewEvent;
  teamPreview: TeamPreviewEvent;
  endTeamPreview: EndTeamPreviewEvent;
  battleStart: BattleStartEvent;
  empty: EmptyEvent;
  inactive: InactiveEvent;
  inactiveOff: InactiveOffEvent;
  upkeep: UpkeepEvent;
  turn: TurnEvent;
  win: WinEvent;
  tie: TieEvent;
  timestamp: TimestampEvent;
  move: MoveEvent;
  switch: SwitchEvent;
  drag: DragEvent;
  detailsChange: DetailsChangeEvent;
  formeChange: FormeChangeEvent;
  replace: ReplaceEvent;
  swap: SwapEvent;
  cant: CantEvent;
  faint: FaintEvent;
  fail: FailEvent;
  block: BlockEvent;
  noTarget: NoTargetEvent;
  miss: MissEvent;
  damage: DamageEvent;
  heal: HealEvent;
  setHp: SetHpEvent;
  status: StatusEvent;
  cureStatus: CureStatusEvent;
  cureTeam: CureTeamEvent;
  boost: BoostEvent;
  unboost: UnboostEvent;
  setBoost: SetBoostEvent;
  swapBoost: SwapBoostEvent;
  invertBoost: InvertBoostEvent;
  clearBoost: ClearBoostEvent;
  clearAllBoost: ClearAllBoostEvent;
  clearPositiveBoost: ClearPositiveBoostEvent;
  clearNegativeBoost: ClearNegativeBoostEvent;
  copyBoost: CopyBoostEvent;
  weather: WeatherEvent;
  fieldStart: FieldStartEvent;
  fieldEnd: FieldEndEvent;
  sideStart: SideStartEvent;
  sideEnd: SideEndEvent;
  startEffect: StartEffectEvent;
  endEffect: EndEffectEvent;
  crit: CritEvent;
  superEffective: SuperEffectiveEvent;
  resisted: ResistedEvent;
  immune: ImmuneEvent;
  item: ItemEvent,
  endItem: EndItemEvent,
  ability: AbilityEvent;
  endAbility: EndAbilityEvent;
  transform: TransformEvent;
  megaEvolution: MegaEvolutionEvent;
  primalReversion: PrimalReversionEvent;
  ultraBurst: UltraBurstEvent;
  zPower: ZPowerEvent;
  zBroken: ZBrokenEvent;
  activate: ActivateEvent;
  hint: HintEvent;
  center: CenterEvent;
  ohko: OhkoEvent;
  miscellaneousMessage: MiscellaneousMessageEvent;
  combine: CombineEvent;
  waiting: WaitingEvent;
  prepareMove: PrepareMoveEvent;
  recharge: RechargeEvent;
  nothing: NothingEvent;
  hitCount: HitCountEvent;
  singleMove: SingleMoveEvent;
  singleTurnMove: SingleTurnMoveEvent;
  chat: ChatEvent;
  timestampChat: TimestampChatEvent;
  join: JoinEvent;
  leave: LeaveEvent;
  challenge: ChallengeEvent;
  raw: RawEvent;
  pm: PmEvent;
  title: TitleEvent;
  nameChange: NameChangeEvent;
  requestRegistration: RequestRegistrationEvent;
  userCount: UserCountEvent;
  initializeRoom: InitializeRoomEvent;
  deinitializeRoom: DeinitializeRoomEvent;
  errorInitializingRoom: ErrorInitializingRoomEvent;
  queryResponse: QueryResponseEvent;
  nameTaken: NameTakenEvent;
  default: string[];
}

export const eventNameToClientEventName: Record<string, keyof PokemonShowdownEvents> = {
  player: 'player',
  teamsize: 'teamSize',
  gametype: 'gameType',
  gen: 'generation',
  tier: 'tier',
  rated: 'rated',
  rule: 'rule',
  clearpoke: 'startTeamPreview',
  poke: 'teamPreview',
  teampreview: 'endTeamPreview',
  start: 'battleStart',
  '': 'empty',
  inactive: 'inactive',
  inactiveoff: 'inactiveOff',
  upkeep: 'upkeep',
  turn: 'turn',
  win: 'win',
  tie: 'tie',
  't:': 'timestamp',
  move: 'move',
  switch: 'switch',
  drag: 'drag',
  detailschange: 'detailsChange',
  '-formechange': 'formeChange',
  replace: 'replace',
  swap: 'swap',
  cant: 'cant',
  faint: 'faint',
  '-fail': 'fail',
  '-block': 'block',
  '-notarget': 'noTarget',
  '-miss': 'miss',
  '-damage': 'damage',
  '-heal': 'heal',
  '-sethp': 'setHp',
  '-status': 'status',
  '-curestatus': 'cureStatus',
  '-cureteam': 'cureTeam',
  '-boost': 'boost',
  '-unboost': 'unboost',
  '-setboost': 'setBoost',
  '-swapboost': 'swapBoost',
  '-invertboost': 'invertBoost',
  '-clearboost': 'clearBoost',
  '-clearallboost': 'clearAllBoost',
  '-clearpositiveboost': 'clearPositiveBoost',
  '-clearnegativeboost': 'clearNegativeBoost',
  '-copyboost': 'copyBoost',
  '-weather': 'weather',
  '-fieldstart': 'fieldStart',
  '-fieldactivate': 'fieldStart',
  '-fieldend': 'fieldEnd',
  '-sidestart': 'sideStart',
  '-sideend': 'sideEnd',
  '-start': 'startEffect',
  '-end': 'endEffect',
  '-crit': 'crit',
  '-supereffective': 'superEffective',
  '-resisted': 'resisted',
  '-immune': 'immune',
  '-item': 'item',
  '-enditem': 'endItem',
  '-ability': 'ability',
  '-endability': 'endAbility',
  '-transform': 'transform',
  '-mega': 'megaEvolution',
  '-primal': 'primalReversion',
  '-burst': 'ultraBurst',
  '-zpower': 'zPower',
  '-zbroken': 'zBroken',
  '-activate': 'activate',
  '-hint': 'hint',
  '-center': 'center',
  '-ohko': 'ohko',
  '-message': 'miscellaneousMessage',
  '-combine': 'combine',
  '-waiting': 'waiting',
  '-prepare': 'prepareMove',
  '-mustrecharge': 'recharge',
  '-nothing': 'nothing',
  '-hitcount': 'hitCount',
  '-singlemove': 'singleMove',
  '-singleturn': 'singleTurnMove',
  chat: 'chat',
  c: 'chat',
  'c:': 'timestampChat',
  j: 'join',
  J: 'join',
  join: 'join',
  l: 'leave',
  L: 'leave',
  leave: 'leave',
  challstr: 'challenge',
  raw: 'raw',
  pm: 'pm',
  title: 'title',
  n: 'nameChange',
  N: 'nameChange',
  name: 'nameChange',
  askreg: 'requestRegistration',
  usercount: 'userCount',
  init: 'initializeRoom',
  deinit: 'deinitializeRoom',
  noinit: 'errorInitializingRoom',
  queryresponse: 'queryResponse',
  nametaken: 'nameTaken',
};

export const getPokemonShowdownEventKey = (key: string): keyof PokemonShowdownEvents => eventNameToClientEventName[key] || 'default';

export type PokemonShowdownEventParsers = {
  [key in keyof PokemonShowdownEvents]: ArgsParser<PokemonShowdownEvents[key]>;
};

export const parsers: PokemonShowdownEventParsers = {
  player: parsePlayerEvent,
  teamSize: parseTeamSizeEvent,
  gameType: parseGameTypeEvent,
  generation: parseGenerationEvent,
  tier: parseTierEvent,
  rated: parseRatedEvent,
  rule: parseRuleEvent,
  startTeamPreview: parseStartTeamPreviewEvent,
  teamPreview: parseTeamPreviewEvent,
  endTeamPreview: parseEndTeamPreviewEvent,
  battleStart: parseBattleStartEvent,
  empty: parseEmptyEvent,
  inactive: parseInactiveEvent,
  inactiveOff: parseInactiveOffEvent,
  upkeep: parseUpkeepEvent,
  turn: parseTurnEvent,
  win: parseWinEvent,
  tie: parseTieEvent,
  timestamp: parseTimestampEvent,
  move: parseMoveEvent,
  switch: parseSwitchEvent,
  drag: parseDragEvent,
  detailsChange: parseDetailsChangeEvent,
  formeChange: parseFormeChangeEvent,
  replace: parseReplaceEvent,
  swap: parseSwapEvent,
  cant: parseCantEvent,
  faint: parseFaintEvent,
  fail: parseFailEvent,
  block: parseBlockEvent,
  noTarget: parseNoTargetEvent,
  miss: parseMissEvent,
  damage: parseDamageEvent,
  heal: parseHealEvent,
  setHp: parseSetHpEvent,
  status: parseStatusEvent,
  cureStatus: parseCureStatusEvent,
  cureTeam: parseCureTeamEvent,
  boost: parseBoostEvent,
  unboost: parseUnboostEvent,
  setBoost: parseSetBoostEvent,
  swapBoost: parseSwapBoostEvent,
  invertBoost: parseInvertBoostEvent,
  clearBoost: parseClearBoostEvent,
  clearAllBoost: parseClearAllBoostEvent,
  clearPositiveBoost: parseClearPositiveBoostEvent,
  clearNegativeBoost: parseClearNegativeBoostEvent,
  copyBoost: parseCopyBoostEvent,
  weather: parseWeatherEvent,
  fieldStart: parseFieldStartEvent,
  fieldEnd: parseFieldEndEvent,
  sideStart: parseSideStartEvent,
  sideEnd: parseSideEndEvent,
  startEffect: parseStartEffectEvent,
  endEffect: parseEndEffectEvent,
  crit: parseCritEvent,
  superEffective: parseSuperEffectiveEvent,
  resisted: parseResistedEvent,
  immune: parseImmuneEvent,
  item: parseItemEvent,
  endItem: parseEndItemEvent,
  ability: parseAbilityEvent,
  endAbility: parseEndAbilityEvent,
  transform: parseTransformEvent,
  megaEvolution: parseMegaEvolutionEvent,
  primalReversion: parsePrimalReversionEvent,
  ultraBurst: parseUltraBurstEvent,
  zPower: parseZPowerEvent,
  zBroken: parseZBrokenEvent,
  activate: parseActivateEvent,
  hint: parseHintEvent,
  center: parseCenterEvent,
  ohko: parseOhkoEvent,
  miscellaneousMessage: parseMiscellaneousMessageEvent,
  combine: parseCombineEvent,
  waiting: parseWaitingEvent,
  prepareMove: parsePrepareMoveEvent,
  recharge: parseRechargeEvent,
  nothing: parseNothingEvent,
  hitCount: parseHitCountEvent,
  singleMove: parseSingleMoveEvent,
  singleTurnMove: parseSingleTurnMoveEvent,
  chat: parseChatEvent,
  timestampChat: parseTimestampChatEvent,
  join: parseJoinEvent,
  leave: parseLeaveEvent,
  challenge: parseChallengeEvent,
  raw: parseRawEvent,
  pm: parsePmEvent,
  title: parseTitleEvent,
  nameChange: parseNameChangeEvent,
  requestRegistration: parseRequestRegistrationEvent,
  userCount: parseUserCountEvent,
  initializeRoom: parseInitializeRoomEvent,
  deinitializeRoom: parseDeinitializeRoomEvent,
  errorInitializingRoom: parseErrorInitializingRoomEvent,
  queryResponse: parseQueryResponseEvent,
  nameTaken: parseNameTakenEvent,
  default: (input) => ({ value: [input, {}] }),
};

export const pokemonShowdownEventNames = Object.keys(parsers) as (keyof PokemonShowdownEvents)[];
