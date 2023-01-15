import * as t from 'io-ts';
import {
  createOptionalDeserializer,
  createOptionalSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const endTeamPreviewMessageType = t.partial({
  teamSize: t.number,
});

/**
 * A message that is sent when team preview is over.
 *
 * Serialized example: `|teampreview|6`
 *
 * Deserialized example:
 * ```json
 * {
 *   "teamSize": 6
 * }
 * ```
 *
 * @member teamSize The number of Pokémon to select in team preview
 */
export type EndTeamPreviewMessage = t.TypeOf<typeof endTeamPreviewMessageType>;

export const endTeamPreviewMessageSchema: KeySchema<EndTeamPreviewMessage> = [
  ['teamSize', createOptionalDeserializer(deserializeNumber), createOptionalSerializer(serializeNumber)],
];

export const deserializeEndTeamPreviewMessage = createSchemaDeserializer(
  endTeamPreviewMessageType,
  endTeamPreviewMessageSchema,
);
export const serializeEndTeamPreviewMessage = createSchemaSerializer(
  endTeamPreviewMessageType,
  endTeamPreviewMessageSchema,
  { omitTrailingUndefinedParts: true },
);
