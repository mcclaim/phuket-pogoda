<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import { formatTime } from "~/shared/helpers/formatTime.helper";
import {
  iconUrl,
  uvImage,
  weatherIconUrl,
} from "~/shared/helpers/image.helper";
import { canSwimUvIndex } from "~/shared/helpers/canSwim.helper";
import { getWeatherIconWithDay } from "~/shared/helpers/weatherCode.helper";

const props = defineProps<{ hours: any }>();

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

// Получаем текущий час и следующие 24
const getNext24Hours = () => {
  const now = new Date();
  const currentHourIndex = props.hours.time.findIndex(
    (t: string) => new Date(t).getHours() === now.getHours()
  );
  return props.hours.time.slice(currentHourIndex, currentHourIndex + 24);
};
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
        :modules="[FreeMode, Navigation]"
        :slides-per-view="'auto'"
        :space-between="20"
        navigation
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
          v-for="(time, index) in getNext24Hours()"
          :key="index"
          class="glass !shadow-none p-4 flex-shrink-0 hover:z-[1] select-none"
        >
          <div
            class="flex justify-between items-center flex-col text-center sm:flex-row sm:text-left"
          >
            <div class="flex flex-col">
              <div class="font-light">{{ formatTime(time) }}</div>
              <div class="text-3xl font-bold py-1">
                {{ hours.temperature_2m[index] }}°C
              </div>
            </div>
            <NuxtImg
              :src="
                getWeatherIconWithDay(
                  hours.weathercode[index],
                  hours.is_day[index]
                )
              "
              height="60"
              width="60"
              densities="x1 x2"
              alt="Погода"
              class="w-[60px] h-[60px] -order-1 mt-[-15px] sm:order-none sm:mt-0"
            />
          </div>

          <div class="font-light text-center sm:text-left">
            Ощущается как:
            <span class="font-bold"
              >{{ hours.apparent_temperature[index] }}°C</span
            >
          </div>

          <hr class="hr1 mt-2 hidden sm:block" />

          <div class="hidden grid-cols-3 mt-3 sm:grid">
            <div
              class="flex-shrink-0 flex flex-col items-center hr2-section text-sm group relative z-[1]"
            >
              <NuxtImg
                :src="uvImage(hours.uv_index[index])"
                height="35"
                width="35"
                class="w-[35px] h-[35px]"
                alt=""
                densities="x1 x2"
              />
              {{ hours.uv_index[index] }}

              <div
                class="absolute left-[0] bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[1]"
              >
                {{ canSwimUvIndex(hours.uv_index[index]) }}
              </div>
            </div>

            <div
              class="flex-shrink-0 flex flex-col items-center text-center hr2-section w-[80px] text-sm"
            >
              <NuxtImg
                :src="weatherIconUrl('wind')"
                height="35"
                width="35"
                class="w-[35px] h-[35px]"
                alt=""
                densities="x1 x2"
              />
              {{ hours.wind_speed_10m[index] }} км/ч
            </div>

            <div class="flex-shrink-0 flex flex-col items-center text-sm">
              <NuxtImg
                :src="weatherIconUrl('rain')"
                height="35"
                width="35"
                class="w-[35px] h-[35px]"
                alt=""
                densities="x1 x2"
              />
              {{ hours.precipitation[index] }} мм
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style></style>
