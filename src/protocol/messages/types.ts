import * as t from 'io-ts';
import {
  coalesceErrors,
  createOptionalDeserializer,
  Deserializer,
  Serializer,
} from '../parser';

export const roomTypeType = t.keyof({
  chat: true,
  battle: true,
});

/**
 * A room type.
 *
 * Serialized example: `chat`
 *
 * Deserialized example:
 * ```json
 * "chat"
 * ```
 */
export type RoomType = t.TypeOf<typeof roomTypeType>;

export const deserializeRoomType: Deserializer<RoomType> = (input: string) => {
  if ((roomTypeType.keys as any)[input]) {
    return { value: input as RoomType };
  }

  return { errors: [`${input} is not a valid RoomType`] };
};

export const serializeRoomType: Serializer<RoomType> = (input) => ({
  value: input,
});

export const roomInitializationErrorTypeType = t.keyof({
  joinfailed: true,
  nonexistent: true,
  rename: true,
  namerequired: true,
  '': true,
});

/**
 * A room initialization error.
 *
 * Serialized example: `joinfailed`
 *
 * Deserialized example:
 * ```json
 * "joinfailed"
 * ```
 */
export type RoomInitializationErrorType = t.TypeOf<typeof roomInitializationErrorTypeType>;

export const deserializeRoomInitializationErrorType: Deserializer<RoomInitializationErrorType> = (
  input: string,
) => {
  if ((roomInitializationErrorTypeType.keys as any)[input]) {
    return { value: input as RoomInitializationErrorType };
  }

  return { errors: [`${input} is not a valid RoomInitializationErrorType`] };
};

export const serializeRoomInitializationErrorType: Serializer<RoomInitializationErrorType> = (
  input,
) => ({
  value: input,
});

export const userType = t.type({
  group: t.string,
  username: t.string,
  isAway: t.boolean,
  status: t.string,
});

/**
 * A user on Showdown.
 *
 * Serialized example: `~zarel`
 *
 * Deserialized example:
 * ```json
 * {
 *   "group": "~",
 *   "username": "zarel",
 *   "isAway": false,
 *   "status": ""
 * }
 * ```
 *
 * @member group The user's group
 * @member username The user's username
 * @member isAway Whether the user is away or not
 * @member status The user's status
 */
export type User = t.TypeOf<typeof userType>;

export const deserializeUser: Deserializer<User> = (input: string) => {
  let group = '';
  let username = input;
  let isAway = false;
  let status = '';

  if (!/[A-Za-z0-9]/.test(username.charAt(0))) {
    group = username.charAt(0);
    username = username.slice(1);
  }

  const atIndex = username.indexOf('@');
  if (atIndex > 0) {
    status = username.slice(atIndex + 1);
    username = username.slice(0, atIndex);

    if (status.startsWith('!')) {
      isAway = true;
      status = status.slice(1);
    }
  }

  return {
    value: {
      group,
      username,
      isAway,
      status,
    },
  };
};

export const serializeUser: Serializer<User> = (input) => {
  let statusText = '';
  if (input.isAway || input.status.length) {
    statusText += '@';

    if (input.isAway) {
      statusText += '!';
    }

    statusText += input.status;
  }

  return { value: `${input.group}${input.username}${statusText}` };
};

export const playerType = t.keyof({
  p1: true,
  p2: true,
  p3: true,
  p4: true,
  p5: true,
  p6: true,
  p7: true,
  p8: true,
  p9: true,
});

/**
 * A player in battle.
 *
 * Serialized example: `p1`
 *
 * Deserialized example:
 * ```json
 * "p1"
 * ```
 */
export type Player = t.TypeOf<typeof playerType>;

export const deserializePlayer: Deserializer<Player> = (input: string) => {
  if ((playerType.keys as any)[input]) {
    return { value: input as Player };
  }

  return { errors: [`${input} is not a valid Player`] };
};

export const serializePlayer: Serializer<Player> = (input) => ({
  value: input,
});

export const subPositionType = t.keyof({
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  j: true,
  k: true,
  l: true,
  m: true,
  n: true,
  o: true,
  p: true,
  q: true,
  r: true,
  s: true,
  t: true,
  u: true,
  v: true,
  w: true,
  x: true,
  y: true,
  z: true,
});

