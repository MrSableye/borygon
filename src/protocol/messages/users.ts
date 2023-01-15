import * as t from 'io-ts';
import {
  ArgsDeserializer,
  ArgsSerializer,
  coalesceErrors,
  deserializeNumber,
} from '../parser';
import {
  deserializeUser, serializeUser, User, userType,
} from './types';

export const usersMessageType = t.type({
  count: t.number,
  users: t.array(userType),
});

/**
 * A message that is sent when a rooms users are announced.
 *
 * Serialized example: `|users|1,~zarel`
 *
 * Deserialized example:
 * ```json
 * {
 *   "count": 1,
 *   "users": [{
 *     "group": "~",
 *     "username": "zarel",
 *     "isAway": false,
 *     "status": ""
 *   }]
 * }
 * ```
 *
 * @member groups The custom groups
 */
export type UsersMessage = t.TypeOf<typeof usersMessageType>;

export const deserializeUsersMessage: ArgsDeserializer<UsersMessage> = (input: string[]) => {
  const [countText, ...usersText] = input[0].split(',');

  const count = deserializeNumber(countText);
  const users = usersText.map((userText) => deserializeUser(userText));

  if ('errors' in count || users.some((user) => 'errors' in user)) {
    return { errors: coalesceErrors([count, ...users]) };
  }

  return {
    value: [{
      count: count.value,
      users: users.map((user) => user as { value: User }).map((user) => user.value),
    }, {}],
  };
};
export const serializeUsersMessage: ArgsSerializer<UsersMessage> = (input) => {
  const users = input.users.map(serializeUser);

  if (users.some((user) => 'errors' in user)) {
    return { errors: coalesceErrors([...users]) };
  }

  return { value: [[input.count, users.map((user) => (user as { value: string }).value)].join(',')] };
};
