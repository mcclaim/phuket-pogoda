<template>
  <article class="prose max-w-none prose-img:rounded-xl">
    <header class="mb-4">
      <h1 class="mb-1">{{ title }}</h1>
      <p class="text-gray-500 text-sm">{{ date }}</p>
    </header>
    <ContentRenderer :value="doc" />
  </article>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ doc: any }>();
const title = computed(
  () => props.doc.title || props.doc.head?.title || "Статья"
);
const date = computed(
  () => props.doc.date || new Date().toLocaleDateString("ru-RU")
);
</script>
