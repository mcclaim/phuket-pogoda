<template>
  <div class="flex flex-col gap-6">
    <Loader v-if="pending && !forecast.current && !forecast.hourly" />

    <section v-if="!pending && forecast.current">
      <CurrentForecast :weather="forecast.current" />
    </section>

    <section v-if="!pending && forecast.hourly">
      <HourlyForecast :hours="forecast.hourly" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({
  title: "Погода на Пхукете — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: "Текущая погода на Пхукете и прогноз на 5 дней.",
    },
  ],
});

const { data: forecast, pending } = await useCurrentWeather();
</script>
