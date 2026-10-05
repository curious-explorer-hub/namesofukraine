// "Already read" marks. Stored only in this browser (localStorage), shared by both languages
// because profiles use the same slug. Nothing is sent to a server.

export const STORAGE_KEY = 'iu:read';

export function getRead(storage: Storage = localStorage): Set<string> {
  try {
    const list = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]');
    return new Set(Array.isArray(list) ? list.filter((s) => typeof s === 'string') : []);
  } catch {
    return new Set(); // corrupted or blocked storage: behave as if nothing was read
  }
}

export function setRead(slug: string, read: boolean, storage: Storage = localStorage) {
  const set = getRead(storage);
  if (read) set.add(slug);
  else set.delete(slug);
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // Storage full or disabled (e.g. strict private mode): marks just won't persist.
  }
}

// Cards: show the badge on people already read.
export function markCards(root: ParentNode = document) {
  const read = getRead();
  for (const item of root.querySelectorAll<HTMLElement>('.person-item[data-slug]')) {
    item.classList.toggle('is-read', read.has(item.dataset.slug!));
  }
}

// Profile page: mark as read when the end of the story is reached, and offer a manual toggle.
export function initProfile() {
  const profile = document.querySelector<HTMLElement>('[data-read-slug]');
  const button = document.querySelector<HTMLButtonElement>('[data-read-toggle]');
  if (!profile || !button) return;
  const slug = profile.dataset.readSlug!;
  const render = () => {
    const read = getRead().has(slug);
    button.setAttribute('aria-pressed', String(read));
    button.textContent = (read ? button.dataset.labelRead : button.dataset.labelUnread) ?? '';
  };
  button.addEventListener('click', () => {
    setRead(slug, !getRead().has(slug));
    render();
  });

  const end = document.querySelector('[data-read-end]');
  if (end && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setRead(slug, true);
        render();
        observer.disconnect();
      }
    });
    observer.observe(end);
  }
  button.hidden = false;
  render();
}

// "Read next" on a profile: related people already read are left out. If none are left, suggest
// up to FALLBACK_LIMIT unread people from the same group; if there are none either, hide the section.
export const FALLBACK_LIMIT = 4;

export function updateReadNext(root: ParentNode = document) {
  const section = root.querySelector<HTMLElement>('[data-read-next]');
  if (!section) return;
  const read = getRead();
  const items = [...section.querySelectorAll<HTMLElement>('.person-item[data-slug]')];
  const isUnread = (i: HTMLElement) => !read.has(i.dataset.slug!);
  const related = items.filter((i) => !i.hasAttribute('data-fallback'));
  const backups = items.filter((i) => i.hasAttribute('data-fallback'));
  const unreadRelated = related.filter(isUnread);
  const shown = new Set(unreadRelated.length ? unreadRelated : backups.filter(isUnread).slice(0, FALLBACK_LIMIT));
  for (const item of items) item.hidden = !shown.has(item);
  section.hidden = shown.size === 0;
}

export function initReadMarks() {
  markCards();
  initProfile();
  updateReadNext();
  const refresh = () => {
    markCards();
    updateReadNext();
  };
  // Keep other open tabs in sync.
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) refresh();
  });
  // Coming back with the browser's Back button can restore the page from memory (bfcache)
  // without re-running scripts; refresh so marks made on the page you left are shown.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) refresh();
  });
}
