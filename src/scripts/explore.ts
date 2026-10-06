// Home page "explore" tabs (src/components/ExploreTabs.astro): search, eras, map, fields; one panel at
// a time, and one way of narrowing at a time: switching tabs clears the filters. Switching slides the highlight under the tabs (CSS), and the new panel slides in from the
// direction of travel while the box eases to its new height (Web Animations).

const STORAGE_KEY = 'iu:explore-tab';

export function initExplore() {
  const root = document.querySelector<HTMLElement>('[data-explore]');
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const list = root.querySelector<HTMLElement>('[role="tablist"]')!;
  const indicator = root.querySelector<HTMLElement>('.explore-indicator')!;
  const box = root.querySelector<HTMLElement>('.explore-panels')!;
  const EASE = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const place = () => {
    const tab = tabs.find((t) => t.getAttribute('aria-selected') === 'true')!;
    indicator.style.setProperty('--x', `${tab.offsetLeft}px`);
    indicator.style.setProperty('--w', `${tab.offsetWidth}px`);
  };

  const show = (id: string) => {
    for (const t of tabs) {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    }
    for (const p of panels) p.hidden = p.dataset.panel !== id;
    place();
    sessionStorage.setItem(STORAGE_KEY, id);
  };

  const select = (id: string, focus = false) => {
    const from = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const to = tabs.findIndex((t) => t.dataset.tab === id);
    if (to < 0) return;
    if (focus) tabs[to].focus();
    if (from === to) return;
    document.querySelector<HTMLFormElement>('form.filters')?.reset();
    const before = box.offsetHeight;
    show(id);
    if (reduce.matches) return;
    const panel = panels.find((p) => p.dataset.panel === id)!;
    const shift = `${to > from ? 3 : -3}rem`;
    panel.animate([{ opacity: 0, transform: `translateX(${shift})` }, { opacity: 1, transform: 'none' }], { duration: 380, easing: EASE });
    box.animate([{ height: `${before}px`, overflow: 'hidden' }, { height: `${box.offsetHeight}px`, overflow: 'hidden' }], { duration: 380, easing: EASE });
  };

  for (const t of tabs) t.addEventListener('click', () => select(t.dataset.tab!));
  // "/" anywhere on the page (outside a text field): the search tab, cursor in the search field.
  document.addEventListener('keydown', (e) => {
    const el = e.target as HTMLElement;
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
    e.preventDefault();
    select('search');
    document.querySelector<HTMLInputElement>('form.filters [name="q"]')?.focus();
  });
  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern, automatic activation).
  list.addEventListener('keydown', (e) => {
    const i = tabs.findIndex((t) => t === document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(tabs[(next + tabs.length) % tabs.length].dataset.tab!, true);
  });

  // First tab: the one that holds the active filter (a region → map, an era → eras), else the last
  // one used in this browser session (e.g. coming back from a profile), else search.
  const params = new URLSearchParams(location.search);
  const start = params.has('region') ? 'map' : params.has('era') ? 'eras' : (sessionStorage.getItem(STORAGE_KEY) ?? 'search');
  show(tabs.some((t) => t.dataset.tab === start) ? start : 'search');
  root.classList.add('is-ready');
  new ResizeObserver(place).observe(list);
}
