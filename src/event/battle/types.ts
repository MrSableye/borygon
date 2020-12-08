import * as t from 'io-ts';
import {
  coalesceErrors,
  createOptionalParser,
  Parser,
} from '../parser';

export const playerType = t.keyof({
  p1: true,
  p2: true,
  p3: true,
  p4: true,
});
export type Player = t.TypeOf<typeof playerType>;
export const parsePlayer: Parser<Player> = (input: string) => {
  if ((playerType.keys as any)[input]) {
    return { value: input as Player };
  }

  return { errors: [`${input} is not a valid Player`] };
};

export const subPositionType = t.keyof({
  a: true,
  b: true,
  c: true,
});
export type SubPosition = t.TypeOf<typeof subPositionType>;
export const parseSubPosition: Parser<SubPosition> = (input: string) => {
  if ((subPositionType.keys as any)[input]) {
    return { value: input as SubPosition };
  }

  return { errors: [`${input} is not a valid SubPosition`] };
};

export const positionType = t.intersection([
  t.type({ player: playerType }),
  t.partial({ subPosition: subPositionType }),
]);
export type Position = t.TypeOf<typeof positionType>;
export const parsePosition: Parser<Position> = (input: string) => {
  const player = parsePlayer(input.substr(0, 2));
  const subPosition = parseSubPosition(input.substr(2, 1));

  if ('errors' in player || 'errors' in subPosition) {
    return { errors: coalesceErrors([player, subPosition]) };
  }

  return { value: { player: player.value, subPosition: subPosition.value } };
};

export const genderType = t.keyof({
  M: true,
  F: true,
});
export type Gender = t.TypeOf<typeof genderType>;
export const parseGender: Parser<Gender> = (input: string) => {
  if ((genderType.keys as any)[input]) {
    return { value: input as Gender };
  }

  return { errors: [`${input} is not a valid Gender`] };
};

export const pokemonDetailsType = t.intersection([
  t.type({
    species: t.string,
    shiny: t.boolean,
    level: t.number,
  }),
  t.partial({
    gender: genderType,
  }),
]);
export type PokemonDetails = t.TypeOf<typeof pokemonDetailsType>;
export const parsePokemonDetails: Parser<PokemonDetails> = (input: string) => {
  const [species, ...flags] = input.split(',').map((splitInput) => splitInput.trim());

  const partialPokemonDetails: PokemonDetails = {
    species,
    shiny: false,
    level: 100,
  };

  flags.forEach((flag) => {
    if (flag === 'shiny') {
      partialPokemonDetails.shiny = true;
    } else if (flag.startsWith('L')) {
      const level = +flag.substr(1);

      if (!Number.isNaN(level)) {
        // TODO: Throw error
      } else {
        partialPokemonDetails.level = level;
      }
    } else if (flag === 'M' || flag === 'F') {
      partialPokemonDetails.gender = flag;
    }
  });

  return ({
    value: partialPokemonDetails,
  });
};
// interface PokemonDetails {
//   species: string;
//   shiny: boolean;
//   gender?: Gender;
//   level: number;
// }
// - `DETAILS` is a comma-separated list of all information about a pokemon
//   visible on the battle screen: species, shininess, gender, and level. So it
//   starts with `SPECIES`, adding `, shiny` if it's shiny, `, M` if it's male,
//   `, F` if it's female, `, L##` if it's not level 100.
export const pokemonType = t.type({
  position: positionType,
  name: t.string,
});
export type Pokemon = t.TypeOf<typeof pokemonType>;
export const parsePokemon: Parser<Pokemon> = (input: string) => {
  const [positionInput, ...rest] = input.split(':').map((splitInput) => splitInput.trim());
  const position = parsePosition(positionInput);

  if ('errors' in position) {
    return { errors: position.errors };
  }

  return { value: { position: position.value, name: rest.join(':') } };
};

export const gameTypeType = t.keyof({
  singles: true,
  doubles: true,
  triples: true,
  multi: true,
  'free-for-all': true,
});
export type GameType = t.TypeOf<typeof gameTypeType>;
export const parseGameType: Parser<GameType> = (input: string) => {
  if ((gameTypeType.keys as any)[input]) {
    return { value: input as GameType };
  }

  return { errors: [`${input} is not a valid GameType`] };
};

// `|request|REQUEST`
// > Gives a JSON object containing a request for a choice (to move or
// > switch). To assist in your decision, `REQUEST.active` has information
// > about your active Pokémon, and `REQUEST.side` has information about your
// > your team as a whole. `REQUEST.rqid` is an optional request ID (see
// > "Sending decisions" for details).
// TODO

export const hpType = t.intersection([
  t.type({
    numerator: t.number,
  }),
  t.partial({
    denominator: t.number,
  }),
]);
export type Hp = t.TypeOf<typeof hpType>;
export const parseHp: Parser<Hp> = (input: string) => {
  const [numeratorInput, denominatorInput] = input.split('/').map((splitInput) => splitInput.trim());
  const numerator = +numeratorInput;
  const denominator = +denominatorInput;

  if (Number.isNaN(numerator)) {
    const errors = [`Numerator ${numerator} is not a number`];

    if (Number.isNaN(denominator)) {
      errors.push(`Denominator ${denominator} is not a number`);
    }

    return { errors };
  }

  return { value: { numerator, denominator } };
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
export type Status = t.TypeOf<typeof statusType>;
export const parseStatus: Parser<Status> = (input: string) => {
  if ((statusType.keys as any)[input]) {
    return { value: input as Status };
  }

  return { errors: [`${input} is not a valid Status`] };
};

export const parseHpAndStatus: Parser<{hp?: Hp, status?: Status}> = (input: string) => {
  if (!input) {
    return { value: {} };
  }

  const [hpInput, statusInput] = input.split(/\s+/);
  const hp = createOptionalParser(parseHp)(hpInput);
  const status = createOptionalParser(parseStatus)(statusInput);

  if ('errors' in hp || 'errors' in status) {
    return { errors: coalesceErrors([hp, status]) };
  }

  return { value: { hp: hp.value, status: status.value } };
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
export type Stat = t.TypeOf<typeof statType>;
export const parseStat: Parser<Stat> = (input: string) => {
  if ((statType.keys as any)[input]) {
    return { value: input as Stat };
  }

  return { errors: [`${input} is not a valid Stat`] };
};

export const weatherType = t.keyof({
  sandstorm: true,
  sunnyday: true,
  raindance: true,
  hail: true,
  desolateland: true,
  primordialsea: true,
  deltastream: true,
  none: true,
});
export type Weather = t.TypeOf<typeof weatherType>;
export const parseWeather: Parser<Weather> = (input: string) => {
  if ((weatherType.keys as any)[input.toLowerCase()]) {
    return { value: input.toLowerCase() as Weather };
  }

  return { errors: [`${input} is not a valid Weather`] };
};

export const sideType = t.type({
  player: playerType,
  playerName: t.string,
});
export type Side = t.TypeOf<typeof sideType>;
export const parseSide: Parser<Side> = (input: string) => {
  const [playerInput, ...rest] = input.split(':').map((splitInput) => splitInput.trim());
  const player = parsePlayer(playerInput);

  if ('errors' in player) {
    return { errors: player.errors };
  }

  return { value: { player: player.value, playerName: rest.join(':') } };
};
