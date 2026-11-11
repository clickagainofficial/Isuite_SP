import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/Toc";
import PrintButton from "@/components/PrintButton";
import { getAllDocs, getDoc, formatDate } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return { title: doc?.title ?? "Not found" };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return (
    <div className="doc-layout">
      <article className="doc">
        <header className="doc-head">
          <div className="doc-meta">
            {doc.status && <span className="pill">{doc.status}</span>}
            <span>Updated {formatDate(doc.updated)}</span>
            <PrintButton />
          </div>
          <h1 className="doc-title">{doc.title}</h1>
          {doc.summary && <p className="doc-summary">{doc.summary}</p>}
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
            {doc.body}
          </ReactMarkdown>
        </div>
      </article>
      <Toc headings={doc.headings} />
    </div>
  );
}