/**
 * A subposition in battle.
 *
 * Serialized example: `a`
 *
 * Deserialized example:
 * ```json
 * "a"
 * ```
 */
export type SubPosition = t.TypeOf<typeof subPositionType>;
export const deserializeSubPosition: Deserializer<SubPosition> = (input: string) => {
  if ((subPositionType.keys as any)[input]) {
    return { value: input as SubPosition };
  }

  return { errors: [`${input} is not a valid SubPosition`] };
};

export const serializeSubPosition: Serializer<SubPosition> = (input) => ({
  value: input,
});

export const positionType = t.intersection([
  t.type({ player: playerType }),
  t.partial({ subPosition: subPositionType }),
]);

/**
 * A position in battle.
 *
 * Serialized example: `p1a`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "subPosition": "a"
 * }
 * ```
 *
 * @member player The player in battle
 * @member subPosition The location on the player's side in battle
 */
export type Position = t.TypeOf<typeof positionType>;

export const deserializePosition: Deserializer<Position> = (input: string) => {
  const player = deserializePlayer(input.substr(0, 2));
  const subPosition = createOptionalDeserializer(deserializeSubPosition)(input.substr(2, 1));

  if ('errors' in player || 'errors' in subPosition) {
    return { errors: coalesceErrors([player, subPosition]) };
  }

  return { value: { player: player.value, subPosition: subPosition.value } };
};

export const serializePosition: Serializer<Position> = (input) => ({
  value: `${input.player}${input.subPosition ? input.subPosition : ''}`,
});

export const genderType = t.keyof({
  M: true,
  F: true,
});

/**
 * A Pokémon's gender.
 *
 * Serialized example: `M`
 *
 * Deserialized example:
 * ```json
 * "M"
 * ```
 */
export type Gender = t.TypeOf<typeof genderType>;

export const deserializeGender: Deserializer<Gender> = (input: string) => {
  if ((genderType.keys as any)[input]) {
    return { value: input as Gender };
  }

  return { errors: [`${input} is not a valid Gender`] };
};

export const serializeGender: Serializer<Gender> = (input) => ({
  value: input,
});

export const pokemonDetailsType = t.intersection([
  t.type({
    species: t.string,
    shiny: t.boolean,
    level: t.number,
  }),
  t.partial({
    gender: genderType,
    teraType: t.string,
  }),
]);

/**
 * A Pokémon's attributes.
 *
 * Serialized example: `Pikachu, L99, M, shiny, tera:Fairy`
 *
 * Deserialized example:
 * ```json
 * {
 *   "species": "Pikachu",
 *   "level": 99,
 *   "gender": "M",
 *   "shiny": true,
 *   "teraType": "Fairy"
 * }
 * ```
 *
 * @member species The species of the Pokémon
 * @member level The level of the Pokémon
 * @member level The gender of the Pokémon
 * @member shiny The shininess of the Pokémon
 * @member teraType The tera type of the Pokémon
 */
export type PokemonDetails = t.TypeOf<typeof pokemonDetailsType>;

export const deserializePokemonDetails: Deserializer<PokemonDetails> = (input: string) => {
  const [species, ...flags] = input.split(', ').map((splitInput) => splitInput);

  const partialPokemonDetails: PokemonDetails = {
    species,
    shiny: false,
    level: 100,
  };

  const errors: string[] = [];

  flags.forEach((flag) => {
    if (flag === 'shiny') {
      partialPokemonDetails.shiny = true;
    } else if (flag.startsWith('L')) {
      const level = +flag.substr(1);

      if (Number.isNaN(level)) {
        errors.push(`${level} is not a number`);
      }

      partialPokemonDetails.level = level;
    } else if (flag === 'M' || flag === 'F') {
      partialPokemonDetails.gender = flag;
    } else if (flag.startsWith('tera:')) {
      partialPokemonDetails.teraType = flag.substring(5);
    }
  });

  if (errors.length) {
    return { errors };
  }

  return {
    value: partialPokemonDetails,
  };
};

export const serializePokemonDetails: Serializer<PokemonDetails> = (input) => {
  const levelFlag = input.level === 100 ? '' : `, L${input.level}`;
  const genderFlag = input.gender ? `, ${input.gender}` : '';
  const shinyFlag = input.shiny ? ', shiny' : '';
  const teraFlag = input.teraType ? `, tera:${input.teraType}` : '';

  return {
    value: `${input.species}${levelFlag}${genderFlag}${shinyFlag}${teraFlag}`,
  };
};

