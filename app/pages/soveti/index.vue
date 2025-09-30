<template>
  <div class="glass p-6">
    <h1
      class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Советы на предстоящую неделю туристам в Пхукете
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

const route = useRoute();
const articles = ref<BlogListData[]>([]);

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
    id: article.id || Math.random().toString(36),
    img: typeof article?.meta?.img === "string" ? article.meta.img : null,
  }));
}

useSeoHead({
  title: "Советы туристам Пхукета на неделю: одежда, вещи, пляж",
  desc: `Полезные советы для туристов в Пхукете на даты: ${articles.value.map((a) => a.title).join(", ")}. Во что одеться, что взять с собой, как вести себя на пляже и многое другое.`,
  date: formatOnlyDate(new Date().toDateString()),
  img: "/images/articles/budda.jpg",
  urlPath: "/soveti",
});
</script>
