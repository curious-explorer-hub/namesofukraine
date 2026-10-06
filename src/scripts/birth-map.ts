// Birthplace map on the home page (src/components/BirthMap.astro). Clicking a region (on the map or
// in the list) sets the region filter. The map follows the other filters (search, field, era, unread):
// shades, dots and counts show who they let through, in every region, so another region is one click
// away; with a region selected, the dots elsewhere step back.

import { matches } from './filter';
import { getRead } from './read-marks';

export function initBirthMap() {
  const root = document.querySelector<HTMLElement>('[data-map]');
  const form = document.querySelector<HTMLFormElement>('form.filters');
  const select = form?.elements.namedItem('region');
  if (!root || !form || !(select instanceof HTMLSelectElement)) return;

  const svg = root.querySelector<SVGSVGElement>('.map-svg')!;
  const canvas = root.querySelector<HTMLElement>('.map-canvas')!;
  const tip = root.querySelector<HTMLElement>('.map-tip')!;
  const regions = [...root.querySelectorAll<SVGPathElement>('.map-region')];
  const dots = [...root.querySelectorAll<SVGGElement>('.map-dot')];
  const picks = [...root.querySelectorAll<HTMLButtonElement>('.map-pick')];
  const most = Number(root.dataset.most) || 1;
  const label = (name: string, n: number) =>
    n ? root.dataset.label!.replace('{region}', name).replace('{n}', String(n)) : root.dataset.empty!.replace('{region}', name);
  // Every person once, from the cards (a card can appear twice).
  const people = new Map(
    [...document.querySelectorAll<HTMLElement>('.catalogue .person-item')].map((i) => [i.dataset.slug!, i.dataset]),
  );

  // The regions become buttons (only those with people; the others stay plain shapes).
  svg.setAttribute('role', 'group');
  const offered = new Set([...select.options].map((o) => o.value).filter(Boolean));
  for (const r of regions) {
    if (!offered.has(r.dataset.region!)) continue;
    r.setAttribute('role', 'button');
    r.setAttribute('tabindex', '0');
    r.classList.add('is-active');
  }

  const pick = (id: string) => {
    select.value = select.value === id ? '' : id;
    select.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const update = () => {
    const data = new FormData(form);
    const value = (k: string) => String(data.get(k) ?? '').trim();
    const state = { q: value('q'), group: value('group'), era: value('era'), region: '', unread: value('unread') };
    const read = getRead();
    const shown = new Set([...people].filter(([, item]) => matches(item, state, read)).map(([slug]) => slug));
    const counts = new Map<string, number>();
    for (const slug of shown) {
      const region = people.get(slug)!.region!;
      counts.set(region, (counts.get(region) ?? 0) + 1);
    }
    for (const r of regions) {
      const n = counts.get(r.dataset.region!) ?? 0;
      r.dataset.level = String(n ? Math.ceil((n / most) * 4) : 0);
      r.dataset.tip = label(r.dataset.name!, n);
      r.setAttribute('aria-pressed', String(select.value === r.dataset.region));
      if (r.classList.contains('is-active')) r.setAttribute('aria-label', label(r.dataset.name!, n));
    }
    for (const d of dots) {
      const n = d.dataset.slugs!.split(' ').filter((s) => shown.has(s)).length;
      d.classList.toggle('is-out', n === 0);
      d.classList.toggle('is-aside', !!select.value && d.dataset.region !== select.value);
      const text = d.querySelector('text');
      if (text) text.textContent = String(n || d.dataset.slugs!.split(' ').length);
    }
    for (const b of picks) {
      b.setAttribute('aria-pressed', String(select.value === b.dataset.region));
      const n = counts.get(b.dataset.region!) ?? 0;
      b.querySelector('.map-pick-count')!.textContent = String(n);
      b.classList.toggle('is-empty', n === 0);
    }
  };

  // Name and head count of any region (also those with no one yet), or the people of a dot.
  const show = (e: PointerEvent) => {
    const target = (e.target as Element).closest<SVGElement>('.map-dot, .map-region');
    if (!target) return void (tip.hidden = true);
    tip.textContent = target.classList.contains('map-dot') ? target.dataset.names! : target.dataset.tip!;
    const box = canvas.getBoundingClientRect();
    tip.style.setProperty('--x', `${e.clientX - box.left}px`);
    tip.style.setProperty('--y', `${e.clientY - box.top}px`);
    tip.dataset.side = e.clientX - box.left > box.width / 2 ? 'end' : 'start';
    tip.hidden = false;
  };
  svg.addEventListener('pointermove', show);
  svg.addEventListener('pointerleave', () => (tip.hidden = true));

  svg.addEventListener('click', (e) => {
    const dot = (e.target as Element).closest<SVGGElement>('.map-dot');
    if (dot?.dataset.href && !dot.classList.contains('is-out')) return void (location.href = dot.dataset.href);
    const region = dot?.dataset.region ?? (e.target as Element).closest<SVGElement>('.map-region.is-active')?.dataset.region;
    if (region && offered.has(region)) pick(region);
  });
  svg.addEventListener('keydown', (e) => {
    const region = (e.target as Element).closest<SVGElement>('.map-region.is-active');
    if (!region || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    pick(region.dataset.region!);
  });
  for (const b of picks) b.addEventListener('click', () => pick(b.dataset.region!));

  document.addEventListener('filters:applied', update);
  update();

  // Dots appear in a sweep from west to east when the map first comes into view.
  root.classList.add('is-waiting');
  new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    root.classList.replace('is-waiting', 'is-shown');
    observer.disconnect();
  }, { threshold: 0.25 }).observe(svg);
}
