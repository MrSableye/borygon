import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
  serializeJson,
} from '../parser';

const updateSearchType = t.type({
  searching: t.array(t.string),
  games: t.union([t.record(t.string, t.string), t.null]),
});

export const updateSearchMessageType = t.type({
  search: updateSearchType,
});

/* eslint-disable max-len */
/**
 * A message that is sent when a user's searches are updated.
 *
 * Serialized example: `|updatesearch|{"searching":["gen9ou"],games:{"battle-gen9randombattle-1754754666":"[Gen 9] Random Battle*"}}`
 *
 * Deserialized example:
 * ```json
 * {
 *   "searching": ["gen9ou"],
 *   "games": {
 *     "battle-gen9randombattle-1754754666":"[Gen 9] Random Battle*"
 *   }
 * }
 * ```
 *
 * @member search The updated search JSON
 */
export type UpdateSearchMessage = t.TypeOf<typeof updateSearchMessageType>;
/* eslint-enable max-len */

export const updateSearchMessageSchema: KeySchema<UpdateSearchMessage> = [
  ['search', createJsonDeserializer(updateSearchType), serializeJson],
];

export const deserializeUpdateSearchMessage = createSchemaDeserializer(
  updateSearchMessageType,
  updateSearchMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeUpdateSearchMessage = createSchemaSerializer(
  updateSearchMessageType,
  updateSearchMessageSchema,
);
