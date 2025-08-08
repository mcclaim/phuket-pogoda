<template>
  <header class="layout__glass">
    <div
      class="container xl:max-w-7xl mx-auto flex items-center justify-between"
    >
      <NuxtLink to="/" class="px-4 py-3">
        <img src="~/assets/images/logo.svg" alt="Logo" class="mr-2" />
      </NuxtLink>
      <nav class="flex items-center nav">
        <NuxtLink to="/" class="nav__link" active-class="active"
          >Главная</NuxtLink
        >
        <NuxtLink to="/forecast" class="nav__link" active-class="active"
          >Прогноз</NuxtLink
        >
        <NuxtLink
          to="/articles/pogoda-na-phukete"
          class="nav__link"
          active-class="active"
          >Статьи</NuxtLink
        >
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.layout__glass {
  @apply border-t-0 sticky top-0 z-50;
}

.nav {
  &__link {
    @apply hover:bg-white hover:bg-opacity-30 py-4 px-4 font-medium;

    &.active {
      @apply bg-white bg-opacity-20;
    }
  }
}
</style>
