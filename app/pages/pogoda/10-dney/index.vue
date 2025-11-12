<script setup lang="ts">
import WeatherCardDaily from "~/components/WeatherCardDaily.vue";
import Loader from "~/components/Loader.vue";

import { useHead } from "nuxt/app";
import { getTenDayWeather } from "#shared/utils/weatherCalcs.helper";

useHead({
  title:
    "Погода в Пхукете на 10 дней, прогноз погоды Пхукета на десять дней, Пхукет, Таиланд",
});

const { data: forecast, pending } = await useForecastWeather();
</script>

<template>
  <div class="glass p-6 pt-0 sm:pt-6">
    <h1
      class="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-4 md:mb-6 sm:pt-0"
    >
      Погода в Пхукете на 10 дней
    </h1>

    <Loader v-if="pending && !forecast" />

    <div
      v-else-if="forecast?.daily"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <WeatherCardDaily
        v-for="(time, index) in getTenDayWeather(forecast.daily).time"
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
