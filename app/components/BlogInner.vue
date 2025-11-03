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
        class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg text-balance"
      >
        {{ blogData.title }}
      </h1>
    </header>

    <div class="flex justify-center items-center mb-6" v-if="blogData.img">
      <NuxtImg
        densities="1x"
        class="rounded-xl"
        :src="blogData.img"
        alt="Blog Image"
        format="webp"
        lazy
      />
    </div>

    <ContentRenderer
      class="article-data font-medium text-shadow-lg text-balance"
      :value="doc"
    />
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

<style></style>
