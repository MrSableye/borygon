import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|clearpoke`
// > Marks the start of Team Preview
//     |clearpoke
export const startTeamPreviewEventType = t.type({});
export type StartTeamPreviewEvent = t.TypeOf<typeof startTeamPreviewEventType>;
export const parseStartTeamPreviewEvent: ArgsParser<StartTeamPreviewEvent> = () => ({
  value: [{}, {}],
});
