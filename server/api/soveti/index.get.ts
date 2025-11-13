import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default defineEventHandler(async () => {
  const dir = findPublicDir("soveti");
  if (!dir) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const slug = filename.replace(/\.md$/, "");

    return {
      slug,
      title:
        parsed.data.title || "Советы по Пхукету, все что нужно знать туристу",
      desc: parsed.data.desc || parsed.data.description || "",
      img: parsed.data.img || "",
      date: parsed.data.date || "",
      path: `/soveti/${slug}`,
    };
  });

  // сортируем по дате (если есть)
  articles.sort((a, b) => (a.date > b.date ? 1 : -1));

  return articles;
});
