import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-pill">
        <Link href="/" className="logo" aria-label={`${site.name} ${site.section} home`}>
          <span className="logo-mark">i</span>
          <span className="logo-text">
            iSuite <span className="logo-ai">AI</span>
          </span>
          <span className="logo-divider" aria-hidden />
          <span className="logo-section">{site.section}</span>
        </Link>
        <nav className="header-actions">
          <a href={site.mainSite} className="btn-ghost" target="_blank" rel="noreferrer">
            isuite.ai
          </a>
          <a href={site.whatsapp} className="btn" target="_blank" rel="noreferrer">
            WhatsApp us
          </a>
        </nav>
      </div>
    </header>
  );
}
