<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper/modules";

import { iconUrl } from "#shared/utils/image.helper";
import type { WeatherHourlyArray } from "#shared/types/WeatherDataHourly.type";
import WeatherCard from "./WeatherCard.vue";
import { getNext24Hours } from "#shared/utils/weatherCalcs.helper";

const props = defineProps<{ hours: WeatherHourlyArray }>();

// ref для экземпляра swiper
const swiperRef = ref<any>(null);
const showLeftShadow = ref(false);
const showRightShadow = ref(true);

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
    <h2 class="text-2xl font-semibold mb-5">Погода за 24 часа</h2>

    <div class="relative">
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
        :modules="[FreeMode]"
        :space-between="20"
        :loop="false"
        :free-mode="{
          enabled: true,
          sticky: false,
          momentum: true,
        }"
        :grab-cursor="true"
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
          v-for="(time, index) in getNext24Hours(hours)"
          :key="index"
        >
          <WeatherCard
            :weather-data="{
              time,
              temperature_2m: hours.temperature_2m[index],
              apparent_temperature: hours.apparent_temperature[index],
              weathercode: hours.weathercode[index],
              is_day: hours.is_day[index] as 0 | 1,
              uv_index: hours.uv_index[index],
              wind_speed_10m: hours.wind_speed_10m[index],
              precipitation: hours.precipitation[index],
            }"
            card-class="!shadow-none"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
