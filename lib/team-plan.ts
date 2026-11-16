// Team Operating Plan data: phases, roles and the team calendar.
// Change dates, times and owners here. The written plan lives in content/docs/*.md.
// Dates are "YYYY-MM-DD". Months in `planMonths` use JavaScript numbering (0 = January).

export type Category = "milestone" | "money" | "partner" | "people" | "marketing" | "meeting";

export const categories: { id: Category; label: string }[] = [
  { id: "milestone", label: "Milestone" },
  { id: "money", label: "Money & approvals" },
  { id: "partner", label: "Solution Partners" },
  { id: "people", label: "People & training" },
  { id: "marketing", label: "Marketing" },
  { id: "meeting", label: "Team meeting" },
];

export type CalEvent = {
  title: string;
  category: Category;
  time?: string;
  owner?: string;
};

export type DayEvent = CalEvent & { kind: "weekly" | "monthly" | "once" };

// ---------- Phases ----------

export type Phase = {
  id: string;
  name: string;
  label: string;
  start: string;
  end: string;
  summary: string;
};

export const phases: Phase[] = [
  {
    id: "recruit",
    name: "Recruit",
    label: "Hiring",
    start: "2026-11-15",
    end: "2026-11-30",
    summary: "The GM hires Admin & HR first. Together they hire the Training Head, Marketing, Partner Relations and Customer Support.",
  },
  {
    id: "train",
    name: "Train",
    label: "Training",
    start: "2026-12-01",
    end: "2026-12-31",
    summary: "Role training with tests. SOPs, HR letters, ad creatives and demo videos ready. Test ads in the last week.",
  },
  {
    id: "launch",
    name: "Launch",
    label: "Month 1",
    start: "2027-01-01",
    end: "2027-01-31",
    summary: "Meta ads live in both funnels. Pongal campaign. Cost-per-lead check after 2 weeks.",
  },
  {
    id: "scale",
    name: "Scale",
    label: "Month 2",
    start: "2027-02-01",
    end: "2027-02-28",
    summary: "More spend on the ads that work. Push signed partners to their first sale.",
  },
  {
    id: "optimise",
    name: "Optimise",
    label: "Month 3",
    start: "2027-03-01",
    end: "2027-03-31",
    summary: "Cut weak ads, hit the 90-day targets and plan April to June.",
  },
];

export const planStart = "2026-11-15";
export const planEnd = "2027-03-31";

export const planMonths: { year: number; month: number }[] = [
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2027, month: 0 },
  { year: 2027, month: 1 },
  { year: 2027, month: 2 },
];

// ---------- Roles (org chart) ----------

export type RoleBox = { slug: string; name: string; line: string };

export const gmRole: RoleBox = {
  slug: "role-general-manager",
  name: "General Manager",
  line: "Growth, leads Marketing, every final approval",
};

export const teamRoles: RoleBox[] = [
  { slug: "role-admin-hr", name: "Admin & HR", line: "Hiring, HR letters, KPI board, accounts, payouts" },
  { slug: "role-training-head", name: "Training Head", line: "Result-oriented training for the team" },
  { slug: "role-marketing", name: "Marketing", line: "Meta ads, daily videos, demo videos, guides. Led by the GM" },
  { slug: "role-partner-relations", name: "Partner Relations", line: "Everything for Solution Partners" },
  { slug: "role-customer-support", name: "Customer Support", line: "Setup, support and 70% retention" },
];

// ---------- Daily rhythm (shown above the calendar) ----------

export const dailyRhythm: { time: string; title: string; note: string }[] = [
  { time: "9:30 / 10:30 AM", title: "Shift starts", note: "Each person picks 9:30 AM–6:30 PM or 10:30 AM–7:30 PM" },
  { time: "10:30 AM", title: "Morning meeting + pledge", note: "15 min, everyone. Yesterday's numbers, today's target" },
  { time: "6:00 PM", title: "KPI update", note: "Everyone sends numbers. Admin & HR updates the KPI board" },
];

// ---------- Holidays and festivals ----------
// `closed: true` = office holiday (no meetings). The GM confirms the final list.

