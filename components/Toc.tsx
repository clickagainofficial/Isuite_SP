"use client";

import { useEffect, useState } from "react";

export default function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const ids = headings.map((h) => h.id);
    if (!ids.length) return;

    // Activation line below the sticky top bar; a heading counts as "reached"
    // once its top crosses this line. Active = the last heading reached. Kept a
    // little below the ~80px scroll-padding so a #hash target reliably registers.
    const offset = 140;

    function update() {
      // At (or very near) the bottom, always highlight the last heading so the
      // final short sections can become active.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
        else break;
      }
      setActive(current);
    }

    update();
    // Catch the position after the browser jumps to a #hash on first load.
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
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
