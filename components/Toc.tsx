"use client";

import { useEffect, useState } from "react";

export default function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-label">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={active === h.id ? "active" : ""}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
