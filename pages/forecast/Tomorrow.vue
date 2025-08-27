<script setup lang="ts">
import { useHead } from "nuxt/app";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Grid } from "swiper/modules";
import { getTomorrowWeather } from "~/shared/helpers/weatherCalcs.helper";
import { iconUrl } from "~/shared/helpers/image.helper";

import "swiper/css";
import "swiper/css/grid";

useHead({
  title:
    "Погода в Пхукете завтра, прогноз погоды Пхукет на завтра, Пхукет, Таиланд",
});

const { getCurrent } = useWeather();
const { current, hourly, pending } = await getCurrent();

// Swiper refs
const swiperRef = ref<any>(null);
const showLeftShadow = ref(false);
const showRightShadow = ref(true);

// для контроля SSR vs CSR
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

function onSwiper(swiperInstance: any) {
  swiperRef.value = swiperInstance;
  updateShadows();
}

function updateShadows() {
  if (!swiperRef.value) return;
  const { isBeginning, isEnd } = swiperRef.value;
  showLeftShadow.value = !isBeginning;
  showRightShadow.value = !isEnd;
}

function goPrev() {
  swiperRef.value?.slidePrev();
}
function goNext() {
  swiperRef.value?.slideNext();
}
</script>

<template>
  <div class="glass p-6">
    <h1
      class="text-xl md:text-3xl lg:text-5xl font-extrabold text-lime-300 text-shadow-lg mb-6"
    >
      Погода в Пхукете на завтра
    </h1>

    <div class="relative" v-if="!pending && hourly">
      <!-- SSR-рендер (SEO): статичная сетка -->
      <div
        v-if="!mounted"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
      >
        <WeatherCard
          v-for="(time, index) in getTomorrowWeather(hourly).time"
          :key="index"
          :weatherData="{
            time,
            temperature_2m: hourly.temperature_2m[index],
            apparent_temperature: hourly.apparent_temperature[index],
            weathercode: hourly.weathercode[index],
            is_day: hourly.is_day[index] as 0 | 1,
            uv_index: hourly.uv_index[index],
            wind_speed_10m: hourly.wind_speed_10m[index],
            precipitation: hourly.precipitation[index],
          }"
          card-class="!shadow-none"
        />
      </div>

      <!-- Клиентский Swiper -->
      <div v-else>
        <!-- Left shadow -->
        <div
          v-if="showLeftShadow"
          class="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-gray-200/80 to-transparent dark:from-gray-800/80"
        ></div>

        <!-- Right shadow -->
        <div
          v-if="showRightShadow"
          class="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-gray-200/80 to-transparent dark:from-gray-800/80"
        ></div>

        <!-- Навигационные кнопки -->
        <button
          v-if="showLeftShadow"
          @click="goPrev()"
          class="flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-700 shadow rounded-full p-2 hover:scale-110 transition"
        >
          <NuxtImg
            :src="iconUrl('chevron-left')"
            height="60"
            width="60"
            densities="x1 x2"
            class="w-5 h-5"
          />
        </button>
        <button
          v-if="showRightShadow"
          @click="goNext()"
          class="flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-700 shadow rounded-full p-2 hover:scale-110 transition"
        >
          <NuxtImg
            :src="iconUrl('chevron-right')"
            height="60"
            width="60"
            densities="x1 x2"
            class="w-5 h-5"
          />
        </button>

        <swiper
          :modules="[Grid]"
          :space-between="20"
          :loop="false"
          :slidesPerGroupAuto="true"
          :slidesPerGroup="8"
          :grid="{ rows: 2, fill: 'column' }"
          :breakpoints="{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            430: { slidesPerView: 2, spaceBetween: 16 },
            500: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }"
          @swiper="onSwiper"
          @touch-end="updateShadows"
          @slideChange="updateShadows"
          @resize="updateShadows"
          @reachBeginning="showLeftShadow = false"
          @reachEnd="showRightShadow = false"
        >
          <swiper-slide
            v-for="(time, index) in getTomorrowWeather(hourly).time"
            :key="index"
          >
            <WeatherCard
              :weatherData="{
                time,
                temperature_2m: hourly.temperature_2m[index],
                apparent_temperature: hourly.apparent_temperature[index],
                weathercode: hourly.weathercode[index],
                is_day: hourly.is_day[index] as 0 | 1,
                uv_index: hourly.uv_index[index],
                wind_speed_10m: hourly.wind_speed_10m[index],
                precipitation: hourly.precipitation[index],
              }"
              card-class="!shadow-none"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
