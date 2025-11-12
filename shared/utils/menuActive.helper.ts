import { type RouteLocationNormalizedLoaded } from "vue-router";

export function articleMenuActive(
  router: RouteLocationNormalizedLoaded,
  paths: string[]
) {
  return paths.some((path) => router.path.startsWith(path));
}
