<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  adSlot: { type: [String, Number], default: "" }, // optional
  adFormat: { type: String, default: "auto" }, // 'auto' recommended
  styleClass: { type: String, default: "ads-slot" }, // wrapper class
  styles: { type: String, default: "display:block" }, // inline style for <ins>
});

const adId = ref(`ad-${Math.random().toString(36).slice(2, 9)}`);

onMounted(() => {
  // ensure adsbygoogle exists and push after element mounted
  try {
    // @ts-ignore
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({});
  } catch (e) {
    // не ломаем приложение — логируем для отладки
    // console.warn('adsbygoogle push error', e)
  }
});
</script>

<template>
  <div :class="styleClass" :id="adId">
    <ins
      class="adsbygoogle"
      :style="styles"
      :data-ad-client="'ca-pub-1116254226795247'"
      v-bind="props.adSlot ? { 'data-ad-slot': props.adSlot } : {}"
      :data-ad-format="adFormat"
    ></ins>
  </div>
</template>

<style scoped>
/* Базовые гарантированные размеры для видимости.
   Точный стиль можно перенастроить под твой layout. */
.ads-slot {
  display: block;
  min-width: 160px;
  min-height: 50px;
  width: 100%;
}

/* большие баннеры на десктопе */
@media (min-width: 1280px) {
  .ads-slot.sidebar {
    min-width: 120px;
    min-height: 600px; /* для сайдбара */
  }
  .ads-slot.leaderboard {
    min-height: 90px; /* верхний баннер */
  }
  .ads-slot.wide {
    min-height: 250px;
  }
}
</style>
