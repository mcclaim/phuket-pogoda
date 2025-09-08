<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Во что одеться на Пхукете на эту неделю?
    </h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="col" v-for="(article, index) of articles" :key="article.slug">
        <BlogCard
          :blog-data="{
            ...article,
            link: `/statya/${article._path.split('/').pop()}`,
            img: photoData?.[index % photoData.length]?.urls.small || '',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";

const articles = ref();
const photos = ref();
useHead({
  title: "Погода на Пхукете — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: "Текущая погода на Пхукете и прогноз на 5 дней.",
    },
  ],
});

const { data: articleData } = await useAsyncData(`articles`, () =>
  queryContent("/articles").sort({ date: -1 }).limit(7).find()
);

const { data: photoData, pending, error } = await useFetch("/api/photos");

if (articleData.value) {
  articles.value = articleData.value;
}

if (photoData.value) {
  photos.value = photoData.value;
}
</script>
