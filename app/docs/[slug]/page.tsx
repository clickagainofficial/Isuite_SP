import { notFound } from "next/navigation";
import DocView from "@/components/DocView";
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
    <DocView
      title={doc.title}
      summary={doc.summary}
      status={doc.status}
      updatedLabel={formatDate(doc.updated)}
      body={doc.body}
      headings={doc.headings}
      bodyTa={doc.bodyTa}
      headingsTa={doc.headingsTa}
    />
  );
}
