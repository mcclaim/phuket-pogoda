import { redis } from "./redis";

export async function getOrSetCache<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  // 1. Проверяем кэш
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Если нет — вызываем функцию
  const data = await fetchFn();

  // 3. Сохраняем в Redis
  await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);

  return data;
}
