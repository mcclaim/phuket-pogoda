<template>
  <div class="rounded-2xl bg-white shadow p-5 flex items-center gap-4">
    <img :src="iconUrl" alt="icon" class="w-16 h-16" />
    <div>
      <h3 class="text-lg font-semibold">Сейчас на Пхукете</h3>
      <p class="text-3xl font-bold">{{ Math.round(data.main.temp) }}°C</p>
      <p class="text-gray-600 capitalize">{{ data.weather[0].description }}</p>
    </div>
    <div class="ml-auto text-sm text-gray-500">
      <div>Ощущается как: {{ Math.round(data.main.feels_like) }}°C</div>
      <div>Влажность: {{ data.main.humidity }}%</div>
      <div>Ветер: {{ data.wind.speed }} м/с</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ data: any }>();
const iconUrl = computed(
  () => `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`
);
</script>
