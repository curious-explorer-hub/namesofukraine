// Profile side panel (portrait, facts, "alive at the same time"), pinned on wide screens. A panel taller
// than the window pins by its bottom instead, so its last rows are never out of reach.
const GAP = 24;

export function initStickySide() {
  const side = document.querySelector<HTMLElement>('.profile-facts');
  if (!side || !('ResizeObserver' in window)) return;
  const update = () => side.style.setProperty('--side-top', `${Math.min(GAP, innerHeight - side.offsetHeight - GAP)}px`);
  new ResizeObserver(update).observe(side);
  addEventListener('resize', update);
}
