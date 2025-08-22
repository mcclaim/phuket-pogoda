import { weatherIconUrl } from "./image.helper";

export function getIconFromWeatherCode(
  weatherCode: number,
  isDay = true
): string {
  switch (weatherCode) {
    case 0:
      return isDay ? "clear-day" : "clear-night"; // Ясно
    case 1:
      return isDay ? "overcast-day" : "overcast-night"; // В основном ясно
    case 2:
      return isDay ? "partly-cloudy-day" : "partly-cloudy-night"; // Переменная облачность
    case 3:
      return "cloudy"; // Пасмурно
    case 45:
    case 48:
      return isDay ? "partly-cloudy-day-fog" : "partly-cloudy-night-fog"; // Туман / изморось
    case 51:
    case 53:
    case 55:
      return isDay
        ? "partly-cloudy-day-drizzle"
        : "partly-cloudy-night-drizzle"; // Лёгкая морось
    case 61:
    case 63:
    case 65:
      return isDay ? "partly-cloudy-day-rain" : "partly-cloudy-night-rain"; // Дождь
    case 71:
    case 73:
    case 75:
      return isDay ? "partly-cloudy-day-snow" : "partly-cloudy-night-snow"; // Снег
    case 80:
    case 81:
    case 82:
      return "rain"; // Ливень
    case 95:
      return isDay ? "thunderstorms-day" : "thunderstorms-night"; // Гроза
    case 96:
    case 99:
      return "thunderstorms-rain"; // Гроза с градом
    default:
      return isDay ? "dust-day" : "dust-night"; // Неизвестный код
  }
}

export function getWeatherIconWithDay(
  weatherCode: number,
  isDay = true
): string {
  const icon = getIconFromWeatherCode(weatherCode, isDay);
  return weatherIconUrl(icon);
}
