"use client";

import { useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Languages } from "lucide-react";
import Toc from "@/components/Toc";
import PrintButton from "@/components/PrintButton";
import TeamCalendar from "@/components/TeamCalendar";
import OrgChart from "@/components/OrgChart";
import PhaseTimeline from "@/components/PhaseTimeline";
import SectionIcon from "@/components/SectionIcon";
import type { Heading } from "@/lib/docs";

type Lang = "en" | "ta";

// Visual blocks a doc can place with a fenced code block, e.g.
//   ```team-calendar
//   ```
const widgets: Record<string, ComponentType> = {
  "team-calendar": TeamCalendar,
  "org-chart": OrgChart,
  "phase-timeline": PhaseTimeline,
};

// Finds the language of a fenced code block from react-markdown's <pre> node.
function fenceLanguage(node: unknown): string | undefined {
  const first = (node as { children?: unknown[] } | undefined)?.children?.[0] as
    | { type?: string; tagName?: string; properties?: { className?: unknown } }
    | undefined;
  if (!first || first.type !== "element" || first.tagName !== "code") return undefined;
  const cls = first.properties?.className;
  const list = Array.isArray(cls) ? cls.map(String) : typeof cls === "string" ? cls.split(" ") : [];
  return list.find((c) => c.startsWith("language-"))?.slice("language-".length);
}

export default function DocView({
  title,
  summary,
  status,
  updatedLabel,
  body,
  headings,
  bodyTa,
  headingsTa,
  toc = true,
  section,
}: {
  section?: { id: string; title: string };
  title: string;
  summary: string;
  status: string;
  updatedLabel: string;
  body: string;
  headings: Heading[];
  bodyTa: string | null;
  headingsTa: Heading[] | null;
  toc?: boolean;
}) {
  const hasTa = Boolean(bodyTa && headingsTa);
  const [lang, setLang] = useState<Lang>("en"); // English is the default

  // Restore the reader's last choice (per browser).
  useEffect(() => {
    if (!hasTa) return;
    try {
      const saved = localStorage.getItem("doc-lang");
      if (saved === "ta" || saved === "en") setLang(saved);
    } catch {
      /* ignore */
    }
  }, [hasTa]);

  function choose(next: Lang) {
    setLang(next);
    try {
      localStorage.setItem("doc-lang", next);
    } catch {
      /* ignore */
    }
  }

  const showTa = lang === "ta" && hasTa;
  const activeBody = showTa ? (bodyTa as string) : body;
  const activeHeadings = showTa ? (headingsTa as Heading[]) : headings;

  return (
    <div className={`doc-layout${toc ? "" : " no-toc"}`}>
      <article className="doc">
        <header className="doc-head">
          <div className="doc-meta">
            {section && (
              <Link href={`/#${section.id}`} className="doc-section">
                <SectionIcon id={section.id} size={14} />
                {section.title}
              </Link>
            )}
            {status && <span className="pill">{status}</span>}
            <span>Updated {updatedLabel}</span>
            {hasTa && (
              <div className="lang-toggle" role="group" aria-label="Language">
                <Languages size={14} strokeWidth={2} className="lang-toggle-icon" aria-hidden />
                <button
                  type="button"
                  className={`lang-opt${!showTa ? " active" : ""}`}
                  aria-pressed={!showTa}
                  onClick={() => choose("en")}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`lang-opt${showTa ? " active" : ""}`}
                  aria-pressed={showTa}
                  onClick={() => choose("ta")}
                >
                  Tanglish
                </button>
              </div>
            )}
            <PrintButton />
          </div>
          <h1 className="doc-title">{title}</h1>
          {summary && <p className="doc-summary">{summary}</p>}
        </header>
        <div className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              table: ({ children }) => (
                <div className="table-wrap">
                  <table>{children}</table>
                </div>
              ),
              pre: ({ node, children, ...rest }) => {
                const lang = fenceLanguage(node);
                const Widget = lang ? widgets[lang] : undefined;
                if (Widget) {
                  return (
                    <div className="widget">
                      <Widget />
                    </div>
                  );
                }
                return <pre {...rest}>{children}</pre>;
              },
            }}
          >
            {activeBody}
          </ReactMarkdown>
        </div>
      </article>
      {/* Remount the TOC on language switch so active-tracking re-initialises. */}
      {toc && <Toc key={showTa ? "ta" : "en"} headings={activeHeadings} />}
    </div>
  );
}
