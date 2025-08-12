export interface WeatherData {}
export interface WeatherCurrent {
  time: string; // время замера
  interval: number; // интервал обновления данных в секундах
  temperature_2m: number; // температура воздуха
  relative_humidity_2m: number; // влажность (%)
  apparent_temperature: number; // ощущаемая температура
  is_day: 0 | 1; // день или ночь (0 — ночь, 1 — день)
  precipitation: number; // суммарные осадки (мм)
  rain: number; // дождь (мм)
  showers: number; // ливни (мм)
  snowfall: number; // снег (мм)
  wind_gusts_10m: number; // порывы ветра (км/ч или м/с в зависимости от API)
  wind_direction_10m: number; // направление ветра (градусы)
  wind_speed_10m: number; // скорость ветра (м/с)
  weather_code: number; // код погоды Open-Meteo
  cloud_cover: number; // облачность (%)
  pressure_msl: number; // давление на уровне моря (гПа)
  surface_pressure: number; // давление на поверхности (гПа)
}
