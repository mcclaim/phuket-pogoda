<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <NuxtLayout name="404">
    <div
      class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16"
    >
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-2xl">
                Похоже, ты нашел дверь в великое ничто.
              </h1>
              <p class="my-2 text-gray-800">
                Извините! Пожалуйста, посетите нашу домашнюю страницу, чтобы
                добраться туда, куда вам нужно.
              </p>
              <button
                class="sm:w-full lg:w-auto my-2 border rounded md py-3 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                @click="goBack"
              >
                Отвези меня туда!
              </button>
            </div>
          </div>
          <div>
            <NuxtImg src="https://i.ibb.co/G9DC8S0/404-2.png" densities="1x" />
          </div>
        </div>
      </div>
      <div>
        <NuxtImg src="https://i.ibb.co/ck1SGFJ/Group.png" densities="1x" />
      </div>
    </div>
  </NuxtLayout>
</template>
