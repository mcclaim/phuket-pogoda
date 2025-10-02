// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-09-26",
  devtools: { enabled: true },

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
    // Public keys that are exposed to the client-side
    redis: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || "6379",
      username: process.env.REDIS_USER || "",
      password: process.env.REDIS_PASS || "",
      db: process.env.REDIS_DB || "0",
    },
    public: {
      siteUrl: process.env.SITE_URL,
      cityName: process.env.CITY_NAME,
      citySlug: process.env.CITY_SLUG,
      cityCountry: process.env.CITY_COUNTRY,
      latitude: process.env.LATITUDE,
      longitude: process.env.LONGITUDE,
      timezone: process.env.TIMEZONE,
    },
  },
});
