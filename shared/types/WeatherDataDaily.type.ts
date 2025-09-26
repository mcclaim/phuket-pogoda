export interface WeatherDailyItem {
  time: string; // время замера
  temperature_2m_max: number; // температура воздуха днем
  temperature_2m_min: number; // температура воздуха ночью
  apparent_temperature_max: number; // ощущаемая температура днем
  apparent_temperature_min: number; // ощущаемая температура ночью
  weather_code: number; // код погоды Open-Meteo
  uv_index_max: number; // индекс ультрафиолета
  wind_speed_10m_max: number; // скорость ветра (м/с)
  precipitation_sum: number; // суммарные осадки (мм)
  daylight_duration: number; // дневной свет (сек)
  sunrise: string; // восход солнца (время)
  sunset: string; // закат солнца (время)
}

export interface WeatherDailyArray {
  time: string[]; // время замера
  temperature_2m_max: number[]; // температура воздуха днем
  temperature_2m_min: number[]; // температура воздуха ночью
  apparent_temperature_max: number[]; // ощущаемая температура днем
  apparent_temperature_min: number[]; // ощущаемая температура ночью
  weather_code: number[]; // код погоды Open-Meteo
  uv_index_max: number[]; // индекс ультрафиолета
  wind_speed_10m_max: number[]; // скорость ветра (м/с)
  precipitation_sum: number[]; // суммарные осадки (мм)
  daylight_duration: number[]; // дневной свет (сек)
  sunrise: string[]; // восход солнца (время)
  sunset: string[]; // закат солнца (время)
}
