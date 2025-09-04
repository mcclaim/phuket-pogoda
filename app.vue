<script setup>
definePageMeta({
  pageTransition: {
    name: "fade",
    mode: "out-in", // <-- это важно
  },
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style></style>
