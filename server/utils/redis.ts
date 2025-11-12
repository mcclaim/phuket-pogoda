import { createClient } from "redis";

const config = useRuntimeConfig();

let client: ReturnType<typeof createClient> | null = null;

export async function getRedis(url: string) {
  if (!client) {
    client = createClient({
      url: config.public[url] as string,
    });

    client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    await client.connect();
  }

  return client;
}
