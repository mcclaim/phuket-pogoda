<template>
  <div class="glass p-6">
    <blog-inner
      v-if="blogData"
      :blog-data="{
        title: blogData.title || 'Погода на пхукете на сегодня',
        desc: blogData.desc,
        date: blogData.date,
        img: '',
      }"
      :doc="blogData"
    />
    <div v-else class="text-center text-2xl">Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const { data: blogData } = await useAsyncData(`article-${slug}`, () =>
  queryContent(`/articles/${slug}`).findOne()
);

useHead({
  title: blogData.value?.title || "Статья — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: blogData.value?.desc || "Полезные материалы о погоде на Пхукете",
    },
  ],
});
</script>
