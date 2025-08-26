import type { WeatherHourlyArray } from "../types/WeatherData.type";

// Получаем текущий час и следующие 24
export function getNext24Hours(hours: WeatherHourlyArray) {
  const now = new Date();
  const currentHourIndex = hours.time.findIndex(
    (t: string) => new Date(t).getHours() === now.getHours()
  );
  return hours.time.slice(currentHourIndex, currentHourIndex + 24);
}

export function getTomorrowWeather(hours: WeatherHourlyArray) {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowDateStr = tomorrow.toISOString().split("T")[0];

  const startIndex = hours.time.findIndex((t: string) =>
    t.startsWith(tomorrowDateStr)
  );
  const endIndex = hours.time.findIndex((t: string) =>
    t.startsWith(
      new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    )
  );

  return {
    time: hours.time.slice(startIndex, endIndex),
    temperature_2m: hours.temperature_2m.slice(startIndex, endIndex),
    apparent_temperature: hours.apparent_temperature.slice(
      startIndex,
      endIndex
    ),
    weathercode: hours.weathercode.slice(startIndex, endIndex),
    is_day: hours.is_day.slice(startIndex, endIndex),
    uv_index: hours.uv_index.slice(startIndex, endIndex),
    wind_speed_10m: hours.wind_speed_10m.slice(startIndex, endIndex),
    precipitation: hours.precipitation.slice(startIndex, endIndex),
  };
}
