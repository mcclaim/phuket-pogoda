import { $fetch } from "ofetch";

let cachedPhotos: any[] = [];
let lastFetchTime: number | null = null;
const CACHE_TTL = 1000 * 60 * 60; // 1 час

export default defineEventHandler(async () => {
  const now = new Date().getTime(); // серверное время

  // Проверяем кэш
  if (
    cachedPhotos.length > 0 &&
    lastFetchTime &&
    now - lastFetchTime < CACHE_TTL
  ) {
    return cachedPhotos;
  }

  try {
    const data = await $fetch("https://api.unsplash.com/photos/random", {
      query: {
        query: "phuket",
        count: 10,
        client_id: process.env.UNSPLASH_ACCESS_KEY,
        w: 450,
        h: 250,
        q: 80,
        fit: "crop",
        auto: "format",
      },
    });

    cachedPhotos = data;
    lastFetchTime = now;

    return cachedPhotos;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return cachedPhotos;
  }
});
