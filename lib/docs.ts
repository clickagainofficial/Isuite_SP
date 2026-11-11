import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type DocMeta = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  order: number;
  updated: string;
  status: string;
};

export type Doc = DocMeta & {
  body: string;
  headings: { id: string; text: string }[];
};

function readFile(file: string): Doc {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  // Same slug rules as rehype-slug, so "On this page" links match the headings.
  const slugger = new GithubSlugger();
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      return { id: slugger.slug(text), text };
    });

  const updated =
    data.updated instanceof Date
      ? data.updated.toISOString().slice(0, 10)
      : String(data.updated ?? "");

  return {
    slug,
    title: String(data.title ?? slug),
    short: String(data.short ?? data.title ?? slug),
    summary: String(data.summary ?? ""),
    order: Number(data.order ?? 99),
    updated,
    status: String(data.status ?? ""),
    body: content,
    headings,
  };
}

export function getAllDocs(): DocMeta[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { body, headings, ...meta } = readFile(f);
      return meta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getDoc(slug: string): Doc | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DOCS_DIR, file))) return null;
  return readFile(file);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
