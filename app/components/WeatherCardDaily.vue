<script lang="ts" setup>
import {
  formatDate,
  formatOnlyTime,
  formatSecondsToHours,
} from "#shared/utils/formatTime.helper";
import { uvImage, weatherIconUrl } from "#shared/utils/image.helper";
import { canSwimUvIndex } from "#shared/utils/canSwim.helper";
import { getWeatherIconWithDay } from "#shared/utils/weatherCode.helper";
import type { WeatherDailyItem } from "#shared/types/WeatherDataDaily.type";

const props = defineProps<{
  weatherData: WeatherDailyItem;
  cardClass?: string | object | Array<string | object>;
}>();
</script>

<template>
  <div
    class="glass p-4 flex-shrink-0 hover:z-[1] select-none"
    :class="cardClass"
  >
    <div
      class="flex justify-between items-center flex-col text-center sm:flex-row sm:text-left"
    >
      <div class="flex flex-col">
        <div class="font-medium">{{ formatDate(weatherData.time) }}</div>
        <div class="text-3xl font-bold py-1">
          <span class="text-lime-300"
            >{{ weatherData.temperature_2m_max }}°C</span
          >
          /
          <span class="font-normal text-2xl">
            {{ weatherData.temperature_2m_min }}°C
          </span>
        </div>
      </div>
      <NuxtImg
        :src="getWeatherIconWithDay(weatherData.weather_code, 1)"
        height="60"
        width="60"
        densities="x1 x2"
        alt="Погода"
        class="w-[60px] h-[60px] -order-1 mt-[-15px] sm:order-none sm:mt-0"
      />
    </div>

    <div class="font-light text-center sm:text-left">
      Ощущается как:
      <span class="text-lime-300 font-bold">
        {{ weatherData.apparent_temperature_max }}°C
      </span>
      /
      <span class="font-normal">
        {{ weatherData.apparent_temperature_min }}°C
      </span>
    </div>

    <hr class="hr1 mt-2 sm:block" />

    <div class="grid grid-cols-3 mt-3">
      <div
        class="flex-shrink-0 flex flex-col items-center hr2-section text-sm group"
      >
        <NuxtImg
          :src="weatherIconUrl('sunrise')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />

        {{ formatOnlyTime(weatherData.sunrise) }}
      </div>

      <div
        class="flex-shrink-0 flex flex-col items-center text-center hr2-section text-sm"
      >
        <NuxtImg
          :src="weatherIconUrl('sunset')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ formatOnlyTime(weatherData.sunset) }}
      </div>

      <div
        class="flex-shrink-0 flex flex-col items-center text-sm group relative z-[1]"
      >
        <NuxtImg
          :src="weatherIconUrl('horizon')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ formatSecondsToHours(weatherData.daylight_duration) }}

        <div
          class="absolute left-[0] bottom-full mb-2 hidden group-hover:block bg-white text-gray-900 font-medium text-xs rounded px-2 py-1 whitespace-nowrap z-[1]"
        >
          Продолжительность дневного света
        </div>
      </div>
    </div>

    <hr class="hr1 mt-2 sm:block" />

    <div class="grid grid-cols-3 mt-3">
      <div
        class="flex-shrink-0 flex flex-col items-center hr2-section text-sm group relative z-[1]"
      >
        <NuxtImg
          :src="uvImage(weatherData.uv_index_max)"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ weatherData.uv_index_max }}

        <div
          class="absolute left-[0] bottom-full mb-2 hidden group-hover:block bg-white text-gray-900 font-medium text-xs rounded px-2 py-1 whitespace-nowrap z-[1]"
        >
          {{ canSwimUvIndex(weatherData.uv_index_max) }}
        </div>
      </div>

      <div
        class="flex-shrink-0 flex flex-col items-center text-center hr2-section text-sm"
      >
        <NuxtImg
          :src="weatherIconUrl('wind')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ weatherData.wind_speed_10m_max }} км/ч
      </div>

      <div class="flex-shrink-0 flex flex-col items-center text-sm">
        <NuxtImg
          :src="weatherIconUrl('rain')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ weatherData.precipitation_sum }} мм
      </div>
    </div>
  </div>
</template>

<style></style>
