import type { BlogData } from "#shared/types/BlogData.type";

export async function useArticleData(category: string) {
  const route = useRoute();
  const slug = route.params.slug as string;

  const { data: blogData } = await useAsyncData(route.path, () => {
    return queryCollection("content")
      .path(route.path)
      .first() as Promise<BlogData>;
  });

  useSeoHead({
    title: blogData.value?.meta?.title || "Пхукет, все что нужно знать туристу",
    desc: blogData.value?.meta?.desc || "",
    date: blogData.value?.meta?.date || "",
    slug,
    img: blogData.value?.meta?.img || "",
    urlPath: `/${category}/${slug}`,
  });

  return { blogData };
}
