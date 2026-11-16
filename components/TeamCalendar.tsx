"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import {
  buildEvents,
  categories,
  dailyRhythm,
  festivalOn,
  formatRange,
  fromISO,
  isWorkingDay,
  phaseForMonth,
  planEnd,
  planMonths,
  planStart,
  toISO,
  type DayEvent,
} from "@/lib/team-plan";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Daily meeting and KPI update run from the first training day.
const DAILY_FROM = "2026-12-01";

function monthName(year: number, month: number, style: "long" | "short" = "long") {
  return new Date(year, month, 1).toLocaleDateString("en-IN", { month: style, year: "numeric" });
}

function longDate(iso: string) {
  return fromISO(iso).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function shortDay(iso: string) {
  const d = fromISO(iso);
  return { weekday: d.toLocaleDateString("en-IN", { weekday: "short" }), day: d.getDate() };
}

// Weeks of a month, Monday first, padded with days of the next and previous month.
function weeksOf(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7));
  const end = new Date(year, month, last.getDate() + (6 - ((last.getDay() + 6) % 7)));
  const weeks: Date[][] = [];
  for (let d = start; d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
    if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) weeks.push([]);
    weeks[weeks.length - 1].push(d);
  }
  return weeks;
}

function dayNote(iso: string): string | null {
  const d = fromISO(iso);
  const fest = festivalOn(iso);
  if (iso < planStart) return "Before the plan starts on 15 Nov 2026.";
  if (iso > planEnd) return "After the 90-day plan.";
  if (d.getDay() === 0) return "Sunday. Office closed.";
  if (fest?.closed) return `${fest.title}. Office holiday.`;
  return null;
}

function EventRow({ e }: { e: Pick<DayEvent, "title" | "time" | "owner"> & { category?: DayEvent["category"] } }) {
  return (
    <div className={`cal-ev${e.category ? ` cat-${e.category}` : " is-daily"}`}>
      <span className="cal-ev-time">{e.time ?? ""}</span>
      <span className="cal-ev-body">
        <span className="cal-ev-title">{e.title}</span>
        {e.owner && <span className="cal-ev-owner">{e.owner}</span>}
      </span>
    </div>
  );
}

