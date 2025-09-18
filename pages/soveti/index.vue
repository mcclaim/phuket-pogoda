<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Во что одеться на Пхукете на ближайшее время?
    </h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="col" v-for="(article, index) of articles" :key="article.slug">
        <BlogCard
          :blog-data="{
            ...article,
            link: `/soveti/${article._path.split('/').pop()}`,
            img: article.img,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "nuxt/app";

const articles = ref();
useHead({
  title: "Погода на Пхукете — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: "Текущая погода на Пхукете и прогноз на 5 дней.",
    },
  ],
});

const { data: articleData } = await useAsyncData(`soveti`, () =>
  queryContent("/soveti").sort({ date: 1 }).limit(15).find()
);

if (articleData.value) {
  articles.value = articleData.value;
}
</script>
