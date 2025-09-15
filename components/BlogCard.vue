<template>
  <div
    class="glass p-4 flex-shrink-0 hover:z-[1] select-none"
    :class="blogData.cardClass"
  >
    <nuxt-link :to="blogData.link">
      <div class="aspect-w-16 aspect-h-11 mb-4" v-if="blogData.img">
        <NuxtImg
          class="w-full object-cover rounded-xl max-h-[200px]"
          :src="blogData.img"
          densities="x1 x2"
          alt="Blog Image"
          lazy
        />
      </div>
      <h2 class="text-lg font-semibold mb-2">
        {{ blogData.title }}
      </h2>
      <p class="text-md text-gray-200">
        {{ blogData.desc }}
      </p>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  blogData: {
    cardClass?: string | object | Array<string | object>;
    title: string;
    desc: string;
    link: string;
    img?: string;
  };
}>();
</script>

<style></style>
