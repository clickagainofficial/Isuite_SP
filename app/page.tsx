import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllDocs } from "@/lib/docs";
import { site } from "@/lib/site";
import SectionIcon from "@/components/SectionIcon";
import NowBanner from "@/components/NowBanner";

export default function Home() {
  const docs = getAllDocs();

  return (
    <div className="home">
      <header className="home-head">
        <h1 className="home-h1">
          {site.name} {site.section}
        </h1>
        <p className="home-sub">
          Everything the team needs, in {site.sections.length} sections. For the team only: send partner documents to
          partners as PDFs.
        </p>
      </header>

      <NowBanner />

      <div className="sec-grid">
        {site.sections.map((sec) => {
          const secDocs = docs.filter((d) => d.section === sec.id);
          if (!secDocs.length) return null;
          return (
            <section key={sec.id} id={sec.id} className="sec-card" aria-labelledby={`sec-${sec.id}`}>
              <div className="sec-head">
                <span className="sec-icon">
                  <SectionIcon id={sec.id} size={18} />
                </span>
                <div>
                  <h2 id={`sec-${sec.id}`} className="sec-title">
                    {sec.title}
                  </h2>
                  <p className="sec-blurb">{sec.blurb}</p>
                </div>
              </div>
              <ul className="sec-list">
                {secDocs.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/docs/${d.slug}/`} className="sec-link">
                      <span>{d.short}</span>
                      <ChevronRight size={16} strokeWidth={2} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