export default function TeamCalendar() {
  const events = useMemo(() => buildEvents(), []);
  const [active, setActive] = useState(0);
  const [today, setToday] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Open on the current month when it is part of the plan.
  useEffect(() => {
    const now = new Date();
    const iso = toISO(now);
    setToday(iso);
    const i = planMonths.findIndex((p) => p.year === now.getFullYear() && p.month === now.getMonth());
    if (i >= 0) setActive(i);
    else if (iso > planEnd) setActive(planMonths.length - 1);
  }, []);

  return (
    <div className="cal">
      <div className="cal-tabs" role="tablist" aria-label="Month">
        {planMonths.map((pm, i) => {
          const phase = phaseForMonth(pm.year, pm.month);
          return (
            <button
              key={`${pm.year}-${pm.month}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`cal-tab${i === active ? " active" : ""}`}
              onClick={() => {
                setActive(i);
                setSelected(null);
              }}
            >
              <span className="cal-tab-month">{monthName(pm.year, pm.month, "short")}</span>
              <span className="cal-tab-phase">{phase?.name}</span>
            </button>
          );
        })}
      </div>

      <div className="cal-daily">
        <span className="cal-daily-label">
          <Clock size={14} strokeWidth={2.2} aria-hidden /> Every working day
        </span>
        {dailyRhythm.map((r) => (
          <span key={r.title} className="cal-daily-item" title={r.note}>
            <strong>{r.time}</strong> {r.title}
          </span>
        ))}
        <span className="cal-daily-item">
          <strong>Mon–Sat</strong> Sunday off
        </span>
      </div>

      {planMonths.map((pm, i) => (
        <MonthView
          key={`${pm.year}-${pm.month}`}
          year={pm.year}
          month={pm.month}
          isActive={i === active}
          events={events}
          today={today}
          selected={selected}
          onSelect={setSelected}
        />
      ))}

      <div className="cal-legend" aria-label="Colour key">
        {categories.map((c) => (
          <span key={c.id} className={`cal-legend-item cat-${c.id}`}>
            <i aria-hidden /> {c.label}
          </span>
        ))}
        <span className="cal-legend-item is-fest">
          <i aria-hidden /> Festival / holiday
        </span>
      </div>
    </div>
  );
}

function MonthView({
  year,
  month,
  isActive,
  events,
  today,
  selected,
  onSelect,
}: {
  year: number;
  month: number;
  isActive: boolean;
  events: Record<string, DayEvent[]>;
  today: string | null;
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  const phase = phaseForMonth(year, month);
  const weeks = weeksOf(year, month);
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const inMonth = (iso: string) => iso.startsWith(monthKey);

  // The day shown in the detail panel: the picked day, else today, else the first planned day.
  const firstPlanned = Object.keys(events)
    .filter(inMonth)
    .sort()[0];
  const shownDay =
    selected && inMonth(selected) ? selected : today && inMonth(today) ? today : (firstPlanned ?? `${monthKey}-01`);

  const keyDates = [
    ...Object.entries(events)
      .filter(([iso]) => inMonth(iso))
      .flatMap(([iso, list]) => list.filter((e) => e.kind !== "weekly").map((e) => ({ iso, ...e, fest: false }))),
    ...weeks
      .flat()
      .map(toISO)
      .filter(inMonth)
      .map((iso) => ({ iso, f: festivalOn(iso) }))
      .filter((x) => x.f)
      .map(({ iso, f }) => ({
        iso,
        title: f!.closed ? `${f!.title} (office holiday)` : f!.title,
        fest: true,
        category: undefined,
        owner: undefined,
      })),
  ].sort((a, b) => (a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : 0));

  const shownList = events[shownDay] ?? [];
  const shownFest = festivalOn(shownDay);
  const shownNote = dayNote(shownDay);
  const showDaily = shownDay >= DAILY_FROM && shownDay <= planEnd && isWorkingDay(fromISO(shownDay));

  return (
    <section className={`cal-month${isActive ? " is-active" : ""}`} aria-label={monthName(year, month)}>
      <div className="cal-head">
        <h3 className="cal-title">
          <CalendarDays size={18} strokeWidth={2} aria-hidden /> {monthName(year, month)}
        </h3>
        {phase && (
          <div className="cal-phase">
            <span className="cal-phase-tag">
              {phase.label} · {phase.name}
            </span>
            <span className="cal-phase-dates">{formatRange(phase.start, phase.end)}</span>
            <span className="cal-phase-sum">{phase.summary}</span>
          </div>
        )}
      </div>

      <div className="cal-grid" role="grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className={`cal-wd${w === "Sun" ? " is-sun" : ""}`} role="columnheader">
            {w}
          </div>
        ))}
        {weeks.flat().map((d) => {
          const iso = toISO(d);
          if (!inMonth(iso)) return <div key={iso} className="cal-cell is-out" aria-hidden />;
          const list = events[iso] ?? [];
          const fest = festivalOn(iso);
          const cls = [
            "cal-cell",
            d.getDay() === 0 ? "is-sun" : "",
            fest?.closed ? "is-closed" : "",
            iso < planStart || iso > planEnd ? "is-before" : "",
            iso === today ? "is-today" : "",
            iso === shownDay ? "is-selected" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const label = `${longDate(iso)}${fest ? `, ${fest.title}` : ""}: ${list.length ? list.map((e) => e.title).join(", ") : "nothing planned"}`;
          return (
            <button key={iso} type="button" className={cls} onClick={() => onSelect(iso)} aria-label={label} aria-pressed={iso === shownDay}>
              <span className="cal-num">
                {d.getDate()}
                {iso === today && <span className="cal-today">Today</span>}
              </span>
              {fest && <span className="cal-fest">{fest.title}</span>}
              <span className="cal-chips">
                {list.slice(0, 3).map((e, k) => (
                  <span key={k} className={`cal-chip cat-${e.category}`} title={`${e.time ? `${e.time} · ` : ""}${e.title}`}>
                    {e.title}
                  </span>
                ))}
                {list.length > 3 && <span className="cal-more">+{list.length - 3} more</span>}
              </span>
              <span className="cal-dots" aria-hidden>
                {list.map((e, k) => (
                  <i key={k} className={`cat-${e.category}`} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="cal-bottom">
        <div className="cal-day" aria-live="polite">
          <div className="cal-day-head">
            <span className="cal-day-date">{longDate(shownDay)}</span>
            {shownFest && <span className="cal-fest-pill">{shownFest.title}</span>}
          </div>
          {shownNote && <p className="cal-day-note">{shownNote}</p>}
          {showDaily && <EventRow e={{ time: "10:30 AM", title: "Morning meeting + pledge", owner: "Admin & HR" }} />}
          {shownList.map((e, k) => (
            <EventRow key={k} e={e} />
          ))}
          {showDaily && <EventRow e={{ time: "6:00 PM", title: "KPI update", owner: "Everyone → Admin & HR" }} />}
          {!shownList.length && !showDaily && !shownNote && <p className="cal-day-note">Nothing planned.</p>}
        </div>

        <div className="cal-keys">
          <p className="cal-keys-title">Key dates in {monthName(year, month, "short")}</p>
          {keyDates.length === 0 && <p className="cal-day-note">No key dates.</p>}
          {keyDates.map((k, idx) => {
            const sd = shortDay(k.iso);
            return (
              <button
                key={idx}
                type="button"
                className={`cal-key${k.fest ? " is-fest" : ` cat-${k.category}`}`}
                onClick={() => onSelect(k.iso)}
              >
                <span className="cal-key-date">
                  <span>{sd.weekday}</span>
                  <strong>{sd.day}</strong>
                </span>
                <span className="cal-key-body">
                  <span className="cal-key-title">{k.title}</span>
                  {k.owner && <span className="cal-key-owner">{k.owner}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
