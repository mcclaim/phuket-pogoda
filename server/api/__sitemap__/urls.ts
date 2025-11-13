import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrlInput } from "#sitemap/types";
import { promises as fs } from "fs";
import path from "path";
import { findPublicDir } from "../../utils/findPublicDir";

async function urlsFromDir(
  dirPath: string,
  routePrefix: string
): Promise<SitemapUrlInput[]> {
  try {
    const files = await fs.readdir(dirPath);
    const urls: SitemapUrlInput[] = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const slug = path.basename(file, ".md");
      const full = path.join(dirPath, file);
      let stat;
      try {
        stat = await fs.stat(full);
      } catch (e) {
        // skip if cannot stat
        continue;
      }

      urls.push({
        loc: `/${routePrefix}/${slug}`,
        lastmod: stat.mtime.toISOString(),
      } as unknown as SitemapUrlInput);
    }

    return urls;
  } catch (e) {
    // If directory doesn't exist or other FS error, return empty
    return [];
  }
}

export default defineSitemapEventHandler(async () => {
  // const root = process.cwd();
  /* const gidDir = path.resolve(root, "content", "gid");
  const sovetiDir = path.resolve(root, "content", "soveti"); */
  const gidDir = findPublicDir("gid");
  const sovetiDir = findPublicDir("soveti");

  const [gidUrls, sovetiUrls] = await Promise.all([
    urlsFromDir(gidDir, "gid"),
    urlsFromDir(sovetiDir, "soveti"),
  ]);

  // Merge and return
  return [...gidUrls, ...sovetiUrls];
});
