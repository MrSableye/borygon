import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseRoomType,
  roomTypeType,
} from './types';

// `|init|ROOMTYPE
export const initializeRoomEventType = t.type({
  roomType: roomTypeType,
});
export type InitializeRoomEvent = t.TypeOf<typeof initializeRoomEventType>;
export const initializeRoomEventSchema: KeySchema<InitializeRoomEvent> = [
  ['roomType', parseRoomType],
];
export const parseInitializeRoomEvent = createSchemaParser(
  initializeRoomEventType,
  initializeRoomEventSchema,
);
