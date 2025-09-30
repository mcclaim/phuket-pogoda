export function useSeoHead(statya: {
  title: string;
  desc: string;
  date: string;
  img: string;
  urlPath: string;
}) {
  const config = useRuntimeConfig();
  const url = config.public.siteUrl + statya.urlPath;
  const img = statya.img.startsWith("http") ? statya.img : url + statya.img;

  useHead({
    title: statya.title,
    meta: [
      // Базовое SEO
      { name: "description", content: statya.desc },
      {
        name: "keywords",
        content: `Пхукет, погода Пхукет ${statya.date}, прогноз погоды ${statya.date}, отдых в Таиланде, экскурсии Пхукет, советы туристам Пхукет, пляжи Пхукет, отели Пхукет, туры Пхукет`,
      },

      // Open Graph (для Facebook, Telegram, WhatsApp и т.д.)
      { property: "og:type", content: "statya" },
      { property: "og:title", content: statya.title },
      { property: "og:description", content: statya.desc },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:site_name", content: "Погода на Пхукете" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: statya.title },
      { name: "twitter:description", content: statya.desc },
      { name: "twitter:image", content: img },

      // Доп. для Google (заменено на name="name", name="image")
      { name: "name", content: statya.title },
      { name: "description", content: statya.desc },
      { name: "image", content: img },
    ],
    link: [{ rel: "canonical", href: url }],
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Statya",
          headline: statya.title,
          description: statya.desc,
          image: [url],
          datePublished: statya.date,
          dateModified: statya.date,
          author: { "@type": "Organization", name: "Погода на Пхукете" },
          publisher: {
            "@type": "Organization",
            name: "Погода на Пхукете",
            logo: {
              "@type": "ImageObject",
              url: "https://example.com/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        }),
      },
    ],
  });
}
