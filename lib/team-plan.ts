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
  about?: string; // plain explanation, shown when someone opens the day
  link?: { href: string; label: string }; // the doc that explains it
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
// `about` is the plain explanation shown when someone opens the day.

const weekly: (CalEvent & { weekday: number; from: string; to: string })[] = [
  {
    weekday: 1, from: "2026-12-01", to: "2027-03-31",
    title: "Weekly planning", time: "11:00 AM", owner: "GM + team", category: "meeting",
    about: "30 minutes, right after the morning meeting. Last week's numbers, each person's target for this week, the week's deadlines, the marketing plan and blockers. Admin & HR shares the weekly sheet by 12:00 noon.",
    link: { href: "/docs/team-operating-plan/#weekly-planning", label: "See the agenda" },
  },
  {
    weekday: 3, from: "2027-01-01", to: "2027-03-31",
    title: "SP webinar", time: "4:00 PM", owner: "Partner Relations", category: "partner",
    about: "Partner Relations trains Solution Partners online: the product, the pitch, and how to send referral and payment links, using Marketing's demo videos.",
    link: { href: "/docs/role-partner-relations/", label: "Partner Relations card" },
  },
  {
    weekday: 5, from: "2026-12-01", to: "2026-12-31",
    title: "Weekly training test", time: "5:00 PM", owner: "Training Head", category: "people",
    about: "The Training Head tests everyone on the week's training: the product test, then the role test, then mock calls and tasks, then the final test. The pass mark is 80%.",
    link: { href: "/docs/role-training-head/", label: "Training plan" },
  },
  {
    weekday: 5, from: "2027-01-01", to: "2027-03-31",
    title: "Weekly review + ad spend check", time: "5:00 PM", owner: "GM", category: "meeting",
    about: "The GM checks the week against Monday's plan and the targets. Admin & HR says who is below target. Marketing brings the cost per lead, and the GM decides where next week's ad money goes.",
  },
  {
    weekday: 6, from: "2026-12-01", to: "2027-03-31",
    title: "Video batch shoot", time: "11:00 AM", owner: "Marketing", category: "marketing",
    about: "Marketing shoots the coming week's daily videos (6 a week) in one go. The GM approves the videos and appears in them when needed.",
  },
];

// ---------- Monthly rhythm ----------

type MonthlyRule =
  | "firstWorkingDay"
  | "payoutApproval"
  | "payoutDay"
  | "secondThursday"
  | "thirdSaturday"
  | "lastWorkingDay";

const payoutSop = { href: "/docs/monthly-payout-sop/", label: "Monthly Payout SOP" };

const monthly: (CalEvent & { rule: MonthlyRule; months: string[] })[] = [
  {
    rule: "firstWorkingDay", months: ["2027-01", "2027-02", "2027-03"],
    title: "Monthly targets set", owner: "GM", category: "meeting",
    about: "The GM sets each person's targets for the month from the 90-day targets.",
    link: { href: "/docs/team-targets/", label: "90-Day Targets" },
  },
  {
    rule: "payoutApproval", months: ["2027-02", "2027-03"],
    title: "GM approves SP payout list", owner: "GM", category: "money",
    about: "Admin & HR prepares the list of commission owed to each Solution Partner: every client payment received since the last payout, the partner it belongs to (Partner Relations confirms), 15% or 10% commission, TDS and GST. The GM checks and approves it on the working day before payout day. Nothing is paid without this approval.",
    link: payoutSop,
  },
  {
    rule: "payoutDay", months: ["2027-02", "2027-03"],
    title: "SP commission payout", owner: "Admin & HR", category: "money",
    about: "Admin & HR pays each Solution Partner the approved commission by bank transfer to the account verified in KYC, and sends each partner a statement. If the 5th is a Sunday or holiday, payout moves to the next working day. The first payout is on 5 February 2027, for sales paid in January.",
    link: payoutSop,
  },
  {
    rule: "secondThursday", months: ["2027-01", "2027-02", "2027-03"],
    title: "PR article release", owner: "Marketing", category: "marketing",
    about: "Marketing publishes the month's PR article (₹6,000 budget) and shares it on social media. The GM approves it before release.",
  },
  {
    rule: "thirdSaturday", months: ["2026-12", "2027-02", "2027-03"],
    title: "Team event: turf, movie or games", owner: "Admin & HR", category: "people",
    about: "One team event a month, ₹5,000 budget: turf games, a movie or games. Admin & HR plans it. January's event is the office Pongal celebration.",
  },
  {
    rule: "lastWorkingDay", months: ["2027-01", "2027-02", "2027-03"],
    title: "Top Performer award + budget review", owner: "Admin & HR, GM", category: "people",
    about: "Admin & HR announces the Top Performer: 70% target achieved, 15% attendance, 15% behaviour. The reward is ₹2,000 and a certificate. Then Admin & HR and the GM compare the month's spend with the budget.",
    link: { href: "/docs/team-operating-plan/#top-performer-of-the-month", label: "How the score works" },
  },
];