export const festivals: { date: string; title: string; closed: boolean }[] = [
  { date: "2026-12-25", title: "Christmas", closed: true },
  { date: "2027-01-01", title: "New Year's Day", closed: false },
  { date: "2027-01-14", title: "Bhogi", closed: false },
  { date: "2027-01-15", title: "Pongal", closed: true },
  { date: "2027-01-16", title: "Thiruvalluvar Day", closed: true },
  { date: "2027-01-17", title: "Uzhavar Thirunal", closed: false },
  { date: "2027-01-26", title: "Republic Day", closed: true },
];

// ---------- Weekly rhythm ----------
// weekday: 0 = Sunday, 1 = Monday ... 6 = Saturday

const weekly: (CalEvent & { weekday: number; from: string; to: string })[] = [
  { weekday: 1, from: "2026-12-01", to: "2027-03-31", title: "Weekly planning", time: "10:45 AM", owner: "GM + team", category: "meeting" },
  { weekday: 3, from: "2027-01-01", to: "2027-03-31", title: "SP webinar", time: "4:00 PM", owner: "Partner Relations", category: "partner" },
  { weekday: 5, from: "2026-12-01", to: "2026-12-31", title: "Weekly training test", time: "5:00 PM", owner: "Training Head", category: "people" },
  { weekday: 5, from: "2027-01-01", to: "2027-03-31", title: "Weekly review + ad spend check", time: "5:00 PM", owner: "GM", category: "meeting" },
  { weekday: 6, from: "2026-12-01", to: "2027-03-31", title: "Video batch shoot", time: "11:00 AM", owner: "Marketing", category: "marketing" },
];

// ---------- Monthly rhythm ----------

type MonthlyRule =
  | "firstWorkingDay"
  | "payoutApproval"
  | "payoutDay"
  | "secondThursday"
  | "thirdSaturday"
  | "lastWorkingDay";

const monthly: (CalEvent & { rule: MonthlyRule; months: string[] })[] = [
  { rule: "firstWorkingDay", months: ["2027-01", "2027-02", "2027-03"], title: "Monthly targets set", owner: "GM", category: "meeting" },
  { rule: "payoutApproval", months: ["2027-02", "2027-03"], title: "GM approves SP payout list", owner: "GM", category: "money" },
  { rule: "payoutDay", months: ["2027-02", "2027-03"], title: "SP commission payout", owner: "Admin & HR", category: "money" },
  { rule: "secondThursday", months: ["2027-01", "2027-02", "2027-03"], title: "PR article release", owner: "Marketing", category: "marketing" },
  { rule: "thirdSaturday", months: ["2026-12", "2027-02", "2027-03"], title: "Team event: turf, movie or games", owner: "Admin & HR", category: "people" },
  { rule: "lastWorkingDay", months: ["2027-01", "2027-02", "2027-03"], title: "Top Performer award + budget review", owner: "Admin & HR, GM", category: "people" },
];

// ---------- One-off dates ----------

const oneOff: (CalEvent & { date: string })[] = [
  { date: "2026-11-16", title: "Hiring starts: Admin & HR first", owner: "GM", category: "people" },
  { date: "2026-11-30", title: "All 5 roles hired", owner: "GM, Admin & HR", category: "milestone" },
  { date: "2026-12-01", title: "Training month starts · regular salary starts", owner: "Training Head", category: "milestone" },
  { date: "2026-12-12", title: "SOPs and HR letters ready", owner: "Admin & HR", category: "people" },
  { date: "2026-12-18", title: "Ad creatives + 7 SP demo videos ready", owner: "Marketing", category: "marketing" },
  { date: "2026-12-21", title: "Test ads start (small budget)", owner: "Marketing", category: "marketing" },
  { date: "2026-12-31", title: "Final training tests + best trainee + budget review", owner: "Training Head, GM", category: "people" },
  { date: "2027-01-01", title: "Launch: Meta ads live in both funnels", owner: "GM", category: "milestone" },
  { date: "2027-01-08", title: "Pongal campaign live", owner: "Marketing", category: "marketing" },
  { date: "2027-01-14", title: "Office Pongal celebration", owner: "Admin & HR", category: "people" },
  { date: "2027-01-18", title: "Cost-per-lead check: reset Feb & Mar targets", owner: "GM", category: "money" },
  { date: "2027-01-30", title: "Customer how-to guides ready", owner: "Marketing", category: "marketing" },
  { date: "2027-02-01", title: "Month 2 · Scale: more spend on winning ads", owner: "GM", category: "milestone" },
  { date: "2027-03-01", title: "Month 3 · Optimise", owner: "GM", category: "milestone" },
  { date: "2027-03-31", title: "90-day review + plan for April–June", owner: "GM", category: "milestone" },
];

