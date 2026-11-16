import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getAllDocs } from "@/lib/docs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name} ${site.section}`, template: `%s · ${site.name} ${site.section}` },
  description: "Solution Partner documents, roles, the team plan and SOPs for the iSuite AI team.",
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#001b4f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllDocs();
  return (
    <html lang="en">
      <body>
        <div className="app">
          <Sidebar docs={docs} />
          <div className="page">
            <main className="main">{children}</main>
            <footer className="site-footer">
              © {new Date().getFullYear()} {site.name} · For the iSuite AI team only
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
