// "Observation" card on the home page (src/components/Insight.astro), next to the Daily Hero and the
// reading progress. From this browser's read marks it guesses an interest (the field read most) and
// suggests someone unread; before there is enough to go on, it shows a fact about the catalogue, a
// different one each day. Everything is computed here; nothing leaves the browser.

import { getRead, STORAGE_KEY } from './read-marks';

export interface InsightPerson {
  slug: string;
  group: string;
  name: string;
  url: string;
}

export interface Fact {
  text: string;
  href?: string;
  link?: string;
}

export interface InsightData {
  groups: Record<string, { label: string; url: string }>;
  facts: Fact[];
  strings: Record<'interest' | 'allRead' | 'varied' | 'next' | 'labelYou' | 'labelFact' | 'openField', string>;
}

export interface Observation {
  kind: 'interest' | 'all-read' | 'varied' | 'fact';
  label: string;
  text: string;
  group?: string; // its colour on the card
  href?: string;
  link?: string;
}

const MIN_READ = 3; // read profiles needed before guessing an interest
const LEAD = 0.4; // share of the read profiles one field needs to count as "the" interest

const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

// Same pick all day, different tomorrow.
const dayIndex = (today: Date, n: number) =>
  n ? Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 864e5) % n : 0;

export function observe(people: InsightPerson[], read: Set<string>, data: InsightData, today = new Date()): Observation {
  const { strings: s, groups } = data;
  const done = people.filter((p) => read.has(p.slug));
  const unread = (group: string) => people.filter((p) => p.group === group && !read.has(p.slug));
  const pick = (list: InsightPerson[]) => list[dayIndex(today, list.length)];

  if (done.length >= MIN_READ) {
    const counts = new Map<string, number>();
    for (const p of done) counts.set(p.group, (counts.get(p.group) ?? 0) + 1);
    // Most read first; ties go to the field listed first.
    const order = Object.keys(groups);
    const [top, n] = [...counts].sort(([a, x], [b, y]) => y - x || order.indexOf(a) - order.indexOf(b))[0];
    const field = groups[top]?.label ?? top;

    if (n / done.length >= LEAD) {
      const next = pick(unread(top));
      if (next) {
        return {
          kind: 'interest',
          label: s.labelYou,
          text: fill(s.interest, { field, n, total: done.length }),
          group: top,
          href: next.url,
          link: fill(s.next, { name: next.name }),
        };
      }
      // That field is read in full: point to the least-read other field.
      const other = order
        .filter((g) => g !== top && unread(g).length > 0)
        .sort((a, b) => (counts.get(a) ?? 0) - (counts.get(b) ?? 0))[0];
      const suggestion = other ? pick(unread(other)) : undefined;
      return {
        kind: 'all-read',
        label: s.labelYou,
        text: fill(s.allRead, { field }),
        group: top,
        ...(suggestion && { href: suggestion.url, link: fill(s.next, { name: suggestion.name }) }),
      };
    }

    // Read widely: name the number of fields and open one not explored yet.
    const fresh = order.filter((g) => !counts.has(g) && unread(g).length > 0);
    const target = fresh[dayIndex(today, fresh.length)];
    return {
      kind: 'varied',
      label: s.labelYou,
      text: fill(s.varied, { k: counts.size, all: order.length }),
      ...(target && { group: target, href: groups[target].url, link: fill(s.openField, { field: groups[target].label }) }),
    };
  }

  const fact = data.facts[dayIndex(today, data.facts.length)];
  return { kind: 'fact', label: s.labelFact, text: fact?.text ?? '', href: fact?.href, link: fact?.link };
}

export function initInsight() {
  const card = document.querySelector<HTMLElement>('[data-insight]');
  const json = document.querySelector<HTMLScriptElement>('#insight-data');
  if (!card || !json) return;
  const data = JSON.parse(json.textContent ?? '{}') as InsightData;
  // The people on the page, from their cards (each once).
  const people = new Map<string, InsightPerson>();
  for (const item of document.querySelectorAll<HTMLElement>('.catalogue .person-item[data-slug]')) {
    const a = item.querySelector<HTMLAnchorElement>('.person-name a');
    if (a) people.set(item.dataset.slug!, { slug: item.dataset.slug!, group: item.dataset.group!, name: a.textContent!.trim(), url: a.getAttribute('href')! });
  }
  const label = card.querySelector<HTMLElement>('[data-insight-label]')!;
  const text = card.querySelector<HTMLElement>('[data-insight-text]')!;
  const link = card.querySelector<HTMLAnchorElement>('[data-insight-link]')!;

  const render = () => {
    const o = observe([...people.values()], getRead(), data);
    card.dataset.kind = o.kind;
    if (o.group) card.dataset.group = o.group;
    else delete card.dataset.group;
    label.textContent = o.label;
    text.textContent = o.text;
    link.hidden = !o.href;
    if (o.href) {
      link.href = o.href;
      link.textContent = o.link ?? '';
    }
  };
  render();
  // Marks changed in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) render();
  });
}
