<template>
  <div class="glass py-4 p-6 sm:py-6">
    <blog-inner
      v-if="blogData"
      :blog-data="{
        title: blogData?.meta?.title || '',
        desc: blogData.meta.desc,
        date: blogData.meta.date,
        img: blogData.meta.img,
      }"
      url="/soveti"
      :doc="blogData.body"
    />

    <div v-else class="text-center text-2xl">Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: blogData } = await useAsyncData(
  route.path,
  () =>
    $fetch(`/api/soveti/${slug}`) as Promise<{
      slug: string;
      meta: Record<string, any>;
      body: string;
      bodyHtml: string;
    }>
);

useSeoHead({
  title:
    blogData.value?.meta?.title ||
    "Гид по Пхукету, все что нужно знать туристу",
  desc: blogData.value?.meta.desc || "",
  date: blogData.value?.meta.date || "",
  img: blogData.value?.meta.img || "",
  urlPath: `/soveti/${slug}`,
});
</script>
