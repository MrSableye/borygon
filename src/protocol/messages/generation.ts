import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeNumber,
  KeySchema,
  serializeNumber,
} from '../parser';

export const generationMessageType = t.type({
  generation: t.number,
});

/**
 * A message that is sent when a battle's generation is declared.
 *
 * Serialized example: `|gen|8`
 *
 * Deserialized example:
 * ```json
 * {
 *   "generation": 8
 * }
 * ```
 *
 * @member generation The generation
 */
export type GenerationMessage = t.TypeOf<typeof generationMessageType>;

export const generationMessageSchema: KeySchema<GenerationMessage> = [
  ['generation', deserializeNumber, serializeNumber],
];

export const deserializeGenerationMessage = createSchemaDeserializer(
  generationMessageType,
  generationMessageSchema,
);
export const serializeGenerationMessage = createSchemaSerializer(
  generationMessageType,
  generationMessageSchema,
);
