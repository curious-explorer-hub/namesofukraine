// Home page: the full card list (for search and filters) is a separate file (src/components/HomeCatalogue.astro),
// fetched after the page loads so the page itself stays small. Resolves once the cards are in place, or
// without them if the request fails (filters then find nobody).

import { markCards } from './read-marks';

// The fetch starts once the browser has painted the largest element (the hero), so the 100+ KB list never
// competes with it for bandwidth; Lighthouse counts anything requested before that paint against LCP.
// The timer covers browsers that don't report it, and tabs opened in the background, which never do.
const afterLargestPaint = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
    if (typeof PerformanceObserver === 'undefined' || !PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint')) return;
    new PerformanceObserver((_, observer) => {
      observer.disconnect();
      setTimeout(resolve);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

export async function loadCatalogue() {
  const catalogue = document.querySelector<HTMLElement>('.catalogue[data-src]');
  if (!catalogue) return;
  try {
    await afterLargestPaint();
    const res = await fetch(catalogue.dataset.src!);
    if (!res.ok) return;
    catalogue.insertAdjacentHTML('afterbegin', await res.text());
    markCards(catalogue);
  } catch {
    // Offline: the page still works, only search and filters have no cards.
  }
}
