// Era ribbon: a highlight in the era's colour slides to the selected band. The filter script sets
// aria-pressed; this only follows it. Without it, the selected band simply fills with its colour (CSS).

export function initEraIndicator() {
  const list = document.querySelector<HTMLElement>('.ribbon-bands');
  const indicator = list?.querySelector<HTMLElement>('.ribbon-indicator');
  if (!list || !indicator) return;
  const bands = [...list.querySelectorAll<HTMLButtonElement>('.era')];

  const place = (slide: boolean) => {
    const band = bands.find((b) => b.getAttribute('aria-pressed') === 'true');
    // Appearing (nothing was selected) or resizing: jump into place, then fade in; otherwise slide.
    const jump = !slide || !indicator.dataset.era;
    indicator.classList.toggle('is-jumping', jump);
    if (band) {
      indicator.dataset.era = band.dataset.era;
      indicator.style.setProperty('--x', `${band.offsetLeft}px`);
      indicator.style.setProperty('--w', `${band.offsetWidth}px`);
    } else delete indicator.dataset.era;
    if (jump) requestAnimationFrame(() => indicator.classList.remove('is-jumping'));
  };

  list.classList.add('has-indicator');
  place(false);
  new MutationObserver(() => place(true)).observe(list, { subtree: true, attributeFilter: ['aria-pressed'] });
  new ResizeObserver(() => place(false)).observe(list);
}
