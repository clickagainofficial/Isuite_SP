import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="topbar">
      <span className="topbar-title">{site.section}</span>
      <nav className="topbar-actions">
        <a href={`mailto:${site.email}`} className="btn-ghost">
          <Mail size={15} strokeWidth={2} aria-hidden />
          Email us
        </a>
        <a href={site.whatsapp} className="btn" target="_blank" rel="noreferrer">
          <MessageCircle size={15} strokeWidth={2} aria-hidden />
          WhatsApp us
        </a>
      </nav>
    </header>
  );
}
