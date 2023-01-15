import {
  Pokemon,
  PokemonDetails,
  Hp,
  HpWithStatus,
  Position,
  Side,
  User,
  Player,
} from './messages/types';
import { Result, ResultError, ResultValue } from './parser';

interface Sample<T> {
  text: string;
  value: T;
}

export const samplePlayer: Sample<Player> = {
  text: 'p1',
  value: 'p1',
};

export const samplePosition: Sample<Position> = {
  text: 'p1a',
  value: {
    player: samplePlayer.value,
    subPosition: 'a',
  },
};

export const samplePokemon: Sample<Pokemon> = {
  text: 'p1a: Sableye',
  value: {
    name: 'Sableye',
    position: samplePosition.value,
  },
};

export const samplePokemonDetails: Sample<PokemonDetails> = {
  text: 'Sableye, L99, M, shiny, tera:Fairy',
  value: {
    species: 'Sableye',
    level: 99,
    gender: 'M',
    shiny: true,
    teraType: 'Fairy',
  },
};

export const sampleHp: Sample<Hp> = {
  text: '9/24y',
  value: {
    numerator: 9,
    denominator: 24,
    color: 'yellow',
  },
};

export const sampleHpWithStatus: Sample<HpWithStatus> = {
  text: '9/24y tox',
  value: {
    hp: sampleHp.value,
    status: 'tox',
  },
};

export const sampleSide: Sample<Side> = {
  text: 'p1: Mr. Sableye',
  value: {
    player: 'p1',
    playerName: 'Mr. Sableye',
  },
};

export const sampleUser: Sample<User> = {
  text: '~Mr. Sableye@!Sleeping',
  value: {
    group: '~',
    isAway: true,
    username: 'Mr. Sableye',
    status: 'Sleeping',
  },
};

export function assertResultValue <T>(result: Result<T>): asserts result is ResultValue<T> {
  if (!('value' in result)) throw new Error('Result must have value');
}

export function assertResultError <T>(result: Result<T>): asserts result is ResultError {
  if (!('errors' in result)) throw new Error('Result must have errors');
}
