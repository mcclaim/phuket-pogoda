<template>
  <article>
    <header class="mb-6">
      <div class="justify-between mb-4 flex items-center gap-4">
        <nuxt-link :to="url" class="text-lime-300 hover:underline inline-block"
          >&larr; Все статьи</nuxt-link
        >

        <p class="text-gray-200 text-sm">Дата: {{ date }}</p>
      </div>
      <h1
        class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg text-balance text-center"
      >
        {{ blogData.title }}
      </h1>
    </header>

    <div class="flex justify-center items-center mb-4" v-if="blogData.img">
      <NuxtImg
        densities="1x"
        class="rounded-xl"
        :src="blogData.img"
        alt="Blog Image"
        format="webp"
        lazy
      />
    </div>

    <div>
      <AdsKlookBlogInner />
    </div>

    <MDC
      :value="doc"
      tag="article"
      class="article-data text-shadow-lg text-balance"
    />

    <AdsTripsterLeftWidget />
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blogData: any;
  doc: any;
  url: string;
}>();

const date = computed(
  () => props.blogData.date || new Date().toLocaleDateString("ru-RU")
);
</script>

<style style="scss">
article .article-data {
  text-shadow: 1px 0 rgb(0 0 0 / 50%);
  p {
    a {
      text-decoration: underline;
      color: #8ddeff;

      &:hover {
        color: #04b7ff;
      }
    }
  }

  hr {
    margin-top: 10px;
  }
}
</style>
