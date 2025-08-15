<template>
  <div class="glass p-6">
    <h2 class="text-2xl font-semibold mb-6">Погода за 24 часа</h2>

    <div
      class="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory"
    >
      <div
        v-for="(time, index) in getNext24Hours()"
        :key="index"
        class="glass !shadow-none p-4 flex-shrink-0"
      >
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <div class="font-light">{{ formatTime(time) }}</div>
            <div class="text-3xl font-bold py-1">
              {{ hours.temperature_2m[index] }}°C
            </div>
          </div>
          <img
            :src="getWeatherIcon(hours.weathercode[index], hours.is_day[index])"
            alt="Погода"
            class="w-[60px] h-[60px]"
          />
        </div>

        <div class="pt-0 py-2">
          Ощущается как: {{ hours.apparent_temperature[index] }}°C
        </div>

        <hr class="hr1" />

        <div class="grid grid-cols-3 gap-2 mt-3">
          <div class="flex-shrink-0">UV: {{ hours.uv_index[index] }}</div>
          <div class="flex-shrink-0">13.2 км/ч</div>
          <div class="flex-shrink-0">0.1 мм</div>
        </div>
      </div>
    </div>

    <!-- <div class="overflow-auto">
      <table class="table-auto text-sm w-full min-w-[1000px] shadow rounded">
        <thead>
          <tr class="text-left">
            <th class="px-2 py-2">Время</th>
            <th class="px-2 py-2">Темп</th>
            <th class="px-2 py-2">Ощущается</th>
            <th class="px-2 py-2">Облачность</th>
            <th class="px-2 py-2">Влажность</th>
            <th class="px-2 py-2">Осадки</th>
            <th class="px-2 py-2">УФ</th>
            <th class="px-2 py-2">Ветер</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(time, index) in hours.time.slice(0, 48)"
            :key="index"
            class="border-b"
          >
            <td class="px-2 py-1">
              {{ formatTime(hours.time[index]) }}
            </td>
            <td class="px-2 py-1">{{ hours.temperature_2m[index] }}°C</td>
            <td class="px-2 py-1">{{ hours.apparent_temperature[index] }}°C</td>
            <td class="px-2 py-1">{{ hours.cloud_cover[index] }}%</td>
            <td class="px-2 py-1">{{ hours.relative_humidity_2m[index] }}%</td>
            <td class="px-2 py-1">{{ hours.precipitation[index] }} мм</td>
            <td class="px-2 py-1">{{ hours.uv_index[index] }}</td>
            <td class="px-2 py-1">{{ hours.wind_speed_10m[index] }} км/ч</td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from "~/shared/helpers/formatTime.helper";
import { uvImage } from "~/shared/helpers/image.helper";
import { canSwimUvIndex } from "~/shared/helpers/canSwim.helper";
import { getWeatherIcon } from "~/shared/helpers/weatherCode.helper";
const props = defineProps<{ hours: any }>();

// Получаем текущий час и следующие 24
const getNext24Hours = () => {
  const now = new Date();
  const currentHourIndex = props.hours.time.findIndex(
    (t: string) => new Date(t).getHours() === now.getHours()
  );
  return props.hours.time.slice(currentHourIndex, currentHourIndex + 24);
};
</script>

<style></style>
