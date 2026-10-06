// Site-wide search: a dialog opened from the header button, "/" or Ctrl/⌘+K. The index
// (/<lang>/search.json, src/lib/search-index.ts) is fetched the first time the dialog opens.

import { normalize } from './filter';
import type { SearchEntry } from '../lib/search-index';

const LIMIT = 8;

interface Indexed extends SearchEntry {
  name: string;
  role: string;
  text: string;
}

export const prepare = (entries: SearchEntry[]): Indexed[] =>
  entries.map((e) => ({ ...e, name: normalize(e.n), role: normalize(e.r), text: normalize(e.s) }));

// Every word of the query must appear somewhere; names that start with it come first, then a word
// of the name, then the rest of the name, the role, and the text. Ties keep the index order (birth).
export function rank(entries: Indexed[], query: string, limit = LIMIT): Indexed[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(' ');
  const score = (e: Indexed) =>
    e.name.startsWith(q) ? 0
    : e.name.split(' ').some((w) => w.startsWith(words[0])) ? 1
    : e.name.includes(q) ? 2
    : e.role.includes(q) ? 3
    : 4;
  return entries
    .filter((e) => words.every((w) => e.text.includes(w)))
    .map((e, i) => ({ e, i, s: score(e) }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .slice(0, limit)
    .map(({ e }) => e);
}

const typing = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

const initials = (name: string) => {
  const words = name.split(/\s+/);
  return [words[0], words.length > 1 ? words.at(-1) : undefined].map((w) => w?.[0] ?? '').join('');
};

export function initSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-search]');
  const openers = document.querySelectorAll<HTMLButtonElement>('[data-search-open]');
  if (!dialog) return;
  const form = dialog.querySelector('form')!;
  const input = dialog.querySelector<HTMLInputElement>('.search-input')!;
  const list = dialog.querySelector<HTMLUListElement>('.search-results')!;
  const status = dialog.querySelector<HTMLElement>('.search-status')!;
  const text = dialog.dataset as { src: string; empty: string; loading: string; error: string; found: string };

  let index: Indexed[] | undefined;
  let loading: Promise<void> | undefined;
  let results: Indexed[] = [];
  let active = -1;

  const load = () =>
    (loading ??= fetch(text.src)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((entries: SearchEntry[]) => {
        index = prepare(entries);
      })
      .catch(() => {
        loading = undefined; // try again next time
        status.textContent = text.error;
      }));

  const select = (i: number) => {
    active = i;
    for (const [n, li] of [...list.children].entries()) li.setAttribute('aria-selected', String(n === i));
    if (i >= 0) {
      input.setAttribute('aria-activedescendant', `search-option-${i}`);
      list.children[i]?.scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  };

  const option = (e: Indexed, i: number) => {
    const li = document.createElement('li');
    li.id = `search-option-${i}`;
    li.setAttribute('role', 'option');
    li.dataset.group = e.g;
    const a = document.createElement('a');
    a.href = e.u;
    a.tabIndex = -1;
    const face = document.createElement('span');
    face.className = 'search-face';
    if (e.i) {
      const img = document.createElement('img');
      img.src = e.i;
      img.alt = '';
      img.style.objectPosition = e.p ?? '';
      face.append(img);
    } else face.textContent = initials(e.n);
    const body = document.createElement('span');
    body.className = 'search-text';
    for (const [cls, value] of [['search-name', e.n], ['search-role', e.r], ['search-years', e.y]]) {
      const span = document.createElement('span');
      span.className = cls;
      span.textContent = value;
      body.append(span);
    }
    a.append(face, body);
    li.append(a);
    li.addEventListener('pointermove', () => active !== i && select(i));
    return li;
  };

  const render = () => {
    const q = input.value.trim();
    if (!index) {
      status.textContent = q ? text.loading : '';
      return;
    }
    results = rank(index, q);
    list.replaceChildren(...results.map(option));
    input.setAttribute('aria-expanded', String(results.length > 0));
    status.textContent = !q ? '' : results.length ? text.found.replace('{n}', String(results.length)) : text.empty;
    select(results.length ? 0 : -1);
  };

  const open = () => {
    if (dialog.open) return input.select();
    dialog.showModal();
    input.select();
    if (!index) load().then(render);
    else render();
  };

  for (const b of openers) b.addEventListener('click', open);
  dialog.querySelector('.search-close')!.addEventListener('click', () => dialog.close());
  document.addEventListener('keydown', (e) => {
    const shortcut = (e.key === '/' && !typing(e.target)) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k');
    if (shortcut && !e.altKey) {
      e.preventDefault();
      open();
    }
  });
  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (!results.length || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    select((active + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length);
  });
  // Enter opens the highlighted person; Esc closes the dialog (native).
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (results[active]) location.href = results[active].u;
  });
  // A click on the backdrop (outside the panel) closes the dialog.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
