import { createError, defineEventHandler, readBody, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Безопасность: секретный ключ в заголовке или в теле
  const authHeader = event.node.req.headers["x-revalidate-token"] || "";
  const body = await readBody<{ paths?: string[] | string; token?: string }>(
    event
  );

  const token = body?.token || authHeader;
  if (!token || token !== config.private.revalidateToken) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" })
    );
  }

  // Нормализуем paths
  let paths: string[] = [];
  if (typeof body?.paths === "string") paths = [body.paths];
  else if (Array.isArray(body?.paths)) paths = body.paths;
  else {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "No paths provided",
      })
    );
  }

  // Базовый URL сайта (из runtime config). Убедись, что в prod это HTTPS домен.
  const base =
    config.public.siteUrl || `http://localhost:${process.env.PORT || 3000}`;

  // 1) "Warm" — сделаем запрос к каждой странице (server-side) чтобы Nitro/edge регенерировал HTML / наполнил кэш
  const warmPromises = paths.map(async (p) => {
    // убедимся, что путь корректный
    const route = p.startsWith("/") ? p : `/${p}`;
    const url = new URL(route, base).href;
    try {
      // GET — если у тебя ISR/routeRules, это вызовет регенерацию/заполнение кэша на edge
      const res = await $fetch(url, {
        method: "GET",
        retry: 0,
        credentials: "omit",
      });
      return { path: route, ok: true };
    } catch (err: any) {
      // Ошибка запроса — вернём информацию
      return { path: route, ok: false, error: String(err?.message || err) };
    }
  });

  const warmResults = await Promise.all(warmPromises);

  return {
    ok: true,
    warmed: warmResults,
  };
});
