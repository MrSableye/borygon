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
  const [species, ...flags] = input.split(',').map((splitInput) => splitInput.trim());

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
  const [positionInput, ...rest] = input.split(':');
  const position = deserializePosition(positionInput);

  if ('errors' in position) {
    return { errors: position.errors };
  }

  return { value: { position: position.value, name: rest.join(':').trim() } };
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
  const [playerInput, ...rest] = input.split(':').map((splitInput) => splitInput.trim());
  const player = deserializePlayer(playerInput);

  if ('errors' in player) {
    return { errors: player.errors };
  }

  return { value: { player: player.value, playerName: rest.join(':') } };
};

export const serializeSide: Serializer<Side> = (input) => ({
  value: `${input.player}: ${input.playerName}`,
});
