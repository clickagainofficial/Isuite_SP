"use client";

import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { phases, phaseOn, formatRange, fromISO, planStart, planEnd } from "@/lib/team-plan";
import { useToday } from "@/lib/use-today";

const shortDate = (iso: string) => fromISO(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

// One line on the Overview page: where the team plan is today and what is next.
// Today's and the next 7 days' work are in TodayWeek, just below.
export default function NowBanner() {
  const today = useToday();

  const phase = today ? phaseOn(today) : undefined;
  const next = phase ? phases[phases.indexOf(phase) + 1] : undefined;

  let tag = "Team plan";
  let main = formatRange(planStart, planEnd);
  let sub = "";
  if (today && phase) {
    tag = "Now";
    main = `${phase.label} · ${formatRange(phase.start, phase.end)}`;
    sub = next ? `Next: ${next.label} from ${shortDate(next.start)}` : "Last phase of the plan";
  } else if (today && today < planStart) {
    tag = "Soon";
    main = `Team plan starts ${shortDate(planStart)}`;
  } else if (today && today > planEnd) {
    tag = "Done";
    main = `Team plan ended ${shortDate(planEnd)}`;
  }

  return (
    <section className="now" aria-label="Where the team plan is">
      <div className="now-main">
        <span className="now-tag">{tag}</span>
        <div className="now-text">
          <strong>{main}</strong>
          {sub && <span className="now-sub">{sub}</span>}
        </div>
      </div>
      <Link href="/docs/team-calendar/" className="now-link">
        <CalendarDays size={15} strokeWidth={2} aria-hidden />
        Team calendar
        <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
      </Link>
    </section>
  );
}