// ---------- Date helpers ----------

const pad = (n: number) => String(n).padStart(2, "0");

export function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

const closedDays = new Set(festivals.filter((f) => f.closed).map((f) => f.date));

export function isWorkingDay(d: Date): boolean {
  return d.getDay() !== 0 && !closedDays.has(toISO(d));
}

export function festivalOn(iso: string) {
  return festivals.find((f) => f.date === iso);
}

function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
}

function onOrNextWorkingDay(d: Date): Date {
  let x = d;
  while (!isWorkingDay(x)) x = addDays(x, 1);
  return x;
}

function previousWorkingDay(d: Date): Date {
  let x = addDays(d, -1);
  while (!isWorkingDay(x)) x = addDays(x, -1);
  return x;
}

function resolveRule(rule: MonthlyRule, year: number, month: number): Date {
  switch (rule) {
    case "firstWorkingDay":
      return onOrNextWorkingDay(new Date(year, month, 1));
    case "payoutDay":
      return onOrNextWorkingDay(new Date(year, month, 5));
    case "payoutApproval":
      return previousWorkingDay(onOrNextWorkingDay(new Date(year, month, 5)));
    case "secondThursday":
      return onOrNextWorkingDay(nthWeekday(year, month, 4, 2));
    case "thirdSaturday":
      return nthWeekday(year, month, 6, 3);
    case "lastWorkingDay": {
      let x = new Date(year, month + 1, 0);
      while (!isWorkingDay(x)) x = addDays(x, -1);
      return x;
    }
  }
}

const categoryOrder: Category[] = categories.map((c) => c.id);

// Every event in the plan, keyed by "YYYY-MM-DD".
export function buildEvents(): Record<string, DayEvent[]> {
  const map: Record<string, DayEvent[]> = {};
  const add = (iso: string, e: DayEvent) => {
    (map[iso] ??= []).push(e);
  };

  for (const { weekday, from, to, ...e } of weekly) {
    for (let d = fromISO(from); d <= fromISO(to); d = addDays(d, 1)) {
      if (d.getDay() === weekday && isWorkingDay(d)) add(toISO(d), { ...e, kind: "weekly" });
    }
  }

  for (const { rule, months, ...e } of monthly) {
    for (const ym of months) {
      const [y, m] = ym.split("-").map(Number);
      add(toISO(resolveRule(rule, y, m - 1)), { ...e, kind: "monthly" });
    }
  }

  for (const { date, ...e } of oneOff) add(date, { ...e, kind: "once" });

  for (const list of Object.values(map)) {
    list.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  }
  return map;
}

export function phaseOn(iso: string): Phase | undefined {
  return phases.find((p) => iso >= p.start && iso <= p.end);
}

// The phase that covers most of a calendar month.
export function phaseForMonth(year: number, month: number): Phase | undefined {
  return phaseOn(toISO(new Date(year, month, 20)));
}

export function formatRange(start: string, end: string): string {
  const s = fromISO(start);
  const e = fromISO(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  const month = (d: Date) => d.toLocaleDateString("en-IN", { month: "short" });
  return sameMonth
    ? `${s.getDate()}–${e.getDate()} ${month(e)} ${e.getFullYear()}`
    : `${s.getDate()} ${month(s)} – ${e.getDate()} ${month(e)} ${e.getFullYear()}`;
}
