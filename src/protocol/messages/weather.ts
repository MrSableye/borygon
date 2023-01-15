import * as t from 'io-ts';
import {
  createSchemaDeserializer,
  createSchemaSerializer,
  deserializeString,
  KeySchema,
  serializeString,
} from '../parser';

export const weatherMessageType = t.type({
  weather: t.string,
});

/**
 * A message that is sent when a battle's weather is updated.
 *
 * Serialized example: `|-weather|hail`
 *
 * Deserialized example:
 * ```json
 * {
 *   "weather": "hail"
 * }
 * ```
 *
 * @member weather The weather
 */
export type WeatherMessage = t.TypeOf<typeof weatherMessageType>;

export const weatherMessageSchema: KeySchema<WeatherMessage> = [
  ['weather', deserializeString, serializeString],
];

export const deserializeWeatherMessage = createSchemaDeserializer(
  weatherMessageType,
  weatherMessageSchema,
);
export const serializeWeatherMessage = createSchemaSerializer(
  weatherMessageType,
  weatherMessageSchema,
);
