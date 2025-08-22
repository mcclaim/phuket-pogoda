<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Прогноз на 5 дней</h1>
    asdasdasd
    <!-- <ForecastList v-if="forecast?.days" :days="forecast.days" /> -->
  </div>
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useWeather } from "../composables/useWeather";

useHead({ title: "Прогноз на 5 дней — phuket-pogoda.ru" });
</script>
