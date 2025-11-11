<template>
  <div class="glass p-6 pt-0 sm:pt-6">
    <h1
      class="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-4 md:mb-6 sm:pt-0"
    >
      Гид по Пхукету: статьи и советы туристам
    </h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="col" v-for="article in articles" :key="article.id">
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

const route = useRoute();
// const articles = ref<BlogListData[]>([]);

const { data: articles } = await useAsyncData("gid-list", () =>
  $fetch<BlogListData[]>("/api/gid")
);

/* const { data: articleData } = await useAsyncData(route.path, () => {
  return queryCollection("content")
    .where("path", "LIKE", `${route.path}/%`)
    .all() as Promise<ContentCollectionItem[]>;
}); */

/* if (articleData.value) {
  articles.value = articleData.value.map((article) => ({
    title: article?.title || "Интересное место на Пхукете",
    desc: article?.meta?.desc || "Описание внутри статьи",
    path: article.path || "/",
    id: article.id || Math.random().toString(36),
    img: typeof article?.meta?.img === "string" ? article.meta.img : null,
  }));
} */

useSeoHead({
  title: "Гид по Пхукету – гид по отдыху, пляжам и экскурсиям",
  desc: "Полезные советы для туристов в Пхукете: лучшие пляжи, цены, экскурсии, транспорт и лайфхаки для идеального отдыха в Таиланде.",
  date: formatOnlyDate(new Date().toDateString()),
  img: "/images/articles/james-bond.jpg",
  urlPath: "/gid",
});
</script>
