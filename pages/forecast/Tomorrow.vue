<script setup lang="ts">
import { useHead } from "nuxt/app";
import { getTomorrowWeather } from "~/shared/helpers/weatherCalcs.helper";

useHead({
  title:
    "Погода в Пхукете завтра, прогноз погоды Пхукет на завтра, Пхукет, Таиланд",
});

const { getCurrent } = useWeather();
const { current, hourly, pending } = await getCurrent();
</script>

<template>
  <div class="glass p-6">
    <h1
      class="text-xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg"
    >
      Погода в Пхукете на завтра
    </h1>

    <div class="grid grid-cols-3 gap-8 mt-6" v-if="!pending">
      <div
        class="col"
        v-for="(time, index) in getTomorrowWeather(hourly).time"
        :key="index"
      >
        <WeatherCard
          :weatherData="{
      time,
      temperature_2m: hourly.temperature_2m[index],
      apparent_temperature: hourly.apparent_temperature[index],
      weathercode: hourly.weathercode[index],
      is_day: hourly.is_day[index] as 0 | 1,
      uv_index: hourly.uv_index[index],
      wind_speed_10m: hourly.wind_speed_10m[index],
      precipitation: hourly.precipitation[index],
    }"
          card-class="!shadow-none"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
