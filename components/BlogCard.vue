<script lang="ts" setup>
defineProps<{
  cardClass?: string | object | Array<string | object>;
  title: string;
  desc: string;
  link: string;
  img: string;
}>();
</script>

<template>
  <div
    class="glass p-4 flex-shrink-0 hover:z-[1] select-none"
    :class="cardClass"
  >
    <h2 class="text-lg font-semibold mb-2"></h2>
  </div>
</template>

<style></style>
