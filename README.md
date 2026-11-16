# iSuite AI – Docs

iSuite AI-oda ella documents-um plans-um ore website-la. 4 sections:

- **Solution Partners** – Program Rules, Agreement, Brochure, Getting Started, FAQ
- **Roles** – General Manager, Admin & HR, Marketing, Partner Relations, Customer Support, Training Head
- **Team Plan** – Team Operating Plan, 90-day targets, budget, team calendar
- **SOPs** – Partner Onboarding SOP, Monthly Payout SOP, HR Letters

Indha site team-ku mattum. Partners-ku site link anuppaadheenga – partner docs-a **Print / Save PDF** panni PDF-aa anuppunga.

## Run panna (first time)

Computer-la [Node.js](https://nodejs.org) 20 or above install aagirukkanum.

```
cd partner-docs
npm install
npm run dev
```

Browser-la http://localhost:3000 open pannunga.

## Content maatha

Ella document-um `content/docs/` folder-la `.md` file-aa irukku. Code-ai thoda vendaam.

- **Text maatha:** `content/docs/program-rules.md` open panni edit pannunga. `npm run dev` odittu irundhaa page udane update aagum.
- **Date update:** File mela irukkra `updated: 2026-11-11` line-ai maathunga.
- **Status:** `status: Draft` → final aanaa `status: Final` nu maathunga.
- **Tanglish version:** Oru doc-kku `<same-name>.ta.md` file irundhaa (udhaaranam `program-rules.ta.md`), andha page-la English / Tanglish toggle varum. English file-ai maathinaa `.ta.md`-aiyum maathunga.

### Pudhu document (pudhu tab) serkka

`content/docs/` folder-la pudhu `.md` file create pannunga, udhaaranatthukku `partner-agreement.md`:

```
---
title: Solution Partner Agreement
short: Partner Agreement
summary: The contract every Solution Partner signs.
order: 2
updated: 2026-11-12
status: Draft
---

Intro line...

## 1. First section
...
```

- `short` = sidebar tab-la theriyra peru
- `order` = tab varisai (1, 2, 3...)
- `section` = endha section-la varanum: `sp` (Solution Partners), `roles`, `plan` (Team Plan), `sops`
- `toc: false` = "On this page" list venaam, page full width (calendar page maadhiri)
- `## ` headings ellaam "On this page" list-la automatic-aa varum

Section peru, varisai, one-line description ellaam `lib/site.ts`-la maathalaam. Section icon `components/SectionIcon.tsx`-la.

### Visual blocks (calendar, org chart, timeline)

Endha `.md` file-laiyum indha maadhiri oru empty code block pottaa andha visual varum:

````
```team-calendar
```
````

- `team-calendar` – month-by-month team calendar
- `org-chart` – team structure
- `phase-timeline` – Recruit → Train → Launch → Scale → Optimise

Calendar dates, meeting times, owners, holidays ellaam `lib/team-plan.ts`-la irukku. Anga maathinaa calendar-um timeline-um update aagum.

## Publish panna

```
npm run build
```

`out/` folder-la full static website ready aagum. Adhai Netlify, Vercel, Cloudflare Pages, illa endha hosting-laiyum upload pannalaam.

## Style

Colors iSuite AI app maadhiri: dark navy sidebar, white cards, navy buttons, light blue accent. Fonts: Poppins headings, Inter body. Ellaam `app/globals.css` mela `:root`-la irukku.
