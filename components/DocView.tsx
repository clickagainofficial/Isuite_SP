"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Languages } from "lucide-react";
import Toc from "@/components/Toc";
import PrintButton from "@/components/PrintButton";
import type { Heading } from "@/lib/docs";

type Lang = "en" | "ta";

export default function DocView({
  title,
  summary,
  status,
  updatedLabel,
  body,
  headings,
  bodyTa,
  headingsTa,
}: {
  title: string;
  summary: string;
  status: string;
  updatedLabel: string;
  body: string;
  headings: Heading[];
  bodyTa: string | null;
  headingsTa: Heading[] | null;
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
    <div className="doc-layout">
      <article className="doc">
        <header className="doc-head">
          <div className="doc-meta">
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
            }}
          >
            {activeBody}
          </ReactMarkdown>
        </div>
      </article>
      {/* Remount the TOC on language switch so active-tracking re-initialises. */}
      <Toc key={showTa ? "ta" : "en"} headings={activeHeadings} />
    </div>
  );
}
