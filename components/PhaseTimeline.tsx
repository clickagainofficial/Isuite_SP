"use client";

import { useEffect, useState } from "react";
import { phases, formatRange, toISO, type Phase } from "@/lib/team-plan";

// The 5 phases of the team plan, with the current one highlighted (based on the reader's date).
export default function PhaseTimeline() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(toISO(new Date()));
  }, []);

  const state = (p: Phase) => (!today ? "" : today > p.end ? "done" : today >= p.start ? "now" : "next");

  return (
    <div className="phase-line" role="list">
      {phases.map((p, i) => {
        const s = state(p);
        return (
          <div key={p.id} role="listitem" className={`phase${s ? ` is-${s}` : ""}`}>
            <div className="phase-top">
              <span className="phase-step">{i + 1}</span>
              <span className="phase-label">{p.label}</span>
              {s === "now" && <span className="phase-now">Now</span>}
            </div>
            <div className="phase-name">{p.name}</div>
            <div className="phase-dates">{formatRange(p.start, p.end)}</div>
            <div className="phase-sum">{p.summary}</div>
          </div>
        );
      })}
    </div>
  );
}
