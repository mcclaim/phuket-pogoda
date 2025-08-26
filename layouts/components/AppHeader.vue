<script lang="ts" setup>
import { ref } from "vue";
import { weatherIconUrl } from "~/shared/helpers/image.helper";

const isOpen = ref(false);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

function dropDownActive() {
  const paths = [
    "/forecast/tomorrow",
    "/forecast/week",
    "/forecast/10days",
    "/forecast/weekend",
    "/forecast/month",
  ];
  return paths.includes(useRoute().path);
}
</script>

<template>
  <header class="header layout__glass !backdrop-blur-none">
    <div
      class="container xl:max-w-7xl mx-auto flex items-center justify-between"
    >
      <NuxtLink to="/" class="px-4 py-3 relative z-[1]">
        <img
          src="~/assets/images/logo.svg"
          alt="Logo"
          class="w-full max-w-[93%] sm:max-w-full"
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
              active: dropDownActive(),
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
              to="/forecast/tomorrow"
              class="header__dropdown-item"
              active-class="active"
            >
              Завтра
            </NuxtLink>
            <NuxtLink
              to="/forecast/week"
              class="header__dropdown-item"
              active-class="active"
            >
              На неделю
            </NuxtLink>
            <NuxtLink
              to="/forecast/10days"
              class="header__dropdown-item"
              active-class="active"
            >
              На 10 дней
            </NuxtLink>
            <NuxtLink
              to="/forecast/weekend"
              class="header__dropdown-item"
              active-class="active"
            >
              На выходные
            </NuxtLink>
            <NuxtLink
              to="/forecast/month"
              class="header__dropdown-item"
              active-class="active"
            >
              На месяц
            </NuxtLink>
          </div>
        </div>

        <!-- Статьи -->
        <NuxtLink
          to="/articles/pogoda-na-phukete"
          class="nav__link gap-2"
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
  @apply left-0 rounded-none mt-0 md:w-56 bg-white border border-gray-200 shadow-lg py-2 md:absolute md:rounded-md md:mt-2;

  &-item {
    @apply flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-lime-600 transition;

    &.active {
      @apply bg-lime-600 text-white;
    }
  }
}
</style>
