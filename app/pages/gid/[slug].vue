<template>
  <div class="glass p-6">
    <blog-inner
      v-if="blogData"
      :blog-data="{
        title: blogData?.meta?.title || '',
        desc: blogData?.meta?.desc,
        date: blogData?.meta?.date,
        img: blogData?.meta?.img,
      }"
      url="/gid"
      :doc="blogData"
    />
    <div v-else class="text-center text-2xl">Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

console.log("route.path", route.path);

const { data: blogData } = await useAsyncData(route.path, () => {
  return queryCollection("content")
    .path(route.path)
    .first() as Promise<BlogData>;
});

useSeoHead({
  title: blogData.value?.title || "Гид по Пхукету, все что нужно знать туристу",
  desc: blogData.value?.meta.desc || "",
  date: blogData.value?.meta.date || "",
  img: blogData.value?.meta.img || "",
  urlPath: `/gid/${slug}`,
});
</script>
