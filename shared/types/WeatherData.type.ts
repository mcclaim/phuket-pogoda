import type { WeatherHourlyItem } from "./WeatherDataHourly.type";

export interface WeatherData {}
export interface WeatherCurrent extends WeatherHourlyItem {
  interval: number; // интервал обновления данных в секундах
  relative_humidity_2m: number; // влажность (%)
  rain: number; // дождь (мм)
  showers: number; // ливни (мм)
  snowfall: number; // снег (мм)
  wind_gusts_10m: number; // порывы ветра (км/ч или м/с в зависимости от API)
  wind_direction_10m: number; // направление ветра (градусы)
  weather_code: number; // код погоды Open-Meteo
  cloud_cover: number; // облачность (%)
  pressure_msl: number; // давление на уровне моря (гПа)
  surface_pressure: number; // давление на поверхности (гПа)
}
