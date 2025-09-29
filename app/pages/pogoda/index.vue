<template>
  <router-view />
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({ title: "Прогноз на 5 дней — phuket-pogoda.ru" });
</script>
