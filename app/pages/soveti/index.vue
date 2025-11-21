<template>
  <div class="glass p-6 pt-0 sm:pt-6">
    <h1
      class="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-4 md:mb-6 sm:pt-0"
    >
      Советы на предстоящую неделю туристам в Пхукете
    </h1>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-for="(article, index) in articles" :key="article.id">
        <div class="col">
          <BlogCard
            :blog-data="{
              title: article.title,
              desc: article.desc,
              link: article.path,
              img: article.img,
            }"
          />
        </div>

        <AdsTripsterInArticleList v-if="index === 2" />

        <div class="col sm:col-span-2 lg:col-span-3" v-if="index === 8">
          <AdsKlookWidget />
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: articles } = await useAsyncData("soveti-list", () =>
  $fetch<BlogListData[]>("/api/soveti")
);

useSeoHead({
  title: "Советы туристам Пхукета на неделю: одежда, вещи, пляж",
  desc: `Полезные советы для туристов в Пхукете на даты: ${articles.value?.map((a) => a.title).join(", ")}. Во что одеться, что взять с собой, как вести себя на пляже и многое другое.`,
  date: formatOnlyDate(new Date().toDateString()),
  img: "/images/articles/budda.jpg",
  urlPath: "/soveti",
});
</script>
