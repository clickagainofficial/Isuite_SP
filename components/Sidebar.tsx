"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, ArrowUpRight, Menu, X } from "lucide-react";
import type { DocMeta } from "@/lib/docs";
import { site } from "@/lib/site";

export default function Sidebar({ docs, upcoming }: { docs: DocMeta[]; upcoming: string[] }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const existing = new Set(docs.map((d) => d.short.toLowerCase()));
  const soon = upcoming.filter((u) => !existing.has(u.toLowerCase()));
  const onHome = pathname === "/" || pathname === "";

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <aside className={`side${open ? " open" : ""}`} aria-label="Documents">
      <div className="side-bar">
        <Link href="/" className="side-logo" aria-label={`${site.name} ${site.section} home`} onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/isuite-logo-white.webp" alt={site.name} className="side-logo-img" />
        </Link>
        <button
          type="button"
          className="side-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="side-menu" id="side-menu">
        <nav className="side-nav">
          <Link href="/" className={`side-item${onHome ? " active" : ""}`} onClick={close}>
            <span className="side-icon" aria-hidden>
              <LayoutGrid size={17} strokeWidth={2} />
            </span>
            <span className="side-name">Overview</span>
          </Link>

          <p className="side-section">Documents</p>
          {docs.map((d, i) => {
            const active = pathname.startsWith(`/docs/${d.slug}`);
            return (
              <Link
                key={d.slug}
                href={`/docs/${d.slug}/`}
                className={`side-item${active ? " active" : ""}`}
                onClick={close}
              >
                <span className="side-icon num">{String(i + 1).padStart(2, "0")}</span>
                <span className="side-name">{d.short}</span>
                {d.status && <span className="side-badge">{d.status}</span>}
              </Link>
            );
          })}

          {soon.length > 0 && <p className="side-section">Coming soon</p>}
          {soon.map((name, i) => (
            <span key={name} className="side-item disabled" aria-disabled>
              <span className="side-icon num">{String(docs.length + i + 1).padStart(2, "0")}</span>
              <span className="side-name">{name}</span>
            </span>
          ))}
        </nav>

        <div className="side-foot">
          <a href={site.mainSite} target="_blank" rel="noreferrer" className="side-item" onClick={close}>
            <span className="side-icon" aria-hidden>
              <ArrowUpRight size={17} strokeWidth={2} />
            </span>
            <span className="side-name">isuite.ai</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
