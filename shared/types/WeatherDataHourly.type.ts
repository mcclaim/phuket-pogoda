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
