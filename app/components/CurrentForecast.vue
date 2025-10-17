<template>
  <div class="glass p-6">
    <h2 class="text-2xl sm:text-3xl font-semibold pt-0">Текущая погода</h2>
    <div class="grid grid-cols-12 gap-4">
      <div
        class="flex items-center col-span-12 pt-2 pb-1 pl-[3.8rem] sm:pt-6 sm:pl-[5.5rem] relative"
      >
        <NuxtImg
          :src="iconUrl"
          alt="icon"
          class="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] top-[0] sm:top-[-0.2rem] left-[-1rem] absolute"
          width="100"
          height="100"
          format="svg"
          style="aspect-ratio: 1 / 1"
        />
        <p class="text-xl md:text-3xl lg:text-5xl font-extrabold">
          <span class="text-5xl sm:text-6xl text-lime-300"
            >{{ Math.round(weather.temperature_2m) }}°C
          </span>
          /
          <span class="uppercase">{{ cloudCover }}</span>
        </p>
      </div>

      <div class="col-span-12 sm:col-span-6 lg:col-span-3 text-lg">
        <p>
          Ощущается как:
          <span class="text-lime-300 font-bold"
            >{{ Math.round(weather.apparent_temperature) }}°C</span
          >
        </p>
        <p>
          Влажность:
          <span class="text-lime-300 font-bold"
            >{{ weather.relative_humidity_2m }}%</span
          >
        </p>
        <p>
          Облачность:
          <span class="text-lime-300 font-bold"
            >{{ weather.cloud_cover }}%</span
          >
        </p>
      </div>

      <div
        class="col-span-12 sm:col-span-12 lg:col-span-6 text-lg order-1 lg:-order-none"
      >
        <p>
          Купание:
          <span class="text-lime-300 font-bold">{{ canSwimData }}</span>
        </p>

        <p>
          Осадки:
          <span class="text-lime-300 font-bold"
            >{{ weather.precipitation }}мм</span
          >
        </p>

        <p>
          Дождь / Ливни:
          <span class="text-lime-300 font-bold">
            {{ weather.rain }} мм / {{ weather.showers }} мм
          </span>
        </p>
      </div>

      <div class="col-span-12 sm:col-span-6 lg:col-span-3 text-lg">
        <p>
          Давление:
          <span class="text-lime-300 font-bold"
            >{{ weather.surface_pressure }} гПа</span
          >
        </p>
        <p>
          Ветер:
          <span class="text-lime-300 font-bold">
            {{ weather.wind_speed_10m }} м/с, {{ weather.wind_direction_10m }}°
          </span>
        </p>
        <p>
          Время:
          <span class="text-lime-300 font-bold">
            {{ weather.is_day ? "День" : "Ночь" }} —
            {{ currentTime }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { canSwim } from "#shared/utils/canSwim.helper";
import type { WeatherCurrent } from "#shared/types/WeatherData.type";
import clearDay from "~/assets/images/weather-icons/clear-day.svg";
import clearNight from "~/assets/images/weather-icons/clear-night.svg";

const props = defineProps<{ weather: WeatherCurrent }>();

const cloudCover = computed(() => {
  return props.weather.cloud_cover > 50
    ? "Переменная облачность"
    : props.weather.cloud_cover > 20
      ? "Переменная облачность"
      : "Ясно";
});

const currentTime = computed(() => {
  return props.weather.time ? currentPhuketTime(new Date()) : 0;
});

const iconUrl = computed(() => {
  return props.weather.is_day ? clearDay : clearNight;
});

const canSwimData = computed(() => {
  return canSwim(props.weather);
});
</script>
