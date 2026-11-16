"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import type { DocMeta } from "@/lib/docs";
import { site } from "@/lib/site";
import SectionIcon from "@/components/SectionIcon";

// Overview, then one dropdown per section. The section of the open doc starts open;
// the rest start closed. Each heading opens or closes its own list.
export default function Sidebar({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false); // mobile menu
  const [toggled, setToggled] = useState<Record<string, boolean>>({}); // dropdowns opened/closed by hand
  const onHome = pathname === "/" || pathname === "";
  const activeSlug = pathname.match(/^\/docs\/([^/]+)/)?.[1];
  const activeSection = docs.find((d) => d.slug === activeSlug)?.section;
  const close = () => setOpen(false);

  // On every page change: close the mobile menu, and make sure the current doc's section is open.
  useEffect(() => {
    setOpen(false);
    if (activeSection) setToggled((t) => (t[activeSection] === false ? { ...t, [activeSection]: true } : t));
  }, [pathname, activeSection]);

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

      <div className="side-menu">
        <nav className="side-nav">
          <Link href="/" className={`side-item side-top${onHome ? " active" : ""}`} onClick={close}>
            <LayoutGrid size={16} strokeWidth={2} aria-hidden />
            <span>Overview</span>
          </Link>

          {site.sections.map((sec) => {
            const secDocs = docs.filter((d) => d.section === sec.id);
            if (!secDocs.length) return null;
            const isOpen = toggled[sec.id] ?? sec.id === activeSection;
            const hasActive = sec.id === activeSection;
            const panelId = `side-panel-${sec.id}`;
            return (
              <div key={sec.id} className="side-block">
                <button
                  type="button"
                  className={`side-drop${isOpen ? " open" : ""}${hasActive ? " has-active" : ""}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setToggled((t) => ({ ...t, [sec.id]: !isOpen }))}
                >
                  <SectionIcon id={sec.id} size={16} />
                  <span className="side-drop-name">{sec.title}</span>
                  <span className="side-count">{secDocs.length}</span>
                  <ChevronDown size={15} strokeWidth={2.2} className="side-chev" aria-hidden />
                </button>
                <div id={panelId} className={`side-panel${isOpen ? " open" : ""}`} inert={!isOpen}>
                  <div className="side-panel-inner">
                    {secDocs.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/docs/${d.slug}/`}
                        className={`side-item${d.slug === activeSlug ? " active" : ""}`}
                        aria-current={d.slug === activeSlug ? "page" : undefined}
                        onClick={close}
                      >
                        {d.short}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="side-foot">
          <a href={site.mainSite} target="_blank" rel="noreferrer" className="side-item side-top" onClick={close}>
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
            <span>isuite.ai</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
