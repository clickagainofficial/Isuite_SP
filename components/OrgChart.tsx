import Link from "next/link";
import { gmRole, teamRoles } from "@/lib/team-plan";

// Team structure: the General Manager and the 5 team roles.
export default function OrgChart() {
  return (
    <div className="org">
      <div className="org-lead">
        <Link href={`/docs/${gmRole.slug}/`} className="org-lead-main">
          <span className="org-kicker">Leads the team</span>
          <span className="org-name">{gmRole.name}</span>
          <span className="org-line">{gmRole.line}</span>
        </Link>
      </div>
      <div className="org-row">
        {teamRoles.map((r) => (
          <Link key={r.slug} href={`/docs/${r.slug}/`} className="org-card">
            <span className="org-name">{r.name}</span>
            <span className="org-line">{r.line}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
