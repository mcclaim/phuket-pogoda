export function articleMenuActive(paths: string[]) {
  return paths.some((path) => useRoute().path.startsWith(path));
}
