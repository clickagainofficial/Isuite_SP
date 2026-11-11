# iSuite AI – Partner Docs

Solution Partner documents ellaam ore website-la. Ovvoru document-um side-la oru tab.

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
- `## ` headings ellaam "On this page" list-la automatic-aa varum

"Soon" tabs-ai `lib/site.ts`-la maathalaam.

## Publish panna

```
npm run build
```

`out/` folder-la full static website ready aagum. Adhai Netlify, Vercel, Cloudflare Pages, illa endha hosting-laiyum upload pannalaam.

## Style

Colors iSuite AI app maadhiri: dark navy sidebar, white cards, navy buttons, light blue accent. Fonts: Poppins headings, Inter body. Ellaam `app/globals.css` mela `:root`-la irukku.
