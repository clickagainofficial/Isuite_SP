import { useEffect, useState } from "react";
import { toISO } from "@/lib/team-plan";

// Today's date as "YYYY-MM-DD", set after mount so the server and the first client render match.
// "?date=2026-12-07" in the address bar previews any day of the plan.
export function useToday(): string | null {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("date");
    setToday(asked && /^\d{4}-\d{2}-\d{2}$/.test(asked) ? asked : toISO(new Date()));
  }, []);
  return today;
}
