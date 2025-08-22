<script lang="ts" setup>
import { ref } from "vue";
import { weatherIconUrl } from "~/shared/helpers/image.helper";

const isOpen = ref(false);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <header class="layout__glass">
    <div
      class="container xl:max-w-7xl mx-auto flex items-center justify-between"
    >
      <NuxtLink to="/" class="px-4 py-3">
        <img src="~/assets/images/logo.svg" alt="Logo" class="mr-2" />
      </NuxtLink>

      <!-- Бургер (только мобилка) -->
      <button
        type="button"
        command="--toggle"
        commandfor="mobile-menu"
        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-white/55 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
        @click="isOpen = !isOpen"
      >
        <span class="absolute -inset-0.5"></span>
        <span class="sr-only">Open main menu</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          data-slot="icon"
          aria-hidden="true"
          class="size-6 in-aria-expanded:hidden"
          v-if="!isOpen"
        >
          <path
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          data-slot="icon"
          aria-hidden="true"
          class="size-6 not-in-aria-expanded:hidden"
          v-if="isOpen"
        >
          <path
            d="M6 18 18 6M6 6l12 12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Меню -->
      <nav
        class="nav md:flex md:items-center"
        :class="
          isOpen
            ? 'block absolute top-full left-0 w-full bg-white border-t border-gray-200 md:static md:w-auto md:bg-transparent md:border-none'
            : 'hidden md:flex'
        "
      >
        <!-- Главная -->
        <NuxtLink
          to="/"
          class="nav__link flex items-center gap-2"
          active-class="active"
        >
          <NuxtImg
            src="/images/icons/weather-today.svg"
            alt="Articles"
            width="20"
            height="20"
            class="inline-block"
          />

          <span>Погода на сегодня</span>
        </NuxtLink>

        <!-- Прогноз -->
        <div class="relative group">
          <button class="flex items-center nav__link" @click="toggleDropdown">
            <NuxtImg
              src="/images/icons/weather.svg"
              alt="Articles"
              width="20"
              height="20"
              class="inline-block mr-2"
            />

            <span>Прогноз</span>
            <svg
              class="w-4 h-4 ml-1 transition-transform"
              :class="{ 'rotate-180': dropdownOpen }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Дропдаун -->
          <div
            v-if="dropdownOpen"
            class="md:absolute left-0 mt-2 md:w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2"
          >
            <NuxtLink to="/forecast/tomorrow" class="dropdown__item">
              Завтра
            </NuxtLink>
            <NuxtLink to="/forecast/week" class="dropdown__item">
              На неделю
            </NuxtLink>
            <NuxtLink to="/forecast/10days" class="dropdown__item">
              На 10 дней
            </NuxtLink>
            <NuxtLink to="/forecast/weekend" class="dropdown__item">
              На выходные
            </NuxtLink>
            <NuxtLink to="/forecast/month" class="dropdown__item">
              На месяц
            </NuxtLink>
          </div>
        </div>

        <!-- Статьи -->
        <NuxtLink
          to="/articles/pogoda-na-phukete"
          class="nav__link flex items-center gap-2"
          active-class="active"
        >
          <NuxtImg
            src="/images/icons/news.svg"
            alt="Articles"
            width="20"
            height="20"
            class="inline-block"
          />
          <span>Статьи</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.layout__glass {
  @apply border-t-0 sticky top-0 z-50;
}

.nav {
  &__link {
    @apply hover:bg-white hover:bg-opacity-30 py-4 px-4 transition font-medium;

    &.active {
      @apply bg-white bg-opacity-20;
    }
  }
}

.dropdown__item {
  @apply flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition;
}
</style>
