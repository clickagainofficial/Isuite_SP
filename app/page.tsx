import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllDocs, formatDate, type DocMeta } from "@/lib/docs";
import { site } from "@/lib/site";

export default function Home() {
  const docs = getAllDocs();
  // Docs with "status: Internal" are listed separately, below the partner docs.
  const isInternal = (d: DocMeta) => d.status.toLowerCase() === "internal";
  const partnerDocs = docs.filter((d) => !isInternal(d));
  const internalDocs = docs.filter(isInternal);

  const card = (d: DocMeta) => (
    <Link key={d.slug} href={`/docs/${d.slug}/`} className="doc-card">
      <span className="doc-card-num">{String(docs.indexOf(d) + 1).padStart(2, "0")}</span>
      <h2>{d.title}</h2>
      <p>{d.summary}</p>
      <span className="doc-card-meta">
        {d.status && <span className="pill">{d.status}</span>}
        Updated {formatDate(d.updated)}
      </span>
      <span className="doc-card-go" aria-hidden>
        <ArrowRight size={16} strokeWidth={2.2} />
      </span>
    </Link>
  );

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">iSuite AI · Solution Partners</p>
        <h1 className="hero-title">
          Bring clients.
          <br />
          <span className="accent">Earn on every renewal.</span>
        </h1>
        <p className="hero-sub">
          Everything a Solution Partner needs: how commission works, how payouts happen and the rules we all
          follow.
        </p>
        <p className="hero-note">{site.tagline}</p>
      </section>

      <div className="doc-cards">{partnerDocs.map(card)}</div>

      {internalDocs.length > 0 && (
        <>
          <h2 className="home-section">Internal</h2>
          <p className="home-section-sub">For the iSuite AI team. Not for partners.</p>
          <div className="doc-cards">{internalDocs.map(card)}</div>
        </>
      )}
    </div>
  );
}
