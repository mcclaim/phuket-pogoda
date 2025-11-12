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
useSeoHead({
  title:
    "Погода в Пхукете сегодня, прогноз погоды Пхукет на сегодня, Пхукет, Таиланд",
  desc: "Погода в Пхукете на сегодня, подробный прогноз погоды на сегодня для островов Пхукета, Пхукет, Таиланд.",
  date: formatOnlyDate(new Date().toDateString()),
  urlPath: "/",
  contentType: "website",
});

const { data: forecast, pending } = await useCurrentWeather();
</script>
