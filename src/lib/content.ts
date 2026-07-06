import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/content";

export { formatDate } from "@/lib/format";

const contentDirectory = path.join(process.cwd(), "content");

function readMdxFiles<T extends Record<string, unknown>>(
  subdir: string,
): Array<T & { content: string; slug: string }> {
  const dir = path.join(contentDirectory, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as T;
      const slug =
        (frontmatter.slug as string | undefined) ?? file.replace(/\.mdx?$/, "");
      return { ...frontmatter, slug, content };
    });
}

function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getProjects(): Project[] {
  return sortByDate(
    readMdxFiles<ProjectFrontmatter & Record<string, unknown>>("projects"),
  ) as Project[];
}

export function getFeaturedProjects(limit = 3): Project[] {
  const featured = getProjects().filter((p) => p.featured);
  return featured.length > 0 ? featured.slice(0, limit) : getProjects().slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug);
}
