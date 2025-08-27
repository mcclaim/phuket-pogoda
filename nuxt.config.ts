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
    },
  },
  sitemap: {
    sitemaps: false,
    autoLastmod: true,
  },
  robots: {
    rules: [{ UserAgent: "*", Allow: "/" }],
    sitemap:
      (process.env.SITE_URL || "https://phuket-pogoda.ru") + "/sitemap.xml",
  },
  compatibilityDate: "2024-11-01",
});
