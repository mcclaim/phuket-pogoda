<template>
  <div class="space-y-6">
    <SeoArticle v-if="doc" :doc="doc" />
    <div v-else>Статья не найдена.</div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { data: doc } = await useAsyncData(`article-${slug}`, () => queryContent(`/articles/${slug}`).findOne())
useHead({
  title: doc.value?.title || 'Статья — phuket-pogoda.ru',
  meta: [{ name: 'description', content: doc.value?.description || 'Полезные материалы о погоде на Пхукете' }]
})
</script>
