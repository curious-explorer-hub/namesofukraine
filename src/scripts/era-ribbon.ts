// Era and collection ribbons: a highlight in the card's colour slides to the selected card. The filter
// script sets aria-pressed; this only follows it. Without it, the selected card simply fills with its
// colour (CSS).

export function initEraIndicator() {
  for (const list of document.querySelectorAll<HTMLElement>('.ribbon-bands')) {
    const indicator = list.querySelector<HTMLElement>('.ribbon-indicator');
    if (indicator) follow(list, indicator);
  }
}

function follow(list: HTMLElement, indicator: HTMLElement) {
  const bands = [...list.querySelectorAll<HTMLButtonElement>('.era')];

  const place = (slide: boolean) => {
    const band = bands.find((b) => b.getAttribute('aria-pressed') === 'true');
    // Appearing (nothing was selected) or resizing: jump into place, then fade in; otherwise slide.
    const jump = !slide || !indicator.hasAttribute('data-active');
    indicator.classList.toggle('is-jumping', jump);
    if (band) {
      indicator.toggleAttribute('data-active', true);
      indicator.style.setProperty('--era', getComputedStyle(band).getPropertyValue('--era'));
      indicator.style.setProperty('--x', `${band.offsetLeft}px`);
      indicator.style.setProperty('--y', `${band.offsetTop}px`);
      indicator.style.setProperty('--w', `${band.offsetWidth}px`);
      indicator.style.setProperty('--h', `${band.offsetHeight}px`);
    } else indicator.removeAttribute('data-active');
    if (jump) requestAnimationFrame(() => indicator.classList.remove('is-jumping'));
  };

  list.classList.add('has-indicator');
  place(false);
  new MutationObserver(() => place(true)).observe(list, { subtree: true, attributeFilter: ['aria-pressed'] });
  new ResizeObserver(() => place(false)).observe(list);
}
