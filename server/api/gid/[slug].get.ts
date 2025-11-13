import fs from "fs";
import matter from "gray-matter";
import { sendError } from "h3";
import MarkdownIt from "markdown-it";
import path from "path";
import { findPublicDir } from "../../utils/findPublicDir";

const md = new MarkdownIt();

export default defineEventHandler((event) => {
  const { slug } = event.context.params as { slug: string };
  const dir = findPublicDir("gid");
  if (!dir) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Folder not found" })
    );
  }

  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return sendError(
      event,
      createError({ statusCode: 404, statusMessage: "Not found" })
    );
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return {
    slug,
    meta: parsed.data || {},
    body: parsed.content,
    bodyHtml: md.render(parsed.content),
  };
});
