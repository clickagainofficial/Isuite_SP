// Site-wide settings. Edit here to change the name or the sections.
export const site = {
  name: "iSuite AI",
  section: "Docs",
  mainSite: "https://isuite.ai",
  // Each doc picks its section with `section:` in its frontmatter.
  // Sections show in this order in the sidebar and on the Overview page.
  sections: [
    {
      id: "sp",
      title: "Solution Partners",
      blurb: "Rules, agreement and guides for partners. Send them to partners as PDFs.",
    },
    {
      id: "roles",
      title: "Roles",
      blurb: "One card per role: the work, the KPIs and the daily rhythm.",
    },
    {
      id: "plan",
      title: "Team Plan",
      blurb: "Targets, budget and calendar, from November 2026 to March 2027.",
    },
    {
      id: "sops",
      title: "SOPs",
      blurb: "Step-by-step team processes and HR letter templates.",
    },
  ],
};

export type SiteSection = (typeof site.sections)[number];

export function sectionOf(id: string): SiteSection | undefined {
  return site.sections.find((s) => s.id === id);
}