export const pokemonType = t.type({
  position: positionType,
  name: t.string,
});

/**
 * A Pokémon and its position in battle.
 *
 * Serialized example: `p1a: Pikachu`
 *
 * Deserialized example:
 * ```json
 * {
 *   "name": "Pikachu",
 *   "position": {
 *     "player": "p1",
 *     "subPosition": "a"
 *   }
 * }
 * ```
 *
 * @member name The name of the Pokémon
 * @member position The position of the Pokémon
 */
export type Pokemon = t.TypeOf<typeof pokemonType>;

export const deserializePokemon: Deserializer<Pokemon> = (input: string) => {
  const [positionInput, ...rest] = input.split(': ');
  const position = deserializePosition(positionInput);

  if ('errors' in position) {
    return { errors: position.errors };
  }

  return { value: { position: position.value, name: rest.join(': ') } };
};

export const serializePokemon: Serializer<Pokemon> = (input) => {
  const positionResult = serializePosition(input.position);

  if ('value' in positionResult) {
    return { value: `${positionResult.value}: ${input.name}` };
  }

  return { errors: positionResult.errors };
};

export const gameTypeType = t.keyof({
  singles: true,
  doubles: true,
  triples: true,
  multi: true,
  'free-for-all': true,
  freeforall: true,
});

/**
 * A battle game type.
 *
 * Serialized example: `singles`
 *
 * Deserialized example:
 * ```json
 * "singles"
 * ```
 */
export type GameType = t.TypeOf<typeof gameTypeType>;

export const deserializeGameType: Deserializer<GameType> = (input: string) => {
  if ((gameTypeType.keys as any)[input]) {
    return { value: input as GameType };
  }

  return { errors: [`${input} is not a valid GameType`] };
};

export const serializeGameType: Serializer<GameType> = (input) => ({
  value: input,
});

const hpColorType = t.union([t.literal('yellow'), t.literal('green')]);

/**
 * The HP of a Pokémon represented as a fraction.
 *
 * Serialized example: `69/420`
 *
 * Deserialized example:
 * ```json
 * {
 *   "numerator": "69",
 *   "denominator": "420"
 * }
 * ```
 *
 * @member numerator The numerator of the fractional HP
 * @member denominator The denominator of the fractional HP
 * @member color The HP bar color
 */
export const hpType = t.intersection([
  t.type({
    numerator: t.number,
  }),
  t.partial({
    denominator: t.number,
    color: hpColorType,
  }),
]);
export type Hp = t.TypeOf<typeof hpType>;

export const deserializeHp: Deserializer<Hp> = (input: string) => {
  const [numeratorInput, denominatorInput] = input.split('/');

  const numerator = +numeratorInput;
  const hp: Hp = { numerator };

  if (denominatorInput) {
    const lastCharacter = denominatorInput.slice(-1);
    hp.denominator = +denominatorInput;

    if (['y', 'g'].includes(lastCharacter)) {
      hp.denominator = +denominatorInput.slice(0, -1);
      hp.color = 'green';

      if (lastCharacter === 'y') {
        hp.color = 'yellow';
      }
    }
  }

  if (Number.isNaN(hp.numerator)) {
    const errors = [`Numerator ${hp.numerator} is not a number`];

    if (hp.denominator !== undefined && Number.isNaN(hp.denominator)) {
      errors.push(`Denominator ${hp.denominator} is not a number`);
    }

    return { errors };
  }

  return { value: hp };
};

export const serializeHp: Serializer<Hp> = (input) => {
  const denominatorText = input.denominator ? `/${input.denominator}` : '';
  let colorText = '';
  if (input.color === 'green') {
    colorText = 'g';
  } else if (input.color === 'yellow') {
    colorText = 'y';
  }

  return { value: `${input.numerator}${denominatorText}${colorText}` };
};

export const statusType = t.keyof({
  brn: true,
  par: true,
  slp: true,
  frz: true,
  psn: true,
  tox: true,
  fnt: true,
});

/**
 * The status condition of a Pokémon.
 *
 * Serialized example: `brn`
 *
 * Deserialized example:
 * ```json
 * "brn"
 * ```
 */
export type Status = t.TypeOf<typeof statusType>;

