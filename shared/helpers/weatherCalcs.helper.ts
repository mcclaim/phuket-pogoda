import type { WeatherDailyArray } from "../types/WeatherDataDaily.type";
import type { WeatherHourlyArray } from "../types/WeatherDataHourly.type";

// Получаем текущий час и следующие 24
export function getNext24Hours(hours: WeatherHourlyArray) {
  const now = new Date();
  const currentHourIndex = hours.time.findIndex(
    (t: string) => new Date(t).getHours() === now.getHours()
  );
  return hours.time.slice(currentHourIndex, currentHourIndex + 24);
}

// Получаем погоду на завтра
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

// Получаем погоду на неделю
export function getWeeklyWeather(days: WeatherDailyArray) {
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0];

  const startIndex = days.time.findIndex((t: string) => t >= currentDateStr);
  return {
    time: days.time.slice(startIndex, startIndex + 7),
    temperature_2m_max: days.temperature_2m_max.slice(
      startIndex,
      startIndex + 7
    ),
    temperature_2m_min: days.temperature_2m_min.slice(
      startIndex,
      startIndex + 7
    ),
    weathercode: days.weather_code.slice(startIndex, startIndex + 7),
    uv_index_max: days.uv_index_max.slice(startIndex, startIndex + 7),
    wind_speed_10m_max: days.wind_speed_10m_max.slice(
      startIndex,
      startIndex + 7
    ),
    precipitation_sum: days.precipitation_sum.slice(startIndex, startIndex + 7),
    sunrise: days.sunrise.slice(startIndex, startIndex + 7),
    sunset: days.sunset.slice(startIndex, startIndex + 7),
    daylight_duration: days.daylight_duration.slice(startIndex, startIndex + 7),
  };
}

// Получаем погоду на 10 дней
export function getTenDayWeather(days: WeatherDailyArray) {
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0];

  const startIndex = days.time.findIndex((t: string) => t >= currentDateStr);
  return {
    time: days.time.slice(startIndex, startIndex + 10),
    temperature_2m_max: days.temperature_2m_max.slice(
      startIndex,
      startIndex + 10
    ),
    temperature_2m_min: days.temperature_2m_min.slice(
      startIndex,
      startIndex + 10
    ),
    weathercode: days.weather_code.slice(startIndex, startIndex + 10),
    uv_index_max: days.uv_index_max.slice(startIndex, startIndex + 10),
    wind_speed_10m_max: days.wind_speed_10m_max.slice(
      startIndex,
      startIndex + 10
    ),
    precipitation_sum: days.precipitation_sum.slice(
      startIndex,
      startIndex + 10
    ),
    sunrise: days.sunrise.slice(startIndex, startIndex + 10),
    sunset: days.sunset.slice(startIndex, startIndex + 10),
    daylight_duration: days.daylight_duration.slice(
      startIndex,
      startIndex + 10
    ),
  };
}

// Получаем погоду на 15 дней
export function getFifteenDayWeather(days: WeatherDailyArray) {
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0];

  const startIndex = days.time.findIndex((t: string) => t >= currentDateStr);
  return {
    time: days.time.slice(startIndex, startIndex + 15),
    temperature_2m_max: days.temperature_2m_max.slice(
      startIndex,
      startIndex + 15
    ),
    temperature_2m_min: days.temperature_2m_min.slice(
      startIndex,
      startIndex + 15
    ),
    weathercode: days.weather_code.slice(startIndex, startIndex + 15),
    uv_index_max: days.uv_index_max.slice(startIndex, startIndex + 15),
    wind_speed_10m_max: days.wind_speed_10m_max.slice(
      startIndex,
      startIndex + 15
    ),
    precipitation_sum: days.precipitation_sum.slice(
      startIndex,
      startIndex + 15
    ),
    sunrise: days.sunrise.slice(startIndex, startIndex + 15),
    sunset: days.sunset.slice(startIndex, startIndex + 15),
    daylight_duration: days.daylight_duration.slice(
      startIndex,
      startIndex + 15
    ),
  };
}

// Получаем погоду на 16 дней
export function getThirtyDayWeather(days: WeatherDailyArray) {
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0];

  const startIndex = days.time.findIndex((t: string) => t >= currentDateStr);
  return {
    time: days.time.slice(startIndex, startIndex + 16),
    temperature_2m_max: days.temperature_2m_max.slice(
      startIndex,
      startIndex + 16
    ),
    temperature_2m_min: days.temperature_2m_min.slice(
      startIndex,
      startIndex + 16
    ),
    weathercode: days.weather_code.slice(startIndex, startIndex + 16),
    uv_index_max: days.uv_index_max.slice(startIndex, startIndex + 16),
    wind_speed_10m_max: days.wind_speed_10m_max.slice(
      startIndex,
      startIndex + 16
    ),
    precipitation_sum: days.precipitation_sum.slice(
      startIndex,
      startIndex + 16
    ),
    sunrise: days.sunrise.slice(startIndex, startIndex + 16),
    sunset: days.sunset.slice(startIndex, startIndex + 16),
    daylight_duration: days.daylight_duration.slice(
      startIndex,
      startIndex + 16
    ),
  };
}

// Получаем погоду на 2 выходные на текущую неделю и на следующую неделю (суббота и воскресенье) из массива дней
export function getWeekendWeather(days: WeatherDailyArray) {
  const now = new Date();
  const currentDateStr = now.toISOString().split("T")[0];

  const startIndex = days.time.findIndex((t: string) => t >= currentDateStr);
  const weekends = [];
  for (let i = startIndex; i < days.time.length; i++) {
    const date = new Date(days.time[i]);
    if (date.getDay() === 6 || date.getDay() === 0) {
      weekends.push(i);
    }
    if (weekends.length === 4) break; // Получаем только две ближайшие выходные
  }

  return {
    time: weekends.map((i) => days.time[i]),
    temperature_2m_max: weekends.map((i) => days.temperature_2m_max[i]),
    temperature_2m_min: weekends.map((i) => days.temperature_2m_min[i]),
    weathercode: weekends.map((i) => days.weather_code[i]),
    uv_index_max: weekends.map((i) => days.uv_index_max[i]),
    wind_speed_10m_max: weekends.map((i) => days.wind_speed_10m_max[i]),
    precipitation_sum: weekends.map((i) => days.precipitation_sum[i]),
    sunrise: weekends.map((i) => days.sunrise[i]),
    sunset: weekends.map((i) => days.sunset[i]),
    daylight_duration: weekends.map((i) => days.daylight_duration[i]),
  };
}
