import * as t from 'io-ts';
import {
  Parser,
} from '../parser';

export const roomTypeType = t.keyof({
  chat: true,
  battle: true,
});
export type RoomType = t.TypeOf<typeof roomTypeType>;
export const parseRoomType: Parser<RoomType> = (input: string) => {
  if ((roomTypeType.keys as any)[input]) {
    return { value: input as RoomType };
  }

  return { errors: [`${input} is not a valid RoomType`] };
};

export const roomInitializationErrorTypeType = t.keyof({
  joinfailed: true,
  nonexistent: true,
  rename: true,
  namerequired: true,
});
export type RoomInitializationErrorType = t.TypeOf<typeof roomInitializationErrorTypeType>;
export const parseRoomInitializationErrorType: Parser<RoomInitializationErrorType> = (
  input: string,
) => {
  if ((roomInitializationErrorTypeType.keys as any)[input]) {
    return { value: input as RoomInitializationErrorType };
  }

  return { errors: [`${input} is not a valid RoomInitializationErrorType`] };
};

export const userType = t.type({
  group: t.string,
  username: t.string,
});
export type User = t.TypeOf<typeof userType>;
export const parseUser: Parser<User> = (input: string) => {
  if (!/[A-Za-z0-9]/.test(input.charAt(0))) {
    return {
      value: {
        group: input.charAt(0),
        username: input.slice(1),
      },
    };
  }
  return {
    value: {
      group: ' ',
      username: input,
    },
  };
};
