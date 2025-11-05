<template>
  <div
    class="glass p-4 flex-shrink-0 hover:z-[1] select-none"
    :class="blogData.cardClass"
  >
    <nuxt-link :to="blogData.link">
      <div class="aspect-w-16 aspect-h-11 mb-4" v-if="blogData?.img">
        <NuxtImg
          class="w-full object-cover rounded-xl max-h-[200px]"
          :src="blogData.img"
          densities="x1 x2"
          alt="Blog Image"
          format="webp"
          lazy
          width="350px"
          height="150px"
          sizes="xs:300px xl:300px"
        />
      </div>
      <h2 class="text-lg font-semibold mb-2 pt-0 text-balance">
        {{ blogData.title }}
      </h2>
      <p class="text-md text-gray-200 text-balance">
        {{ blogData.desc }}
      </p>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  blogData: BlogCardData;
}>();
</script>

<style></style>
