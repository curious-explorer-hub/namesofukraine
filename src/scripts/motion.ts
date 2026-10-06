// Motion enhancements. Both are optional: without them (or without JavaScript) the site works the same.

const NAME = 'portrait';

// "/uk/people/<slug>/" → "<slug>"
export const personSlug = (url: string | null | undefined): string | undefined =>
  url ? new URL(url).pathname.match(/^\/(?:uk|en)\/people\/([^/]+)\/$/)?.[1] : undefined;

const visible = (el: Element) => el.getClientRects().length > 0;

const cardPortrait = (slug: string) =>
  [...document.querySelectorAll<HTMLElement>(`.person-item[data-slug="${CSS.escape(slug)}"] .person-portrait`)].find(visible);

const clearNames = () => {
  for (const el of document.querySelectorAll<HTMLElement>('[data-vt-portrait]')) {
    el.style.viewTransitionName = '';
    delete el.dataset.vtPortrait;
  }
};

const name = (el: HTMLElement, value = NAME) => {
  el.style.viewTransitionName = value;
  el.dataset.vtPortrait = '';
};

// Card ↔ profile: the card's portrait grows into the profile portrait, and shrinks back on return.
// Uses cross-document view transitions (@view-transition in global.css); other browsers just navigate.
// The profile portrait is named in CSS, so arriving on a profile needs no script; a card gets the
// name only for the navigation it takes part in, as one page can show the same person twice.
export function initPortraitTransitions() {
  let clicked: HTMLElement | undefined;
  document.addEventListener('click', (e) => {
    clicked = (e.target as Element).closest?.<HTMLElement>('.person-item') ?? undefined;
  });

  window.addEventListener('pageswap', (e) => {
    if (!e.viewTransition) return;
    const to = personSlug(e.activation?.entry.url);
    const portrait = clicked?.dataset.slug === to ? clicked?.querySelector<HTMLElement>('.person-portrait') : null;
    if (!portrait) return;
    // Leaving a profile through a "read next" card: that card, not this profile's portrait, morphs.
    const own = document.querySelector<HTMLElement>('.profile-portrait');
    if (own) name(own, 'none');
    name(portrait);
  });

  window.addEventListener('pagereveal', (e) => {
    clearNames();
    if (!e.viewTransition || document.querySelector('.profile-portrait')) return;
    // `?.`: Safari before 26 has no Navigation API
    const from = personSlug(window.navigation?.activation?.from?.url);
    const portrait = from ? cardPortrait(from) : undefined;
    if (!portrait) return;
    name(portrait);
    e.viewTransition.finished.finally(clearNames);
  });
}

// A soft light that follows the pointer over a card (pointer devices only; the light itself is CSS).
export function initCardSpotlight() {
  if (!matchMedia('(hover: hover)').matches) return;
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = (e.target as Element).closest?.<HTMLElement>('.person');
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - box.left}px`);
      card.style.setProperty('--my', `${e.clientY - box.top}px`);
    },
    { passive: true },
  );
}
