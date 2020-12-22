import * as t from 'io-ts';
import {
  createSchemaParser,
  KeySchema,
} from '../parser';
import {
  parseWeather,
  weatherType,
} from './types';

// `|-weather|WEATHER`
// > Indicates the weather that is currently in effect. If `|[upkeep]` is present,
// > it means that `WEATHER` was active previously and is still in effect that
// > turn. Otherwise, it means that the weather has changed due to a move or ability,
// > or has expired, in which case `WEATHER` will be `none`.
// |-weather|Hail|[from] ability: Snow Warning|[of] p2a: Abomasnow
// |-weather|Hail|[upkeep]
// |-weather|none
export const weatherEventType = t.type({
  weather: weatherType,
});
export type WeatherEvent = t.TypeOf<typeof weatherEventType>;
export const weatherEventSchema: KeySchema<WeatherEvent> = [
  ['weather', parseWeather],
];
export const parseWeatherEvent = createSchemaParser(weatherEventType, weatherEventSchema);
