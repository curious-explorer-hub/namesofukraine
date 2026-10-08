// Home page: the full card list (for search and filters) is a separate file (src/components/HomeCatalogue.astro),
// fetched after the page loads so the page itself stays small. Resolves once the cards are in place, or
// without them if the request fails (filters then find nobody).

import { markCards } from './read-marks';

export async function loadCatalogue() {
  const catalogue = document.querySelector<HTMLElement>('.catalogue[data-src]');
  if (!catalogue) return;
  try {
    const res = await fetch(catalogue.dataset.src!);
    if (!res.ok) return;
    catalogue.insertAdjacentHTML('afterbegin', await res.text());
    markCards(catalogue);
  } catch {
    // Offline: the page still works, only search and filters have no cards.
  }
}
