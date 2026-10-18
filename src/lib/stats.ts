// Numbers about the catalogue for the Stats page («Статистика»), worked out at build time
// from the published profiles. Pure functions over the profile data, so they can be tested.
import { CATALOGUE_DATE, groups } from './people';

// The few profile fields the stats read (a subset of Person['data']).
export interface StatsPerson {
  slug: string;
  data: {
    name: string;
    gender: 'male' | 'female';
    group: string;
    born: Date;
    born_circa: boolean;
    died?: Date;
    died_circa: boolean;
    birthplace: { region: string };
    related: string[];
    published?: Date;
  };
}

// Not oblasts: kept apart on the map.
export const OUTSIDE = ['abroad', 'unknown'];

export const genderSplit = (people: StatsPerson[]) => {
  const women = people.filter((p) => p.data.gender === 'female').length;
  return { total: people.length, women, men: people.length - women };
};

// Every field in categories.json order, with its head count overall and by gender; most people first.
export const byField = (people: StatsPerson[]) =>
  groups
    .map(({ id }) => {
      const members = people.filter((p) => p.data.group === id);
      const women = members.filter((p) => p.data.gender === 'female').length;
      return { id, all: members.length, women, men: members.length - women };
    })
    .sort((a, b) => b.all - a.all);

export const byRegion = (people: StatsPerson[]) => {
  const counts = new Map<string, number>();
  for (const p of people) counts.set(p.data.birthplace.region, (counts.get(p.data.birthplace.region) ?? 0) + 1);
  return counts;
};

// Centuries of birth from the earliest to the latest, empty ones included so gaps show (1 = AD 1–100).
export const byCentury = (people: StatsPerson[]) => {
  const century = (d: Date) => Math.floor((d.getUTCFullYear() - 1) / 100) + 1;
  const counts = new Map<number, number>();
  for (const p of people) counts.set(century(p.data.born), (counts.get(century(p.data.born)) ?? 0) + 1);
  if (!counts.size) return [];
  const [first, last] = [Math.min(...counts.keys()), Math.max(...counts.keys())];
  return Array.from({ length: last - first + 1 }, (_, i) => ({ century: first + i, n: counts.get(first + i) ?? 0 }));
};

const day = (d: Date) => d.toISOString().slice(0, 10);

// People on the site at the end of each UTC day, from the launch to `until`.
export const growth = (people: StatsPerson[], until: Date) => {
  const added = new Map<string, number>();
  for (const p of people) {
    const d = day(p.data.published && p.data.published > CATALOGUE_DATE ? p.data.published : CATALOGUE_DATE);
    added.set(d, (added.get(d) ?? 0) + 1);
  }
  const out: { date: string; added: number; total: number }[] = [];
  let total = 0;
  for (const d = new Date(`${day(CATALOGUE_DATE)}T00:00:00Z`); day(d) <= day(until); d.setUTCDate(d.getUTCDate() + 1)) {
    total += added.get(day(d)) ?? 0;
    out.push({ date: day(d), added: added.get(day(d)) ?? 0, total });
  }
  return out;
};

// People with the most ties to others on the site, counting a tie once whichever profile names it.
export const mostConnected = (people: StatsPerson[], n: number) => {
  const live = new Set(people.map((p) => p.slug));
  const ties = new Set<string>();
  for (const p of people) for (const s of p.data.related) if (live.has(s) && s !== p.slug) ties.add([p.slug, s].sort().join(' '));
  const degree = new Map<string, number>();
  for (const tie of ties) for (const s of tie.split(' ')) degree.set(s, (degree.get(s) ?? 0) + 1);
  const bySlug = new Map(people.map((p) => [p.slug, p]));
  return [...degree]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([slug, links]) => ({ person: bySlug.get(slug)!, links }));
};

// The longest life among people whose birth and death dates are both known exactly.
export const longestLife = (people: StatsPerson[]) => {
  let best: { person: StatsPerson; years: number } | undefined;
  for (const p of people) {
    const { born, died, born_circa, died_circa } = p.data;
    if (!died || born_circa || died_circa) continue;
    let years = died.getUTCFullYear() - born.getUTCFullYear();
    if (died.getUTCMonth() < born.getUTCMonth() || (died.getUTCMonth() === born.getUTCMonth() && died.getUTCDate() < born.getUTCDate())) years--;
    if (!best || years > best.years) best = { person: p, years };
  }
  return best;
};

export const earliestBorn = (people: StatsPerson[]) =>
  people.reduce<StatsPerson | undefined>((a, p) => (!a || p.data.born < a.data.born ? p : a), undefined);

// Shade step 0–4 for a head count on the map, relative to the busiest region; -1 for none.
export const shade = (n: number, most: number) => (n === 0 ? -1 : Math.min(4, Math.floor((n / Math.max(1, most)) * 5)));
