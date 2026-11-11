import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="topbar">
      <span className="topbar-title">{site.section}</span>
      <nav className="topbar-actions">
        <a href={`mailto:${site.email}`} className="btn-ghost">
          Email us
        </a>
        <a href={site.whatsapp} className="btn" target="_blank" rel="noreferrer">
          WhatsApp us
        </a>
      </nav>
    </header>
  );
}
