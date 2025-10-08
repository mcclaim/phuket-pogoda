<script setup lang="ts">
import { getThirtyDayWeather } from "#shared/utils/weatherCalcs.helper";

const { data: forecast, pending } = await useForecastWeather();

useSeoHead({
  title:
    "Погода в Пхукете на месяц, прогноз погоды Пхукет на 30 дней, прогноз погоды Пхукет на тридцать дней, Пхукет, Таиланд",
  desc: "Погода в Пхукете на месяц, обзорный прогноз погоды на 30 дней для островов Пхукета, Пхукет, Таиланд.",
  keywords:
    "погода в Пхукете на месяц, погода в Пхукете на 30 дней, погода Пхукет месяц, погода Пхукет 30 дней, прогноз погоды в Пхукете на месяц,прогноз погоды в Пхукете на 30 дней, прогноз погоды Пхукет месяц, прогноз погоды Пхукет 30 дней",
  date: "на месяц",
  urlPath: "/na-mesyats",
});
</script>

<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Погода в Пхукете на месяц
    </h1>

    <Loader v-if="pending && !forecast" />

    <div
      v-else-if="forecast?.daily"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <WeatherCardDaily
        v-for="(time, index) in getThirtyDayWeather(forecast.daily).time"
        :key="index"
        is-hourly
        :weather-data="{
          time,
          temperature_2m_max: forecast.daily.temperature_2m_max[index],
          temperature_2m_min: forecast.daily.temperature_2m_min[index],
          apparent_temperature_max:
            forecast.daily.apparent_temperature_max[index],
          apparent_temperature_min:
            forecast.daily.apparent_temperature_min[index],
          uv_index_max: forecast.daily.uv_index_max[index],
          precipitation_sum: forecast.daily.precipitation_sum[index],
          wind_speed_10m_max: forecast.daily.wind_speed_10m_max[index],
          weather_code: forecast.daily.weather_code[index],
          daylight_duration: forecast.daily.daylight_duration[index],
          sunrise: forecast.daily.sunrise[index],
          sunset: forecast.daily.sunset[index],
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
