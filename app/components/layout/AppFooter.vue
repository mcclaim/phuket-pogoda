<template>
  <footer class="layout__glass">
    <div class="container xl:max-w-7xl mx-auto px-4 py-3 text-sm">
      © {{ new Date().getFullYear() }} phuket-pogoda.ru
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
footer {
  @apply border-b-0 sticky bottom-0 z-50;
}
</style>
