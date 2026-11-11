"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocMeta } from "@/lib/docs";

export default function Sidebar({ docs, upcoming }: { docs: DocMeta[]; upcoming: string[] }) {
  const pathname = usePathname() ?? "";
  const existing = new Set(docs.map((d) => d.short.toLowerCase()));
  const soon = upcoming.filter((u) => !existing.has(u.toLowerCase()));

  return (
    <aside className="sidebar" aria-label="Documents">
      <p className="sidebar-label">Documents</p>
      <ul className="tab-list">
        {docs.map((d, i) => {
          const active = pathname.startsWith(`/docs/${d.slug}`);
          return (
            <li key={d.slug}>
              <Link href={`/docs/${d.slug}/`} className={`tab${active ? " active" : ""}`}>
                <span className="tab-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tab-name">{d.short}</span>
                {d.status && <span className="tab-status">{d.status}</span>}
              </Link>
            </li>
          );
        })}
        {soon.map((name, i) => (
          <li key={name}>
            <span className="tab disabled" aria-disabled>
              <span className="tab-num">{String(docs.length + i + 1).padStart(2, "0")}</span>
              <span className="tab-name">{name}</span>
              <span className="tab-status soon">Soon</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
