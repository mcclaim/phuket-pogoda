<script lang="ts" setup>
// import { articleMenuActive } from "#shared/utils/menuActive.helper";
import { ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const isOpen = ref(false);
const dropdownOpen = ref(false);
const articleDropdownOpen = ref(false);

const articleToggleDropdown = () => {
  articleDropdownOpen.value = !articleDropdownOpen.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const route = useRoute();

function articleMenuActive(
  router: RouteLocationNormalizedLoaded,
  paths: string[]
) {
  return paths.some((path) => router.path.startsWith(path));
}

watch(
  route,
  (value) => {
    articleDropdownOpen.value =
      articleDropdownOpen.value && articleMenuActive(route, ["/soveti", "/gid"])
        ? true
        : false;
    dropdownOpen.value =
      dropdownOpen.value && articleMenuActive(route, ["/pogoda"])
        ? true
        : false;
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <header class="header layout__glass !backdrop-blur-none">
    <div
      class="container xl:max-w-7xl mx-auto flex items-center justify-between"
    >
      <NuxtLink
        to="/"
        active-class="active"
        exact-active-class="active"
        class="px-4 py-3 relative z-[1]"
      >
        <NuxtImg
          src="/images/logo.svg"
          alt="Погода в Пхукете"
          class="w-full sm:max-w-full max-w-[93%]"
          title="Погода в Пхукете"
          densities="1x"
          width="269"
          height="29"
        />
      </NuxtLink>

      <div class="header__backdrop"></div>

      <!-- Бургер (только мобилка) -->
      <button
        type="button"
        command="--toggle"
        commandfor="mobile-menu"
        class="header__burger-button"
        @click="isOpen = !isOpen"
      >
        <span class="absolute -inset-0.5"></span>
        <span class="sr-only">Основное меню</span>
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

      <!-- Задный фон меню -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[1001] bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
        @click="isOpen = false"
      ></div>

      <!-- Меню -->
      <nav
        class="nav md:flex md:items-center relative z-[1]"
        :class="isOpen ? 'nav__open' : 'nav__closed'"
      >
        <!-- Главная -->
        <NuxtLink
          to="/"
          class="nav__link flex items-center gap-2"
          active-class="active"
          exact-active-class="active"
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
          <button
            class="nav__link w-full xs:w-none"
            :class="{
              active: articleMenuActive(route, ['/pogoda']),
            }"
            @click="toggleDropdown"
          >
            <NuxtImg
              src="/images/icons/weather.svg"
              alt="Articles"
              width="20"
              height="20"
              class="inline-block mr-2"
            />

            <span>Прогноз</span>
            <svg
              class="w-5 h-5 ml-auto transition-transform md:w-4 md:h-4 md:ml-1"
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
            class="header__dropdown !block"
            :class="{ 'md:!hidden': !dropdownOpen }"
          >
            <NuxtLink
              to="/pogoda/na-zavtra"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/na-zavtra']),
                },
              ]"
            >
              Завтра
            </NuxtLink>
            <NuxtLink
              to="/pogoda/na-nedelyu"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/na-nedelyu']),
                },
              ]"
            >
              На неделю
            </NuxtLink>
            <NuxtLink
              to="/pogoda/10-dney"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/10-dney']),
                },
              ]"
            >
              На 10 дней
            </NuxtLink>
            <NuxtLink
              to="/pogoda/15-dney"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/15-dney']),
                },
              ]"
            >
              На 15 дней
            </NuxtLink>
            <NuxtLink
              to="/pogoda/na-vyhodnye"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/na-vyhodnye']),
                },
              ]"
            >
              На выходные
            </NuxtLink>
            <NuxtLink
              to="/pogoda/na-mesyats"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/pogoda/na-mesyats']),
                },
              ]"
            >
              На месяц
            </NuxtLink>
          </div>
        </div>

        <!-- Статьи -->
        <div class="relative group">
          <button
            class="nav__link w-full xs:w-none"
            :class="{
              active: articleMenuActive(route, ['/soveti', '/gid']),
            }"
            @click="articleToggleDropdown"
          >
            <NuxtImg
              src="/images/icons/weather.svg"
              alt="Articles"
              width="20"
              height="20"
              class="inline-block mr-2"
            />

            <span>Статьи</span>
            <svg
              class="w-5 h-5 ml-auto transition-transform md:w-4 md:h-4 md:ml-1"
              :class="{ 'rotate-180': articleDropdownOpen }"
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
            class="header__dropdown !block"
            :class="{ 'md:!hidden': !articleDropdownOpen }"
          >
            <NuxtLink
              to="/soveti"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/soveti']),
                },
              ]"
            >
              Советы на неделю
            </NuxtLink>

            <NuxtLink
              to="/gid"
              :class="[
                'header__dropdown-item',
                {
                  active: articleMenuActive(route, ['/gid']),
                },
              ]"
            >
              Гид по Пхукету
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.layout__glass {
  @apply border-t-0 sticky top-0 z-[51];
}

.header {
  &__burger-button {
    @apply relative inline-flex items-center justify-center rounded-md p-2 mx-3 text-black bg-white md:hidden sm:mx-0;
  }

  &__backdrop {
    @apply backdrop-blur-[6.3px] block w-full h-full left-0 top-0 absolute;
  }
}

.nav {
  @media screen and (max-width: 767px) {
    @apply fixed top-0 bottom-0 left-0 z-[1011] w-4/5 min-w-[260px] max-w-full p-0 overflow-y-auto text-center bg-[#2d2d2d] shadow-[0_3px_50px_rgba(0,0,0,0.7)] flex flex-col transition-transform duration-300 ease-in-out -translate-x-[110%];
  }

  &__link {
    @apply text-gray-50 bg-opacity-30 sm:bg-opacity-0 py-4 px-4 transition font-medium flex items-center hover:bg-white hover:bg-opacity-30;

    &:has(~ .header__dropdown) {
      @media screen and (max-width: 767px) {
        @apply bg-white bg-opacity-30;
      }
    }

    &.active {
      @apply bg-white bg-opacity-20;
    }
  }
  &__open {
    @apply translate-x-0;
  }
}

.header__dropdown {
  @apply left-0 rounded-none mt-0 md:w-56 bg-white shadow-lg py-2 md:absolute md:rounded-md md:mt-2;

  &-item {
    @apply flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-lime-600 transition;

    &.active {
      @apply bg-lime-600 text-white;
    }
  }
}
</style>
