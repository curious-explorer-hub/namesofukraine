// Client-side filtering for the home and category pages. State lives in the URL
// (?q=&group=&era=&region=&unread=1) so filtered views can be shared and "back" restores them.

import { getRead, STORAGE_KEY } from './read-marks';

const KEYS = ['q', 'group', 'era', 'region', 'collection', 'unread'] as const;
// Filters that narrow the catalogue to a single results grid. "Unread only" on its own keeps the
// grouped layout and just leaves out cards already read.
const NARROWING = ['q', 'group', 'era', 'region', 'collection'] as const;
type Key = (typeof KEYS)[number];
type State = Record<Key, string>;

// Case-insensitive, and treats all apostrophe variants (' ’ ʼ `) as the same character.
export const normalize = (s: string) =>
  s.toLocaleLowerCase('uk').replace(/[’ʼ`‘]/g, "'").replace(/\s+/g, ' ').trim();

// `read` holds the slugs already read in this browser (for the "unread only" filter).
export const matches = (item: DOMStringMap, state: State, read: Set<string> = new Set()) =>
  (!state.unread || !read.has(item.slug ?? '')) &&
  (!state.group || item.group === state.group) &&
  (!state.era || item.era === state.era) &&
  (!state.region || item.region === state.region) &&
  (!state.collection || (item.collections ?? '').split(',').includes(state.collection)) &&
  (!state.q || normalize(item.search ?? '').includes(normalize(state.q)));

export function initFilters() {
  const form = document.querySelector<HTMLFormElement>('form.filters');
  const catalogue = document.querySelector<HTMLElement>('.catalogue');
  if (!form || !catalogue) return;

  const recent = document.querySelector<HTMLElement>('.recent');
  // Home page: group tiles stand in for the sections; they stay in view while their filter is on, so
  // the visitor can switch to another field.
  const tiles = document.querySelector<HTMLElement>('.tiles');
  const tileItems = [...(tiles?.querySelectorAll<HTMLElement>('.tile-item') ?? [])];
  const empty = catalogue.querySelector<HTMLElement>('.catalogue-empty')!;
  const status = form.querySelector<HTMLElement>('.filters-status')!;
  // In the filter bar (category pages) or as a card above the home-page tabs
  const progress = document.querySelector<HTMLElement>('.read-progress');
  const items = [...catalogue.querySelectorAll<HTMLElement>('.person-item')];
  const sections = [...catalogue.querySelectorAll<HTMLElement>('.group')];
  const recentItems = [...(recent?.querySelectorAll<HTMLElement>('.person-item') ?? [])];
  const emptyText = { none: empty.textContent, allRead: empty.dataset.allRead ?? empty.textContent };
  const eraButtons = [...document.querySelectorAll<HTMLButtonElement>('.era[data-era]')];
  // Field and collection tiles filter in place, like the era bands; each one's link stays for no-JS.
  const filterTiles = [...document.querySelectorAll<HTMLElement>('.tile-item')].map((item) => ({
    link: item.querySelector<HTMLAnchorElement>('.tile')!,
    key: (item.dataset.collection ? 'collection' : 'group') as Key,
    value: (item.dataset.collection ?? item.dataset.group)!,
  }));
  const field = (k: Key) => form.elements.namedItem(k) as HTMLInputElement | HTMLSelectElement;
  const isCheckbox = (el: HTMLInputElement | HTMLSelectElement): el is HTMLInputElement =>
    el instanceof HTMLInputElement && el.type === 'checkbox';

  const readState = (): State =>
    Object.fromEntries(
      KEYS.map((k) => {
        const el = field(k);
        return [k, isCheckbox(el) ? (el.checked ? '1' : '') : el.value.trim()];
      }),
    ) as State;
  // Each person counted once, even if a card appears twice.
  const slugs = [...new Set(items.map((i) => i.dataset.slug).filter(Boolean))] as string[];

  const apply = () => {
    const state = readState();
    const read = getRead();
    const active = KEYS.some((k) => state[k]);
    const narrowing = NARROWING.some((k) => state[k]);
    let found = 0;
    if (narrowing) {
      // One results grid: every match, sections dissolved.
      for (const item of items) {
        item.hidden = !matches(item.dataset, state, read);
        if (!item.hidden) found++;
      }
      for (const section of sections) section.hidden = false;
    } else {
      // Grouped layout (each section, or its tile on the home page), leaving out read people if asked.
      for (const section of sections) {
        let remaining = 0;
        for (const item of section.querySelectorAll<HTMLElement>('.person-item')) {
          item.hidden = !!state.unread && read.has(item.dataset.slug ?? '');
          if (!item.hidden) remaining++;
        }
        found += remaining;
        section.hidden = remaining === 0;
        const tile = tileItems.find((t) => t.dataset.group === section.dataset.group);
        if (tile) updateTile(tile, remaining, !!state.unread);
      }
    }
    if (tiles) tiles.hidden = tileItems.every((t) => t.hidden);
    for (const item of recentItems) item.hidden = !!state.unread && read.has(item.dataset.slug ?? '');
    catalogue.toggleAttribute('data-filtering', narrowing);
    form.toggleAttribute('data-active', active);
    if (recent) recent.hidden = narrowing || recentItems.every((i) => i.hidden);
    empty.hidden = !active || found > 0;
    empty.textContent = !narrowing && state.unread ? emptyText.allRead : emptyText.none;
    status.textContent = active ? status.dataset.found!.replace('{n}', String(found)) : '';
    for (const b of eraButtons) b.setAttribute('aria-pressed', String(b.dataset.era === state.era));
    for (const t of filterTiles) {
      if (state[t.key] === t.value) t.link.setAttribute('aria-current', 'true');
      else t.link.removeAttribute('aria-current');
    }
    if (progress) {
      const done = slugs.filter((s) => read.has(s)).length;
      const share = slugs.length ? done / slugs.length : 0;
      const text = progress.querySelector('[data-read-text]') ?? progress;
      text.textContent = progress.dataset.template!.replace('{n}', String(done)).replace('{total}', String(slugs.length));
      progress.style.setProperty('--progress', String(share));
      progress.style.setProperty('--pct', String(Math.round(share * 100)));
      const hint = progress.querySelector('[data-read-hint]');
      if (hint) {
        const state = done === 0 ? 'none' : done === slugs.length ? 'all' : 'some';
        progress.dataset.state = state;
        hint.textContent = progress.dataset[`hint${state[0].toUpperCase()}${state.slice(1)}`]!.replace('{n}', String(slugs.length - done));
      }
    }

    const params = new URLSearchParams();
    for (const k of KEYS) if (state[k]) params.set(k, state[k]);
    const query = params.toString();
    history.replaceState(null, '', query ? `?${query}` : location.pathname);
    // For views that follow the filters (the birthplace map)
    document.dispatchEvent(new CustomEvent('filters:applied'));
  };

  // Group tiles: in unread mode they count and open only the unread people of that group.
  function updateTile(item: HTMLElement, remaining: number, unread: boolean) {
    const link = item.querySelector<HTMLAnchorElement>('.tile')!;
    const count = link.querySelector<HTMLElement>('.tile-count')!;
    link.dataset.baseHref ??= link.getAttribute('href') ?? '';
    const n = String(unread ? remaining : link.dataset.total);
    count.textContent = link.dataset.label!.replace('{n}', n);
    link.setAttribute('href', unread ? `${link.dataset.baseHref}?unread=1` : link.dataset.baseHref);
    item.hidden = remaining === 0;
  }

  // Restore state from the URL.
  const params = new URLSearchParams(location.search);
  for (const k of KEYS) {
    const value = params.get(k);
    const el = field(k);
    if (value && isCheckbox(el)) el.checked = value === '1';
    else if (value) el.value = value;
  }

  form.addEventListener('input', apply);
  form.addEventListener('submit', (e) => e.preventDefault());
  // A hidden input's value is also its default, so reset alone would keep the collection.
  form.addEventListener('reset', () => {
    field('collection').value = '';
    setTimeout(apply);
  });
  for (const b of eraButtons) {
    b.addEventListener('click', () => {
      const era = field('era');
      era.value = era.value === b.dataset.era ? '' : b.dataset.era!;
      apply();
    });
  }

  for (const t of filterTiles) {
    t.link.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // opening the link in a new tab
      e.preventDefault();
      const el = field(t.key);
      el.value = el.value === t.value ? '' : t.value;
      apply();
    });
  }

  // Marks changed in another tab: refresh counts and the unread filter.
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) apply();
  });

  form.hidden = false;
  document.documentElement.classList.add('has-filters');
  apply();
}
