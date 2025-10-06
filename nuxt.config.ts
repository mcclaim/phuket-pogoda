// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-09-26",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      title: "title",
      charset: "utf-8",
      meta: [
        { name: "theme-color", content: "#b0f146" },
        { name: "X-UA-Compatible", content: "IE=edge" },
        { name: "msapplication-TileColor", content: "#09F" },
        { name: "apple-mobile-web-app-title", content: "Пхукет погода" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black",
        },
      ],
      link: [
        { rel: "mask-icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/meta/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/images/meta/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/images/meta/favicon-32x32.png",
        },
        {
          rel: "mask-icon",
          color: "#09F",
          href: "/images/meta/safari-pinned-tab.svg",
        },
      ],
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],

  css: [
    "~/assets/css/settings.scss",
    "swiper/css",
    "swiper/css/scrollbar",
    "swiper/css/grid",
  ],

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/tailwindcss",
  ],

  runtimeConfig: {
    // Private keys that are only available on the server
    private: {
      unsplashSecretKey: process.env.UNSPLASH_ACCESS_KEY,
    },
    public: {
      siteUrl: process.env.SITE_URL,
      cityName: process.env.CITY_NAME,
      citySlug: process.env.CITY_SLUG,
      cityCountry: process.env.CITY_COUNTRY,
      latitude: process.env.LATITUDE,
      longitude: process.env.LONGITUDE,
      timezone: process.env.TIMEZONE,
      redisUrl: process.env.REDIS_URL,
      redisUrlForecast: process.env.REDIS_URL_FORECAST,
    },
  },
});
