<template>
  <div class="glass p-6">
    <h2 class="text-2xl font-semibold mb-6">Погода за 48 часов</h2>

    <div
      class="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory"
    >
      <div
        v-for="(time, index) in getNext24Hours()"
        :key="index"
        class="flex-shrink-0 w-48 shadow rounded-lg p-4 snap-center border border-gray-200 hover:shadow-lg transition"
      >
        <!-- Время -->
        <div class="text-center font-semibold">
          {{ formatTime(time) }}
        </div>

        <!-- Температура -->
        <div class="flex items-center justify-center mt-2">
          <!-- {{
            getIconFromWeatherCode(
              hours.weather_code[index],
              hours.is_day[index]
            )
          }} -->

          <!-- <img
            :src="
              getIconFromWeatherCode(
                hours.weather_code[index],
                hours.is_day[index]
              )
            "
            alt="Погода"
            class="w-10 h-10"
          /> -->
          <span class="text-2xl font-bold ml-2"
            >{{ hours.temperature_2m[index] }}°C</span
          >
        </div>

        <!-- Ощущается -->
        <div class="text-xs text-center">
          Ощущается: {{ hours.apparent_temperature[index] }}°C
        </div>

        <!-- UV Index -->
        <div class="flex items-center justify-center mt-3 relative group">
          <img
            :src="`~/assets/images/weather-icons/uv-index-${hours.uv_index[index]}.svg`"
            :alt="`UV Index ${hours.uv_index[index]}`"
            class="w-8 h-8"
          />
          <span class="ml-2 text-sm">UV: {{ hours.uv_index[index] }}</span>

          <!-- Tooltip -->
          <div
            class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap"
          >
            {{ canSwim(hours.uv_index[index]) }}
          </div>
        </div>

        <!-- Ветер -->
        <div class="flex items-center justify-center mt-2">
          <img
            src="~/assets/images/weather-icons/wind.svg"
            alt="Ветер"
            class="w-6 h-6"
          />
          <span class="ml-2 text-sm"
            >{{ hours.wind_speed_10m[index] }} км/ч</span
          >
        </div>

        <!-- Осадки -->
        <div class="flex items-center justify-center mt-2">
          <img
            src="~/assets/images/weather-icons/rain.svg"
            alt="Осадки"
            class="w-6 h-6"
          />
          <span class="ml-2 text-sm">{{ hours.precipitation[index] }} мм</span>
        </div>

        <!-- Влажность -->
        <div class="flex items-center justify-center mt-2">
          <img
            src="~/assets/images/weather-icons/humidity.svg"
            alt="Влажность"
            class="w-6 h-6"
          />
          <span class="ml-2 text-sm"
            >{{ hours.relative_humidity_2m[index] }}%</span
          >
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
import { getIconFromWeatherCode } from "~/shared/helpers/weatherCode.helper";
const props = defineProps<{ hours: any }>();

// Получаем текущий час и следующие 24
const getNext24Hours = () => {
  const now = new Date();
  const currentHourIndex = props.hours.time.findIndex(
    (t: string) => new Date(t).getHours() === now.getHours()
  );
  return props.hours.time.slice(currentHourIndex, currentHourIndex + 24);
};

// Функция для UV тултипа
const canSwim = (uv: number) => {
  if (uv <= 3) return "Можно купаться 🏊‍♂️";
  if (uv <= 6) return "Купаться можно, но осторожно ☀️";
  return "Нельзя купаться — опасный UV! 🚫";
};
</script>

<style></style>
