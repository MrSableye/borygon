import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|deinit
export const deinitializeRoomEventType = t.type({});
export type DeinitializeRoomEvent = t.TypeOf<typeof deinitializeRoomEventType>;
export const parseDeinitializeRoomEvent: ArgsParser<DeinitializeRoomEvent> = () => ({ value: [{}, {}] });
