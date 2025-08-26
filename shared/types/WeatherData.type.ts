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

export interface WeatherHourlyItem {
  time: string; // время замера
  temperature_2m: number; // температура воздуха
  apparent_temperature: number; // ощущаемая температура
  weathercode: number; // код погоды Open-Meteo
  is_day: 0 | 1; // день или ночь (0 — ночь, 1 — день)
  uv_index: number; // индекс ультрафиолета
  wind_speed_10m: number; // скорость ветра (м/с)
  precipitation: number; // суммарные осадки (мм)
}

export interface WeatherHourlyArray {
  time: string[]; // время замера
  temperature_2m: number[]; // температура воздуха
  apparent_temperature: number[]; // ощущаемая температура
  weathercode: number[]; // код погоды Open-Meteo
  is_day: number[]; // день или ночь (0 — ночь, 1 — день)
  uv_index: number[]; // индекс ультрафиолета
  wind_speed_10m: number[]; // скорость ветра (м/с)
  precipitation: number[]; // суммарные осадки (мм)
}
