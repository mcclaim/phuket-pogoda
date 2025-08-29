<script setup lang="ts">
import WeatherCardDaily from "~/components/WeatherCardDaily.vue";
import Loader from "~/components/Loader.vue";

import { useHead } from "nuxt/app";
import { getFifteenDayWeather } from "~/shared/helpers/weatherCalcs.helper";

useHead({
  title:
    "Погода в Пхукете на 15 дней, прогноз погоды Пхукета на пятнадцать дней, Пхукет, Таиланд",
});

const { getForecast } = useWeather();
const { daily, pending } = await getForecast();
</script>

<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Погода в Пхукете на 15 дней
    </h1>

    <Loader v-if="pending" />

    <div
      v-if="!pending && daily"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <WeatherCardDaily
        v-for="(time, index) in getFifteenDayWeather(daily).time"
        :key="index"
        is-hourly
        :weather-data="{
          time,
          temperature_2m_max: daily.temperature_2m_max[index],
          temperature_2m_min: daily.temperature_2m_min[index],
          apparent_temperature_max: daily.apparent_temperature_max[index],
          apparent_temperature_min: daily.apparent_temperature_min[index],
          uv_index_max: daily.uv_index_max[index],
          precipitation_sum: daily.precipitation_sum[index],
          wind_speed_10m_max: daily.wind_speed_10m_max[index],
          weather_code: daily.weather_code[index],
          daylight_duration: daily.daylight_duration[index],
          sunrise: daily.sunrise[index],
          sunset: daily.sunset[index],
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
