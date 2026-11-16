"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useToday } from "@/lib/use-today";
import {
  buildEvents,
  dailyEvents,
  dailyFrom,
  festivalOn,
  formatRange,
  fromISO,
  hasDaily,
  phaseOn,
  planEnd,
  planStart,
  toISO,
  type DayEvent,
} from "@/lib/team-plan";

type Row = Pick<DayEvent, "title" | "time" | "owner" | "about" | "link"> & { category?: DayEvent["category"] };

const DAYS_AHEAD = 7;

function addDays(iso: string, n: number): string {
  const d = fromISO(iso);
  return toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
}

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => fromISO(iso).toLocaleDateString("en-IN", opts);
const daysBetween = (a: string, b: string) => Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86_400_000);

// "10:30 AM" -> minutes after midnight. Untimed items sort first.
function minutes(t?: string): number {
  const m = t?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return -1;
  return ((Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(m[2]);
}

function rowsFor(iso: string, events: Record<string, DayEvent[]>, withDaily: boolean): Row[] {
  const rows: Row[] = [...(events[iso] ?? [])];
  if (withDaily && hasDaily(iso)) rows.push(...dailyEvents);
  return rows.sort((a, b) => minutes(a.time) - minutes(b.time));
}

function closedNote(iso: string): string | null {
  if (fromISO(iso).getDay() === 0) return "Sunday. Office closed.";
  const f = festivalOn(iso);
  return f?.closed ? `${f.title}. Office holiday.` : null;
}

function relative(today: string, iso: string): string {
  const n = daysBetween(today, iso);
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  if (n === -1) return "Yesterday";
  return n > 0 ? `In ${n} days` : `${-n} days ago`;
}

// Overview: a small strip of today + the next 7 days. Tap a date to open its plan with explanations.
export default function TodayWeek() {
  const today = useToday();
  const events = useMemo(() => buildEvents(), []);
  const [open, setOpen] = useState<string | null>(null);

  if (!today) {
    return <section className="wk wk-loading" aria-busy="true" aria-label="Today and the next 7 days" />;
  }

  const days = Array.from({ length: DAYS_AHEAD + 1 }, (_, i) => addDays(today, i));

  // The next milestone after today, with a countdown.
  const next = Object.keys(events)
    .filter((iso) => iso > today)
    .sort()
    .map((iso) => ({ iso, e: events[iso].find((e) => e.category === "milestone") }))
    .find((x) => x.e);

  return (
    <section className="wk" aria-labelledby="wk-title">
      <div className="wk-head">
        <div className="wk-titles">
          <h2 id="wk-title" className="wk-title">
            This week
          </h2>
          <span className="wk-range">
            {fmt(days[0], { day: "numeric", month: "short" })} – {fmt(days[days.length - 1], { day: "numeric", month: "short" })}
          </span>
        </div>
        {next?.e && (
          <button type="button" className="wk-next" onClick={() => setOpen(next.iso)}>
            <span className="wk-next-label">Next milestone</span>
            <span className="wk-next-title">{next.e.title}</span>
            <span className="wk-next-when">
              {fmt(next.iso, { day: "numeric", month: "short" })} · {relative(today, next.iso).toLowerCase()}
            </span>
          </button>
        )}
      </div>

      <ol className="wk-strip">
        {days.map((iso) => {
          const rows = rowsFor(iso, events, false);
          const closed = closedNote(iso);
          const fest = festivalOn(iso);
          const isToday = iso === today;
          const label = `${fmt(iso, { weekday: "long", day: "numeric", month: "long" })}${isToday ? ", today" : ""}: ${
            closed ?? (rows.length ? rows.map((r) => r.title).join(", ") : "nothing fixed")
          }. Open details.`;
          return (
            <li key={iso}>
              <button
                type="button"
                className={`wk-day${isToday ? " is-today" : ""}${closed ? " is-closed" : ""}`}
                onClick={() => setOpen(iso)}
                aria-label={label}
              >
                <span className="wk-wd">{isToday ? "Today" : fmt(iso, { weekday: "short" })}</span>
                <span className="wk-num">{fromISO(iso).getDate()}</span>
                <span className="wk-mon">{fmt(iso, { month: "short" })}</span>
                <span className="wk-chips" aria-hidden>
                  {closed ? (
                    <span className="wk-off">{fest?.closed ? fest.title : "Off"}</span>
                  ) : (
                    <>
                      {rows.slice(0, 1).map((r, k) => (
                        <span key={k} className={`wk-chip cat-${r.category}`}>
                          {r.title}
                        </span>
                      ))}
                      {rows.length > 1 && <span className="wk-more">+{rows.length - 1} more</span>}
                    </>
                  )}
                </span>
                <span className="wk-dots" aria-hidden>
                  {rows.map((r, k) => (
                    <i key={k} className={`cat-${r.category}`} />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="wk-hint">Tap a date to see the plan and what each item means.</p>

      <DayModal iso={open} today={today} events={events} onChange={setOpen} />
    </section>
  );
}

function DayModal({
  iso,
  today,
  events,
  onChange,
}: {
  iso: string | null;
  today: string;
  events: Record<string, DayEvent[]>;
  onChange: (iso: string | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // Open and close the native dialog (focus trap, Esc and backdrop come with it).
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (iso && !d.open) d.showModal();
    if (!iso && d.open) d.close();
  }, [iso]);

  const rows = iso ? rowsFor(iso, events, true) : [];
  const closed = iso ? closedNote(iso) : null;
  const fest = iso ? festivalOn(iso) : undefined;
  const phase = iso ? phaseOn(iso) : undefined;
  const prev = iso && iso > planStart ? addDays(iso, -1) : null;
  const nextDay = iso && iso < planEnd ? addDays(iso, 1) : null;

  let note: string | null = null;
  if (iso && iso < planStart) note = "This day is before the team plan starts.";
  else if (iso && iso > planEnd) note = "This day is after the 90-day plan.";
  else if (iso && !closed && iso < dailyFrom)
    note = `The 10:30 AM morning meeting and 6:00 PM KPI update start on ${fmt(dailyFrom, { day: "numeric", month: "long" })}.`;

  return (
    <dialog
      ref={ref}
      className="dm"
      aria-labelledby="dm-date"
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null); // click on the backdrop
      }}
    >
      {iso && (
        <div className="dm-inner">
          <header className="dm-head">
            <div className="dm-titles">
              <span className="dm-rel">{relative(today, iso)}</span>
              <h2 id="dm-date" className="dm-date">
                {fmt(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </h2>
              <span className="dm-tags">
                {phase && (
                  <span className="dm-phase">
                    {phase.label} · {formatRange(phase.start, phase.end)}
                  </span>
                )}
                {fest && <span className="dm-fest">{fest.title}</span>}
              </span>
            </div>
            <button type="button" className="dm-close" onClick={() => onChange(null)} aria-label="Close">
              <X size={18} strokeWidth={2.2} aria-hidden />
            </button>
          </header>

          <div className="dm-body">
            {closed && <p className="dm-closed">{closed}</p>}
            {rows.length > 0 ? (
              <ul className="dm-list">
                {rows.map((r, k) => (
                  <li key={k} className={`dm-ev${r.category ? ` cat-${r.category}` : " is-daily"}`}>
                    <div className="dm-ev-top">
                      {r.time && <span className="dm-ev-time">{r.time}</span>}
                      <span className="dm-ev-title">{r.title}</span>
                    </div>
                    {r.owner && (
                      <p className="dm-ev-owner">
                        <span>Who:</span> {r.owner}
                      </p>
                    )}
                    {r.about && <p className="dm-ev-about">{r.about}</p>}
                    {r.link && (
                      <Link href={r.link.href} className="dm-ev-link" onClick={() => onChange(null)}>
                        {r.link.label}
                        <ArrowRight size={13} strokeWidth={2.2} aria-hidden />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !closed && <p className="dm-empty">Nothing fixed on the calendar for this day.</p>
            )}
            {note && <p className="dm-note">{note}</p>}
          </div>

          <footer className="dm-foot">
            <button type="button" className="dm-nav" disabled={!prev} onClick={() => prev && onChange(prev)}>
              <ChevronLeft size={16} strokeWidth={2.2} aria-hidden />
              {prev ? fmt(prev, { weekday: "short", day: "numeric", month: "short" }) : "Start"}
            </button>
            <Link href="/docs/team-calendar/" className="dm-cal" onClick={() => onChange(null)}>
              <CalendarDays size={14} strokeWidth={2} aria-hidden />
              Full calendar
            </Link>
            <button type="button" className="dm-nav" disabled={!nextDay} onClick={() => nextDay && onChange(nextDay)}>
              {nextDay ? fmt(nextDay, { weekday: "short", day: "numeric", month: "short" }) : "End"}
              <ChevronRight size={16} strokeWidth={2.2} aria-hidden />
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
}
