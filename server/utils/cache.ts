import { getRedis } from "./redis";

export async function getOrSetCache<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  const redis = await getRedis();

  // 1. Проверяем кэш
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Запрашиваем свежие данные
  const data = await fetchFn();

  // 3. Сохраняем с TTL
  await redis.set(key, JSON.stringify(data), { EX: ttlSeconds });

  return data;
}
