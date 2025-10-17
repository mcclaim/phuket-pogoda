<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
<script setup lang="ts">
useHead({
  link: [
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-Regular.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-Bold.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-Black.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-ExtraBold.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-Medium.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Rubik-Semibold.woff2",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  ],
});
</script>