// ---------- One-off dates ----------

const oneOff: (CalEvent & { date: string })[] = [
  // Hiring steps: suggested dates inside the 15–30 Nov plan. The GM moves them as needed.
  {
    date: "2026-11-16", title: "Hiring starts: post the Admin & HR job", owner: "GM", category: "people",
    about: "The GM posts the Admin & HR job. Admin & HR is hired first, so they can help hire the other 4 roles.",
  },
  {
    date: "2026-11-18", title: "Admin & HR interviews", owner: "GM", category: "people",
    about: "The GM interviews the shortlisted Admin & HR candidates and picks one.",
  },
  {
    date: "2026-11-20", title: "Admin & HR offer letter sent", owner: "GM", category: "people",
    about: "The GM sends the offer letter to the chosen Admin & HR candidate.",
    link: { href: "/docs/hr-letters/", label: "HR Letters" },
  },
  {
    date: "2026-11-21", title: "Post jobs: Training Head, Marketing, Partner Relations, Customer Support", owner: "GM", category: "people",
    about: "The GM posts the other 4 jobs now, so applications are waiting when Admin & HR joins.",
  },
  {
    date: "2026-11-23", title: "Admin & HR joins · starts screening applications", owner: "Admin & HR", category: "people",
    about: "Admin & HR joins, signs the appointment letter and confidentiality agreement, and shortlists candidates for the 4 roles. Days worked in November are paid per day.",
  },
  {
    date: "2026-11-25", title: "Interviews: Training Head, Marketing", owner: "GM, Admin & HR", category: "people",
    about: "The GM and Admin & HR interview the shortlisted Training Head and Marketing candidates.",
  },
  {
    date: "2026-11-26", title: "Interviews: Partner Relations, Customer Support", owner: "GM, Admin & HR", category: "people",
    about: "The GM and Admin & HR interview the shortlisted Partner Relations and Customer Support candidates.",
  },
  {
    date: "2026-11-28", title: "Offer letters to the 4 new hires", owner: "Admin & HR", category: "people",
    about: "Admin & HR sends offer letters to the 4 chosen candidates. The GM signs them.",
    link: { href: "/docs/hr-letters/", label: "HR Letters" },
  },
  {
    date: "2026-11-30", title: "All 5 roles hired · joining day is 1 Dec", owner: "GM, Admin & HR", category: "milestone",
    about: "Every role is filled. The 4 new hires join on 1 December, when training and regular salary start.",
  },
  {
    date: "2026-12-01", title: "Training month starts · regular salary starts", owner: "Training Head", category: "milestone",
    about: "December is the training month: product, role skills, practice, then live practice, with a test every Friday. The 10:30 AM morning meeting and 6:00 PM KPI update start today.",
    link: { href: "/docs/role-training-head/", label: "Training plan" },
  },
  {
    date: "2026-12-12", title: "SOPs and HR letters ready", owner: "Admin & HR", category: "people",
    about: "Admin & HR has every SOP and HR letter ready, issues appointment letters to everyone, and sets up employee files, attendance and the KPI board sheet.",
  },
  {
    date: "2026-12-18", title: "Ad creatives + 7 SP demo videos ready", owner: "Marketing", category: "marketing",
    about: "Marketing finishes the Meta ad creatives for both funnels and one demo video for each of the 7 products. The GM approves them. Partners use these videos because iSuite AI gives no live sales demos.",
  },
  {
    date: "2026-12-21", title: "Test ads start (small budget)", owner: "Marketing", category: "marketing",
    about: "Small test ads run in both funnels, so the team practises on real leads and sees a first cost per lead before launch.",
  },
  {
    date: "2026-12-31", title: "Final training tests + best trainee + budget review", owner: "Training Head, GM", category: "people",
    about: "Final tests for every role, the best trainee of the month, and a review of December's spend against the budget.",
  },
  {
    date: "2027-01-01", title: "Launch: Meta ads live in both funnels", owner: "GM", category: "milestone",
    about: "Meta ads go fully live: ₹30,000 a month for SP recruitment and ₹20,000 for direct free trials. January targets: 5 new SPs and 5 direct paying customers.",
    link: { href: "/docs/team-targets/", label: "90-Day Targets" },
  },
  {
    date: "2027-01-08", title: "Pongal campaign live", owner: "Marketing", category: "marketing",
    about: "Marketing runs the Pongal ad campaign. The GM approves it before it goes live.",
  },
  {
    date: "2027-01-14", title: "Office Pongal celebration", owner: "Admin & HR", category: "people",
    about: "The team celebrates Pongal in the office. This is January's team event.",
  },
  {
    date: "2027-01-18", title: "Cost-per-lead check: reset Feb & Mar targets", owner: "GM", category: "money",
    about: "After 2 weeks of ads, the GM compares the real cost per lead with the ₹300 estimate and resets the February and March targets if needed.",
  },
  {
    date: "2027-01-30", title: "Customer how-to guides ready", owner: "Marketing", category: "marketing",
    about: "How-to guides and videos for customers, one set per product. Customer Support uses them during setup.",
  },
  {
    date: "2027-02-01", title: "Month 2 · Scale: more spend on winning ads", owner: "GM", category: "milestone",
    about: "Put more money on the ads that bring leads at the lowest cost, and push signed partners to their first sale. February target: 10 new SPs.",
  },
  {
    date: "2027-03-01", title: "Month 3 · Optimise", owner: "GM", category: "milestone",
    about: "Cut weak ads, push partners to sell, and close the 90-day targets. March target: 15 new SPs.",
  },
  {
    date: "2027-03-31", title: "90-day review + plan for April–June", owner: "GM", category: "milestone",
    about: "The GM checks the 90 days against the targets (30 new SPs, 25 direct paying customers, 70% of clients retained) and plans April to June.",
  },
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

// The morning meeting and KPI update run every working day from the first training day.
// They are shown in day views, not as calendar chips.
export const dailyFrom = "2026-12-01";
export const dailyEvents: Pick<CalEvent, "time" | "title" | "owner" | "about">[] = [
  {
    time: "10:30 AM", title: "Morning meeting + pledge", owner: "Admin & HR",
    about: "15 minutes, everyone from both shifts. The pledge, yesterday's numbers and today's target. Admin & HR runs it.",
  },
  {
    time: "6:00 PM", title: "KPI update", owner: "Everyone → Admin & HR",
    about: "Everyone sends the day's numbers. Admin & HR updates the KPI board by 6:30 PM.",
  },
];

export function hasDaily(iso: string): boolean {
  return iso >= dailyFrom && iso <= planEnd && isWorkingDay(fromISO(iso));
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
