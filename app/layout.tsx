import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAllDocs } from "@/lib/docs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name} ${site.section}`, template: `%s · ${site.name} ${site.section}` },
  description: "Rules, agreements and guides for iSuite AI Solution Partners.",
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#fff6f0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocs();
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="shell">
          <Sidebar docs={docs} upcoming={site.upcoming} />
          <main className="main">{children}</main>
        </div>
        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} {site.name} · Madurai, Tamil Nadu
          </span>
          <span>
            Questions? <a href={site.whatsapp}>WhatsApp</a> · <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
