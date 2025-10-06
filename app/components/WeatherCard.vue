<script lang="ts" setup>
import { formatTime } from "#shared/utils/formatTime.helper";
import { uvImage, weatherIconUrl } from "#shared/utils/image.helper";
import { canSwimUvIndex } from "#shared/utils/canSwim.helper";
import { getWeatherIconWithDay } from "#shared/utils/weatherCode.helper";
import type { WeatherHourlyItem } from "#shared/types/WeatherDataHourly.type";

defineProps<{
  weatherData: WeatherHourlyItem;
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
        <div class="font-medium">{{ formatTime(weatherData.time) }}</div>
        <div class="text-3xl font-bold py-1">
          {{ weatherData.temperature_2m }}°C
        </div>
      </div>
      <NuxtImg
        :src="
          getWeatherIconWithDay(weatherData.weathercode, weatherData.is_day)
        "
        height="60"
        width="60"
        densities="x1 x2"
        alt="Погода"
        class="w-[60px] h-[60px] -order-1 mt-[-15px] sm:order-none sm:mt-0"
      />
    </div>

    <div class="font-light text-center sm:text-left">
      Ощущается как:
      <span class="font-bold">{{ weatherData.apparent_temperature }}°C</span>
    </div>

    <hr class="hr1 mt-2 hidden sm:block" />

    <div class="hidden grid-cols-3 mt-3 sm:grid">
      <div
        class="flex-shrink-0 flex flex-col items-center hr2-section text-sm group relative z-[1]"
      >
        <NuxtImg
          :src="uvImage(weatherData.uv_index)"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ weatherData.uv_index }}

        <div
          class="absolute left-[0] bottom-full mb-2 hidden group-hover:block bg-white text-gray-900 font-medium text-xs rounded px-2 py-1 whitespace-nowrap z-[1]"
        >
          {{ canSwimUvIndex(weatherData.uv_index) }}
        </div>
      </div>

      <div
        class="flex-shrink-0 flex flex-col items-center text-center hr2-section w-[80px] text-sm"
      >
        <NuxtImg
          :src="weatherIconUrl('wind')"
          height="35"
          width="35"
          class="w-[35px] h-[35px]"
          alt=""
          densities="x1 x2"
        />
        {{ weatherData.wind_speed_10m }} км/ч
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
        {{ weatherData.precipitation }} мм
      </div>
    </div>
  </div>
</template>

<style></style>
