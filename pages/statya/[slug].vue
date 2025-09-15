<template>
  <div class="glass p-6">
    <blog-inner
      v-if="blogData"
      :blog-data="{
        title: blogData.title || 'Погода на пхукете на сегодня',
        desc: blogData.desc,
        date: blogData.date,
        img: blogData.img,
      }"
      :doc="blogData"
    />
    <div v-else class="text-center text-2xl">Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
import { useStatyaHead } from "~/shared/helpers/articleHead.helper";

const route = useRoute();
const slug = route.params.slug as string;
const { data: blogData } = await useAsyncData(`article-${slug}`, () =>
  queryContent(`/articles/${slug}`).findOne()
);

useStatyaHead({
  title: blogData.value?.title || "Погода на пхукете на сегодня",
  desc: blogData.value?.desc || "",
  date: blogData.value?.date || "",
  slug,
  img: blogData.value?.img || "",
});
</script>
