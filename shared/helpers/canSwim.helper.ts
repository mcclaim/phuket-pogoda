import type { WeatherCurrent } from "../types/WeatherData.type";

export function canSwim(weather: WeatherCurrent): string {
  const badWeatherCodes = [
    45,
    48, // туман
    51,
    53,
    55,
    56,
    57, // морось
    61,
    63,
    65,
    66,
    67, // дождь
    71,
    73,
    75,
    77, // снег
    80,
    81,
    82, // ливни
    95,
    96,
    99, // гроза
  ];

  if (badWeatherCodes.includes(weather.weather_code)) {
    return "Купаться не рекомендуется — плохие погодные условия.";
  }

  if (weather.temperature_2m < 26 || weather.apparent_temperature < 25) {
    return "Купаться не рекомендуется — прохладно.";
  }

  if (weather.wind_speed_10m > 6) {
    return "Купаться не рекомендуется — сильный ветер.";
  }

  if (weather.precipitation > 0.5) {
    return "Купаться не рекомендуется — есть осадки.";
  }

  if (weather.cloud_cover > 90 && weather.is_day === 1) {
    return "Можно купаться, но очень облачно.";
  }

  return "Погода отличная — можно купаться!";
}
