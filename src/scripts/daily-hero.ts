// "Born on this day": picks the person to feature for the visitor's local date.
// Priority: someone born today → someone who died today → a "person of the day" that is
// deterministic for the date (same for everyone, changes daily).

export interface HeroEntry {
  slug: string;
  born: string | null; // "MM-DD", or null when the birth date is only approximate
  died: string | null; // "MM-DD"
}

// What the page needs to show the picked person (embedded by DailyHero.astro).
export interface HeroCard extends HeroEntry {
  name: string;
  role: string;
  years: string;
  url: string;
  img: string | null;
  alt: string | null;
}

export type HeroKind = 'born' | 'died' | 'featured';

const monthDay = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Small, stable string hash (FNV-1a) so the daily pick doesn't depend on array order luck.
const hash = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
  return h >>> 0;
};

export function pickHero<T extends HeroEntry>(entries: T[], today: Date): { entry: T; kind: HeroKind } | null {
  if (entries.length === 0) return null;
  const md = monthDay(today);
  const dayKey = `${today.getFullYear()}-${md}`;
  const choose = (list: T[]) => [...list].sort((a, b) => a.slug.localeCompare(b.slug))[hash(dayKey) % list.length];
  const born = entries.filter((e) => e.born === md);
  if (born.length) return { entry: choose(born), kind: 'born' };
  const died = entries.filter((e) => e.died === md);
  if (died.length) return { entry: choose(died), kind: 'died' };
  return { entry: choose(entries), kind: 'featured' };
}

export function initDailyHero() {
  const root = document.querySelector<HTMLElement>('[data-daily-hero]');
  const data = document.querySelector<HTMLScriptElement>('#daily-hero-data');
  if (!root || !data) return;
  const entries: HeroCard[] = JSON.parse(data.textContent ?? '[]');
  const today = new Date();
  const picked = pickHero(entries, today);
  if (!picked) return;
  const { entry, kind } = picked;
  const set = (sel: string, fn: (el: HTMLElement) => void) => {
    const el = root.querySelector<HTMLElement>(sel);
    if (el) fn(el);
  };
  set('[data-hero-label]', (el) => (el.textContent = el.dataset[kind] ?? ''));
  set('[data-hero-date]', (el) => {
    el.textContent = kind === 'featured' ? '' : today.toLocaleDateString(document.documentElement.lang === 'en' ? 'en-GB' : 'uk-UA', { day: 'numeric', month: 'long' });
  });
  set('[data-hero-name]', (el) => (el.textContent = entry.name));
  set('[data-hero-role]', (el) => (el.textContent = entry.role));
  set('[data-hero-years]', (el) => (el.textContent = entry.years));
  set('[data-hero-link]', (el) => el.setAttribute('href', entry.url));
  set('[data-hero-img]', (el) => {
    if (entry.img) {
      el.setAttribute('src', entry.img);
      el.setAttribute('alt', entry.alt ?? '');
    } else el.parentElement?.remove();
  });
  root.hidden = false;
}
