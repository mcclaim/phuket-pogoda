<template>
  <div class="space-y-6">
    <section class="bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold mb-2">Погода на Пхукете</h1>
      <p class="text-gray-600">Текущая погода и краткий прогноз.</p>
    </section>
    <section v-if="current">
      <WeatherCard :data="current" />
    </section>
    <section v-if="forecast?.days" class="space-y-3">
      <h2 class="text-xl font-semibold">Ближайшие дни</h2>
      <ForecastList :days="forecast.days" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useWeather } from "../composables/useWeather";

useHead({
  title: "Погода на Пхукете — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: "Текущая погода на Пхукете и прогноз на 5 дней.",
    },
  ],
});
const { getCurrent, getForecast } = useWeather();
const [current, forecast] = await Promise.all([getCurrent(), getForecast()]);
</script>
