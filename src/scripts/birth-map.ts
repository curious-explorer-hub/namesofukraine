// Birthplace map on the home page (src/components/BirthMap.astro). Clicking a region (on the map or
// in the list) sets the region filter. The map follows the other filters (search, field, era, unread):
// shades, dots and counts show who they let through, in every region, so another region is one click
// away; with a region selected, the dots elsewhere step back. The continent cards under the map show
// the people born abroad the same way; clicking a card picks "abroad".

import { matches } from './filter';
import { getRead } from './read-marks';

export function initBirthMap() {
  const root = document.querySelector<HTMLElement>('[data-map]');
  const form = document.querySelector<HTMLFormElement>('form.filters');
  const select = form?.elements.namedItem('region');
  if (!root || !form || !(select instanceof HTMLSelectElement)) return;

  const svg = root.querySelector<SVGSVGElement>('.map-svg:not(.map-svg-world)')!;
  const worlds = [...root.querySelectorAll<SVGSVGElement>('.map-svg-world')];
  const cards = [...root.querySelectorAll<HTMLElement>('.map-world-card')];
  const canvas = root.querySelector<HTMLElement>('.map-canvas')!;
  const back = root.querySelector<HTMLButtonElement>('.map-back')!;
  const tip = root.querySelector<HTMLElement>('.map-tip')!;
  const regions = [...root.querySelectorAll<SVGPathElement>('.map-region')];
  const dots = [...root.querySelectorAll<SVGGElement>('.map-dot')];
  const picks = [...root.querySelectorAll<HTMLButtonElement>('.map-pick')];

  // Zooming into a region (src/lib/map.ts gives each one a padded bbox): tween the svg's viewBox from
  // whatever it currently shows to the region's box, fitted to the map's own aspect ratio so it isn't
  // stretched; instant if the reader asked for less motion.
  const [, , FULL_W, FULL_H] = svg.getAttribute('viewBox')!.split(' ').map(Number);
  const ASPECT = FULL_W / FULL_H;
  const bboxes = new Map(regions.map((r) => [r.dataset.region!, r.dataset.bbox!.split(' ').map(Number)]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const fit = ([x, y, w, h]: number[]): number[] =>
    w / h > ASPECT ? [x, y - (w / ASPECT - h) / 2, w, w / ASPECT] : [x - (h * ASPECT - w) / 2, y, h * ASPECT, h];
  let zoomedTo: string | null = null;
  let raf = 0;
  const zoom = (id: string | null, instant: boolean) => {
    if (id === zoomedTo) return;
    zoomedTo = id;
    root.classList.toggle('is-zoomed', !!id);
    back.hidden = !id;
    const target = id ? fit(bboxes.get(id)!) : [0, 0, FULL_W, FULL_H];
    cancelAnimationFrame(raf);
    if (instant || reduceMotion.matches) return void svg.setAttribute('viewBox', target.join(' '));
    const from = svg.getAttribute('viewBox')!.split(' ').map(Number);
    const start = performance.now();
    const DURATION = 400;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const e = 1 - (1 - p) ** 3; // ease-out cubic
      svg.setAttribute('viewBox', from.map((v, i) => v + (target[i] - v) * e).join(' '));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
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

  const update = (instant = false) => {
    zoom(select.value && bboxes.has(select.value) ? select.value : null, instant);
    const data = new FormData(form);
    const value = (k: string) => String(data.get(k) ?? '').trim();
    const state = { q: value('q'), group: value('group'), era: value('era'), region: '', collection: value('collection'), unread: value('unread') };
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
    for (const c of cards) {
      const n = c.dataset.slugs!.split(' ').filter((s) => shown.has(s)).length;
      c.querySelector('.map-world-count')!.textContent = String(n);
      c.classList.toggle('is-empty', n === 0);
      c.classList.toggle('is-picked', select.value === 'abroad');
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
  for (const s of [svg, ...worlds]) {
    s.addEventListener('pointermove', show);
    s.addEventListener('pointerleave', () => (tip.hidden = true));
    s.addEventListener('click', (e) => {
      const dot = (e.target as Element).closest<SVGGElement>('.map-dot');
      if (dot?.dataset.href && !dot.classList.contains('is-out')) return void (location.href = dot.dataset.href);
      const region = s === svg ? (dot?.dataset.region ?? (e.target as Element).closest<SVGElement>('.map-region.is-active')?.dataset.region) : 'abroad';
      if (region && offered.has(region)) pick(region);
    });
  }
  svg.addEventListener('keydown', (e) => {
    const region = (e.target as Element).closest<SVGElement>('.map-region.is-active');
    if (!region || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    pick(region.dataset.region!);
  });
  for (const b of picks) b.addEventListener('click', () => pick(b.dataset.region!));
  back.addEventListener('click', () => pick(select.value));

  document.addEventListener('filters:applied', () => update());
  update(true);

  // Dots appear in a sweep from west to east when the map first comes into view.
  root.classList.add('is-waiting');
  new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    root.classList.replace('is-waiting', 'is-shown');
    observer.disconnect();
  }, { threshold: 0.25 }).observe(svg);
}
