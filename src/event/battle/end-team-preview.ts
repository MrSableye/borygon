import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|teampreview
export const endTeamPreviewEventType = t.type({});
export type EndTeamPreviewEvent = t.TypeOf<typeof endTeamPreviewEventType>;
export const parseEndTeamPreviewEvent: ArgsParser<EndTeamPreviewEvent> = () => ({
  value: [{}, {}],
});
