<script setup lang="ts">
import { getWeekendWeather } from "#shared/utils/weatherCalcs.helper";

const { data: forecast, pending } = await useForecastWeather();

useSeoHead({
  title:
    "Погода в Пхукете выходные, прогноз погоды Пхукет на субботу и воскресенье, Пхукет, Таиланд",
  desc: "Погода в Пхукете на выходные, подробный прогноз погоды на выходные для островов Пхукета, Пхукет, Таиланд.",
  date: "на выходные",
  urlPath: "/na-vyhodnye",
  contentType: "website",
});
</script>

<template>
  <div class="glass p-6 pt-0 sm:pt-6">
    <h1
      class="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-4 md:mb-6 sm:pt-0"
    >
      Погода в Пхукете на выходные
    </h1>

    <Loader v-if="pending && !forecast.daily" />

    <div v-else>
      <h2
        class="text-1xl md:text-2xl lg:text-3xl font-medium text-shadow-lg mb-4"
      >
        Погода на предстоящие выходные
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCardDaily
          v-for="(time, index) in getWeekendWeather(forecast.daily).time.slice(
            0,
            3
          )"
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

      <h2
        class="text-1xl md:text-2xl lg:text-3xl font-medium text-shadow-lg mt-8 mb-4"
      >
        Погода на следующие выходные
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCardDaily
          v-for="(time, index) in getWeekendWeather(forecast.daily).time.slice(
            3,
            6
          )"
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
  </div>
</template>

<style lang="scss" scoped></style>
