import Redis from "ioredis";

const config = useRuntimeConfig();

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  username: config.redis.username, // если нужен
  password: config.redis.password, // если нужен
  db: config.redis.db || 0,
  lazyConnect: true,
});
