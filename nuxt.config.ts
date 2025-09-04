// Nuxt 3 configuration
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      title: "title",
      charset: "utf-8",
      meta: [],
      link: [],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/image",
  ],
  css: ["@/assets/css/settings.scss"],
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
  },
  runtimeConfig: {
    owmKey: process.env.OWM_KEY || "",
    public: {
      siteUrl: process.env.SITE_URL || "https://phuket-pogoda.ru",
      cityName: process.env.CITY_NAME,
      citySlug: process.env.CITY_SLUG,
      cityCountry: process.env.CITY_COUNTRY,
      latitude: process.env.LATITUDE,
      longitude: process.env.LONGITUDE,
      timezone: process.env.TIMEZONE,
    },
  },
  site: {
    url: process.env.SITE_URL || "https://phuket-pogoda.ru", // ← укажи свой домен или временный URL
    name: "Погода на Пхукете",
  },
  sitemap: {
    strictNuxtContentPaths: true,
    sitemaps: true,
    autoLastmod: true,
  },
  robots: {
    rules: [{ UserAgent: "*", Allow: "/" }],
    sitemap:
      (process.env.SITE_URL || "https://phuket-pogoda.ru") + "/sitemap.xml",
  },
  compatibilityDate: "2024-11-01",
});
