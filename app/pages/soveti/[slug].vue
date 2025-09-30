<template>
  <div class="glass p-6">
    <blog-inner
      v-if="blogData"
      :blog-data="{
        title: blogData.title || '',
        desc: blogData.meta.desc,
        date: blogData.meta.date,
        img: blogData.meta.img,
      }"
      url="/soveti"
      :doc="blogData"
    />

    <div v-else class="text-center text-2xl">Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
import type { BlogData } from "#shared/types/BlogData.type";

const route = useRoute();
const slug = route.params.slug as string;

const { data: blogData } = await useAsyncData(route.path, () => {
  return queryCollection("content")
    .path(route.path)
    .first() as Promise<BlogData>;
});

useSeoHead({
  title:
    blogData.value?.title || "Советы по Пхукету, все что нужно знать туристу",
  desc: blogData.value?.meta.desc || "",
  date: blogData.value?.meta.date || "",
  img: blogData.value?.meta.img || "",
  urlPath: `/soveti/${slug}`,
});
</script>
