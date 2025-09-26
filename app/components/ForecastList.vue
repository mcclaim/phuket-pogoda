<template>
  <div class="grid sm:grid-cols-2 gap-4">
    <div
      v-for="d in days"
      :key="d.date"
      class="rounded-2xl bg-white shadow p-5 flex items-center gap-4"
    >
      <img
        :src="`https://openweathermap.org/img/wn/${d.icon}@2x.png`"
        alt="icon"
        class="w-14 h-14"
      />
      <div>
        <div class="text-sm text-gray-500">{{ formatDate(d.date) }}</div>
        <div class="text-lg font-semibold capitalize">{{ d.description }}</div>
      </div>
      <div class="ml-auto font-bold">
        {{ Math.round(d.temp_min) }}–{{ Math.round(d.temp_max) }}°C
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ days: Array<any> }>();
const formatDate = (s: string) =>
  new Date(s + "T00:00:00").toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
</script>
