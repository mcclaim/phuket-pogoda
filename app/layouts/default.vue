<template>
  <div id="app">
    <NuxtLoadingIndicator />
    <LayoutAppHeader />

    <main
      class="flex-1 py-4 relative z-[1] overflow-hidden flex justify-center items-start flex-wrap"
    >
      <!-- левый сайдбар -->
      <ClientOnly>
        <AdUnit
          class="ads-1"
          styleClass="ads-slot sidebar"
          adFormat="auto"
          :styles="'display:block;min-height:250px;width:100%'"
        />
      </ClientOnly>

      <div class="container xl:max-w-7xl mx-auto px-4 xl:w-[80%]">
        <!-- большой десктоп-баннер (видимый только на xl) -->
        <ClientOnly>
          <AdUnit
            class="ads-3 !hidden !xl:block"
            styleClass="ads-slot leaderboard"
            adFormat="auto"
            :styles="'display:block;min-height:90px;width:100%'"
          />
        </ClientOnly>

        <slot />

        <!-- второй большой десктоп баннер -->
        <ClientOnly>
          <AdUnit
            class="ads-4 !hidden !xl:block"
            styleClass="ads-slot wide"
            adFormat="auto"
            :styles="'display:block;min-height:250px;width:100%'"
          />
        </ClientOnly>
      </div>

      <!-- правый сайдбар -->
      <ClientOnly>
        <AdUnit
          class="ads-2"
          styleClass="ads-slot sidebar"
          adFormat="auto"
          :styles="'display:block;min-height:250px;width:100%'"
        />
      </ClientOnly>
    </main>

    <LayoutAppFooter />
  </div>
</template>

<style lang="scss">
#app {
  @apply min-h-screen relative flex flex-col;

  &:before {
    background: url("~/assets/images/bg-5.jpg") no-repeat center center fixed;
    content: "";
    @apply absolute top-0 left-0 right-0 bottom-0 bg-cover;
  }

  &:after {
    content: "";
    background-color: rgba(22, 243, 243, 0.1);
    @apply absolute top-0 left-0 right-0 bottom-0 bg-cover;
  }
}
</style>
