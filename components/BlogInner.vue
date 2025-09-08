<template>
  <article>
    <header class="mb-6">
      <div class="justify-between mb-4 flex items-center gap-4">
        <nuxt-link
          to="/statya"
          class="text-lime-300 hover:underline inline-block"
          >&larr; Все статьи</nuxt-link
        >

        <p class="text-gray-200 text-sm">Дата: {{ date }}</p>
      </div>
      <h1
        class="text-2xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg"
      >
        {{ blogData.title }}
      </h1>
    </header>

    <div class="aspect-w-16 aspect-h-11 mb-6" v-if="blogData.img">
      <NuxtImg
        class="w-full object-cover rounded-xl"
        :src="blogData.img"
        densities="x1 x2"
        alt="Blog Image"
        lazy
      />
    </div>

    <p class="font-medium text-lg text-gray-200 text-shadow-lg">
      {{ blogData.desc }}
    </p>

    <ContentRenderer :value="doc" />
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  blogData: any;
  doc: any;
}>();

const date = computed(
  () => props.blogData.date || new Date().toLocaleDateString("ru-RU")
);
</script>

<style></style>
