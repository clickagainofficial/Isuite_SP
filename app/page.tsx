import Link from "next/link";
import { getAllDocs, formatDate } from "@/lib/docs";

export default function Home() {
  const docs = getAllDocs();
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
      </section>

      <div className="doc-cards">
        {docs.map((d, i) => (
          <Link key={d.slug} href={`/docs/${d.slug}/`} className="doc-card">
            <span className="doc-card-num">{String(i + 1).padStart(2, "0")}</span>
            <h2>{d.title}</h2>
            <p>{d.summary}</p>
            <span className="doc-card-meta">
              {d.status && <span className="pill">{d.status}</span>}
              Updated {formatDate(d.updated)}
            </span>
            <span className="doc-card-go" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
