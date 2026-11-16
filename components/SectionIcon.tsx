import { Handshake, Users, Target, ClipboardList, FileText } from "lucide-react";

// One icon per section (ids from site.sections).
const icons = {
  sp: Handshake,
  roles: Users,
  plan: Target,
  sops: ClipboardList,
} as const;

export default function SectionIcon({ id, size = 16 }: { id: string; size?: number }) {
  const Icon = icons[id as keyof typeof icons] ?? FileText;
  return <Icon size={size} strokeWidth={2} aria-hidden />;
}