export const deserializeStatus: Deserializer<Status> = (input: string) => {
  if ((statusType.keys as any)[input]) {
    return { value: input as Status };
  }

  return { errors: [`${input} is not a valid Status`] };
};

export const serializeStatus: Serializer<Status> = (input) => ({
  value: input,
});

export const hpWithStatusType = t.intersection([
  t.type({
    hp: hpType,
  }),
  t.partial({
    status: statusType,
  }),
]);

export type HpWithStatus = t.TypeOf<typeof hpWithStatusType>;

export const deserializeHpWithStatus: Deserializer<HpWithStatus> = (input: string) => {
  const [hpInput, statusInput] = input.split(/\s+/);
  const hp = deserializeHp(hpInput);
  const status = createOptionalDeserializer(deserializeStatus)(statusInput);

  if ('errors' in hp || 'errors' in status) {
    return { errors: coalesceErrors([hp, status]) };
  }

  return { value: { hp: hp.value, status: status.value } };
};

export const serializeHpWithStatus: Serializer<HpWithStatus> = (input) => {
  const hp = serializeHp(input.hp);

  if ('errors' in hp) {
    return hp;
  }

  const statusText = input.status ? ` ${input.status}` : '';
  return { value: `${hp.value}${statusText}` };
};

export const statType = t.keyof({
  hp: true,
  atk: true,
  def: true,
  spa: true,
  spd: true,
  spe: true,
  accuracy: true,
  evasion: true,
  spc: true,
});

/**
 * The name of a Pokémon's stat.
 *
 * Serialized example: `def`
 *
 * Deserialized example:
 * ```json
 * "def"
 * ```
 */
export type Stat = t.TypeOf<typeof statType>;

export const deserializeStat: Deserializer<Stat> = (input: string) => {
  if ((statType.keys as any)[input]) {
    return { value: input as Stat };
  }

  return { errors: [`${input} is not a valid Stat`] };
};

export const serializeStat: Serializer<Stat> = (input) => ({
  value: input,
});

export const sideType = t.type({
  player: playerType,
  playerName: t.string,
});

/**
 * A side of a battle.
 *
 * Serialized example: `"p1: zarel"`
 *
 * Deserialized example:
 * ```json
 * {
 *   "player": "p1",
 *   "playerName": "zarel"
 * }
 * ```
 *
 * @member player The player
 * @member playerName The username of the player
 */
export type Side = t.TypeOf<typeof sideType>;

export const deserializeSide: Deserializer<Side> = (input: string) => {
  const [playerInput, ...rest] = input.split(': ').map((splitInput) => splitInput);
  const player = deserializePlayer(playerInput);

  if ('errors' in player) {
    return { errors: player.errors };
  }

  return { value: { player: player.value, playerName: rest.join(':') } };
};

export const serializeSide: Serializer<Side> = (input) => ({
  value: `${input.player}: ${input.playerName}`,
});

export const statsTableExceptHp = t.type({
  atk: t.number,
  def: t.number,
  spa: t.number,
  spd: t.number,
  spe: t.number,
});

// TODO: Document this
export type StatsTableExceptHp = t.TypeOf<typeof statsTableExceptHp>;

export const statsTableType = t.intersection([
  statsTableExceptHp,
  t.type({
    hp: t.number,
  }),
]);

// TODO: Document this
export type StatsTable = t.TypeOf<typeof statsTableType>;

export const pokemonSetType = t.intersection([
  t.type({
    name: t.string,
    species: t.string,
    item: t.string,
    ability: t.string,
    moves: t.array(t.string),
    nature: t.string,
    gender: t.string,
    evs: statsTableType,
    ivs: statsTableType,
    level: t.number,
  }),
  t.partial({
    shiny: t.boolean,
    happiness: t.number,
    pokeball: t.string,
    hpType: t.string,
    dynamaxLevel: t.number,
    gigantamax: t.boolean,
    teraType: t.string,
  }),
]);

// TODO: Document this
export type PokemonSet = t.TypeOf<typeof pokemonSetType>;

const packText = (text: string) => text.replace(/[^A-Za-z0-9]+/g, '');

const convertIvText = (text: string) => (text === '' ? 31 : +text || 0);

const getIvText = (iv?: number) => (iv === 31 || iv === undefined ? '' : iv.toString());

