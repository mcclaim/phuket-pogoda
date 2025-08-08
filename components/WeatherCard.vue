<template>
  <div class="gap-4 glass p-4">
    <div class="">
      <!-- <img :src="iconUrl" alt="icon" class="w-16 h-16" /> -->
      <h2 class="text-3xl font-semibold">Текущая погода на Пхукете</h2>
      <p class="text-6xl font-extrabold text-lime-300">
        {{ Math.round(weather.temperature_2m) }}°C
      </p>
      <p class="text-xl">
        Ощущается как:
        <span class="text-lime-400 font-extrabold"
          >{{ Math.round(weather.apparent_temperature) }}°C</span
        >
      </p>
    </div>
    <div class="ml-auto">
      <div>Ощущается как: {{ Math.round(weather.apparent_temperature) }}°C</div>
      <div>Направление ветра: {{ weather.wind_direction_10m }}°</div>
      <div>День или ночь: {{ weather.is_day ? "День" : "Ночь" }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ weather: any }>();
</script>
