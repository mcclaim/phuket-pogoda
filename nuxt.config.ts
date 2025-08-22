// Nuxt 3 configuration
export default defineNuxtConfig({
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
    siteUrl: process.env.SITE_URL || "https://phuket-pogoda.ru",
    sitemaps: false,
    autoLastmod: true,
    cacheMaxAge: 600,
  },
  robots: {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap:
      (process.env.SITE_URL || "https://phuket-pogoda.ru") + "/sitemap.xml",
  },
  compatibilityDate: "2024-11-01",
});