const unpackText = (text: string) => text
  .replace(/([0-9]+)/g, ' $1 ')
  .replace(/([A-Z])/g, ' $1')
  .replace(/[ ][ ]/g, ' ')
  .trim();

const getMissingPokemonSetArgsErrors = () => [
  'Name is missing in PokemonSet',
  'Species is missing in PokemonSet',
  'Item is missing in PokemonSet',
  'Ability is missing in PokemonSet',
  'Moves are missing in PokemonSet',
  'Nature is missing in PokemonSet',
  'EVs are missing in PokemonSet',
  'Gender is missing in PokemonSet',
  'IVs are missing in PokemonSet',
  'Shiny value is missing in PokemonSet',
  'Level is missing in PokemonSet',
  'Misc flags are missing in PokemonSet',
];

export const deserializePokemonSet: Deserializer<PokemonSet> = (input) => {
  const set: Partial<PokemonSet> = {
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
    },
    ivs: {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31,
    },
  };

  const splitInput = input.split('|');
  if (splitInput.length < 12) {
    return {
      errors: getMissingPokemonSetArgsErrors().slice(splitInput.length, -(12 - splitInput.length)),
    };
  }

  const [
    nameText,
    speciesText,
    itemText,
    abilityText,
    movesText,
    natureText,
    evsText,
    genderText,
    ivsText,
    shinyText,
    levelText,
    miscText,
  ] = splitInput;

  set.name = nameText;
  set.species = speciesText ? unpackText(speciesText) : set.name;
  set.item = unpackText(itemText);
  set.ability = unpackText(abilityText);
  set.moves = movesText
    .split(',')
    .map((move) => unpackText(move));
  set.nature = unpackText(natureText);
  if (evsText) {
    const evs = evsText.split(',');
    set.evs = {
      hp: +evs[0] || 0,
      atk: +evs[1] || 0,
      def: +evs[2] || 0,
      spa: +evs[3] || 0,
      spd: +evs[4] || 0,
      spe: +evs[5] || 0,
    };
  }
  set.gender = genderText;
  if (ivsText) {
    const ivs = ivsText.split(',');
    set.ivs = {
      hp: convertIvText(ivs[0]),
      atk: convertIvText(ivs[1]),
      def: convertIvText(ivs[2]),
      spa: convertIvText(ivs[3]),
      spd: convertIvText(ivs[4]),
      spe: convertIvText(ivs[5]),
    };
  }
  if (shinyText) {
    set.shiny = true;
  }
  if (levelText) {
    set.level = +levelText;
  }
  if (miscText) {
    const [
      happinessText,
      hpTypeText,
      pokeballText,
      gigantamaxText,
      dynamaxLevelText,
      teraTypeText,
    ] = miscText.split(',');

    set.happiness = happinessText ? +happinessText : 255;
    set.hpType = hpTypeText || '';
    set.pokeball = unpackText(pokeballText || '');
    set.gigantamax = !!gigantamaxText;
    set.dynamaxLevel = dynamaxLevelText ? +dynamaxLevelText : 10;
    set.teraType = teraTypeText;
  }

  return { value: set as PokemonSet };
};

export const serializePokemonSet: Serializer<PokemonSet> = (input) => {
  const result: string[] = [];

  result.push(input.name || input.species);
  const id = packText(input.species || input.name);
  result.push(packText(input.name || input.species) === id ? '' : id);
  result.push(packText(input.item));
  result.push(packText(input.ability));
  result.push(input.moves.map(packText).join(','));
  result.push(packText(input.nature));
  const evs = [
    input.evs.hp || '',
    input.evs.atk || '',
    input.evs.def || '',
    input.evs.spa || '',
    input.evs.spd || '',
    input.evs.spe || '',
  ];
  const evsText = evs.join(',');
  result.push(evsText === ',,,,,' ? '' : evsText);
  result.push(input.gender);
  const ivs = [
    getIvText(input.ivs.hp),
    getIvText(input.ivs.atk),
    getIvText(input.ivs.def),
    getIvText(input.ivs.spa),
    getIvText(input.ivs.spd),
    getIvText(input.ivs.spe),
  ];
  const ivsText = ivs.join(',');
  result.push(ivsText === ',,,,,' ? '' : ivsText);
  result.push(input.shiny ? 'S' : '');
  result.push(input.level && input.level !== 100 ? input.level.toString() : '');

  return { value: result.join('|') };
};
