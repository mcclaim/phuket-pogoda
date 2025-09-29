<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Гид по Пхукету: статьи и советы туристам
    </h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="col" v-for="(article, index) of articles" :key="article.id">
        <BlogCard
          :blog-data="{
            title: article.title,
            desc: article.desc,
            link: article.path,
            img: article.img,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";
import { useHead } from "nuxt/app";

const route = useRoute();
const articles = ref<BlogListData[]>([]);
useHead({
  title: "Погода на Пхукете — phuket-pogoda.ru",
  meta: [
    {
      name: "description",
      content: "Текущая погода на Пхукете и прогноз на 5 дней.",
    },
  ],
});

const { data: articleData } = await useAsyncData(route.path, () => {
  return queryCollection("content")
    .where("path", "LIKE", `${route.path}/%`)
    .all() as Promise<ContentCollectionItem[]>;
});

if (articleData.value) {
  articles.value = articleData.value.map((article) => ({
    title: article?.title || "Интересное место на Пхукете",
    desc: article?.meta?.desc || "Описание внутри статьи",
    path: article.path || "/",
    id: article.id || "/",
    img: typeof article?.meta?.img === "string" ? article.meta.img : null,
  }));
}
</script>
