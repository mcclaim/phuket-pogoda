// server/utils/findPublicDir.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Универсальная функция поиска папки внутри public/
 * @param subdir название подпапки, например "gid" или "blog"
 * @returns абсолютный путь к найденной папке (или null, если не найдена)
 */
export function findPublicDir(subdir: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const candidates = [
    // когда запускают из корня проекта
    path.resolve(process.cwd(), "public", subdir),
    // когда запускают из server/
    path.resolve(__dirname, "..", "public", subdir),
    // когда код собран в .output/server
    path.resolve(__dirname, "..", "..", "public", subdir),
    // запасной вариант для Nitro
    path.resolve(process.cwd(), ".output", "public", subdir),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isDirectory()) {
      return c;
    }
  }

  console.error(`[findPublicDir] Folder not found: ${subdir}`, candidates);
  return "";
}
