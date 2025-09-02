<template>
  <div id="app">
    <LayoutAppHeader />

    <main class="flex-1 py-4 relative z-[1]">
      <div class="container xl:max-w-7xl mx-auto px-4">
        <NuxtPage />
      </div>
    </main>

    <LayoutAppFooter />
  </div>
</template>

<script lang="ts" setup>
import { LayoutAppHeader } from "#components";
</script>

<style lang="scss">
#app {
  @apply min-h-screen relative flex flex-col;

  &:before {
    background: url("~/assets/images/bg-5.jpg") no-repeat center center fixed;
    content: "";
    @apply absolute top-0 left-0 right-0 bottom-0 bg-cover;
  }

  &:after {
    content: "";
    background-color: rgba(22, 243, 243, 0.1);
    @apply absolute top-0 left-0 right-0 bottom-0 bg-cover;
  }
}
</style>
