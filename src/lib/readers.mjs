// Readers' numbers for the Stats page (decision D20), from Cloudflare Web Analytics: page loads in
// real browsers, aggregated, no cookies. scripts/pull-readers.mjs fetches the rows in CI and writes
// src/data/readers.json (not in git) with `summarize`; the page shows ranks and shares, never raw
// counts per profile. Plain JS so the script and the site share it.

// A profile page in either language: "/uk/people/<slug>/" → slug.
const PROFILE = /^\/(?:uk|en)\/people\/([a-z0-9-]+)\/?$/;
export const profileSlug = (path) => PROFILE.exec(path)?.[1];

/** Page loads per profile, both languages together. @param {{ path: string, count: number }[]} rows */
export function profileTotals(rows) {
  const totals = new Map();
  for (const { path, count } of rows) {
    const slug = profileSlug(path);
    if (slug) totals.set(slug, (totals.get(slug) ?? 0) + count);
  }
  return totals;
}

const ranked = (totals) => [...totals].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([slug]) => slug);

/** The top `n` profiles and how many places each moved since the previous period ('new' if unranked). */
export function ranking(current, previous, n) {
  const before = ranked(previous);
  return ranked(current)
    .slice(0, n)
    .map((slug, i) => {
      const was = before.indexOf(slug);
      return { slug, move: was === -1 ? 'new' : was - i };
    });
}

/** Profiles whose readership grew most, as a percentage; only ones read at least `min` times now. */
export function trending(current, previous, n, min = 10) {
  return [...current]
    .filter(([, now]) => now >= min)
    .map(([slug, now]) => ({ slug, rise: Math.round(((now - (previous.get(slug) ?? 0)) / Math.max(previous.get(slug) ?? 0, min)) * 100) }))
    .filter((t) => t.rise > 0)
    .sort((a, b) => b.rise - a.rise || a.slug.localeCompare(b.slug))
    .slice(0, n);
}

/** Visits per day in each language, every day of the window present. */
export function daily(dates, uk, en) {
  const byDate = (rows) => new Map(rows.map((r) => [r.date, r.visits]));
  const [u, e] = [byDate(uk), byDate(en)];
  return dates.map((date) => ({ date, uk: u.get(date) ?? 0, en: e.get(date) ?? 0 }));
}

/** Share of visits per country (ISO code), the top `n` and the rest as 'other'; whole percentages. */
export function countryShares(rows, n = 6) {
  const total = rows.reduce((s, r) => s + r.visits, 0);
  if (!total) return { count: 0, top: [] };
  const sorted = [...rows].sort((a, b) => b.visits - a.visits);
  const top = sorted.slice(0, n).map((r) => [r.country, Math.round((r.visits / total) * 100)]);
  const rest = sorted.slice(n).reduce((s, r) => s + r.visits, 0);
  if (rest) top.push(['other', Math.round((rest / total) * 100)]);
  return { count: rows.filter((r) => r.visits > 0).length, top };
}
