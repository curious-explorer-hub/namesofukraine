// The Stats page (src/views/StatsView.astro): tooltips and a crosshair on the charts, the switches
// (field by gender, visits by period, most read by month or week), the visitor's own progress from the
// read marks in this browser, and headline numbers that count up. Without it the page shows everything
// at its default setting.
import { getRead } from './read-marks';

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTooltips(root: ParentNode, tip: HTMLElement) {
  const show = (text: string, x: number, y: number) => {
    tip.textContent = text;
    tip.hidden = false;
    const { width, height } = tip.getBoundingClientRect();
    tip.style.left = `${Math.max(8, Math.min(innerWidth - width - 8, x + 14))}px`;
    tip.style.top = `${Math.max(8, y - height - 12)}px`;
  };
  for (const el of root.querySelectorAll<SVGElement>('[data-tip]')) {
    el.addEventListener('pointermove', (e) => {
      show(el.dataset.tip!, e.clientX, e.clientY);
      // Line charts: a crosshair and a dot on each line at this point.
      const svg = el.closest<SVGSVGElement>('svg[data-line]');
      if (!svg || el.dataset.x === undefined) return;
      const cross = svg.querySelector<SVGLineElement>('.stats-cross')!;
      cross.setAttribute('x1', el.dataset.x);
      cross.setAttribute('x2', el.dataset.x);
      cross.setAttribute('visibility', 'visible');
      const ys = el.dataset.ys!.split(',');
      svg.querySelectorAll('.stats-dot').forEach((dot, i) => {
        dot.setAttribute('cx', el.dataset.x!);
        dot.setAttribute('cy', ys[i]);
        dot.setAttribute('visibility', 'visible');
      });
    });
    el.addEventListener('pointerleave', () => {
      tip.hidden = true;
      el.closest('svg')?.querySelectorAll('.stats-cross, .stats-dot').forEach((m) => m.setAttribute('visibility', 'hidden'));
    });
  }
}

// A button group switches its target's `data-mode`; children marked `data-when` show for their mode.
function initSwitches(root: ParentNode) {
  for (const group of root.querySelectorAll<HTMLElement>('[data-switch]')) {
    const target = document.getElementById(group.dataset.switch!);
    if (!target) continue;
    group.hidden = false;
    const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[data-value]')];
    for (const button of buttons) {
      button.addEventListener('click', () => {
        for (const b of buttons) b.setAttribute('aria-pressed', String(b === button));
        target.dataset.mode = button.dataset.value;
        for (const el of target.querySelectorAll<HTMLElement | SVGElement>('[data-when]')) el.toggleAttribute('hidden', el.dataset.when !== button.dataset.value);
      });
    }
  }
}

function initProgress(root: ParentNode, storage?: Storage) {
  const section = root.querySelector<HTMLElement>('[data-you]');
  if (!section) return;
  let read: Set<string>;
  try {
    read = getRead(storage);
  } catch {
    return; // storage blocked: keep the section hidden
  }
  const rows = [...section.querySelectorAll<HTMLElement>('[data-slugs]')];
  const total = rows.reduce((n, r) => n + r.dataset.slugs!.split(' ').filter(Boolean).length, 0);
  let done = 0;
  const unread: string[] = [];
  for (const row of rows) {
    const slugs = row.dataset.slugs!.split(' ').filter(Boolean);
    const n = slugs.filter((s) => read.has(s)).length;
    done += n;
    row.style.setProperty('--all', `${(n / Math.max(1, slugs.length)) * 100}%`);
    row.querySelector('.stats-bar-val')!.textContent = `${n}/${slugs.length} (${Math.round((n / Math.max(1, slugs.length)) * 100)}%)`;
    if (!n) unread.push(row.dataset.label!);
  }
  section.querySelector('[data-you-count]')!.textContent = String(done);
  section.querySelector('[data-you-pct]')!.textContent = `${Math.round((done / Math.max(1, total)) * 100)}%`;
  section.querySelector<SVGCircleElement>('.stats-ring-fill')!.style.strokeDasharray = `${(done / Math.max(1, total)) * 100} 100`;
  const note = section.querySelector<HTMLElement>('[data-you-note]')!;
  const list = section.querySelector<HTMLElement>('[data-you-fields]')!;
  note.textContent = !done ? note.dataset.none! : unread.length ? list.dataset.templateUnread!.replace('{list}', new Intl.ListFormat(document.documentElement.lang, { type: 'conjunction' }).format(unread)) : '';
  section.hidden = false;
  root.querySelector<HTMLElement>('[data-you-tab]')?.removeAttribute('hidden');
}

function countUp(root: ParentNode) {
  if (reduceMotion()) return;
  const format = new Intl.NumberFormat(document.documentElement.lang);
  for (const el of root.querySelectorAll<HTMLElement>('[data-count]')) {
    const end = Number(el.dataset.count);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      el.textContent = format.format(Math.round(end * (1 - (1 - p) ** 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

// The section tab follows the section in view.
function initTabs(root: ParentNode) {
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('.stats-tabs a')];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) for (const tab of tabs) tab.toggleAttribute('aria-current', tab.hash === `#${e.target.id}`);
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  for (const s of root.querySelectorAll('.stats-band')) io.observe(s);
}

export function initStats(root: ParentNode = document, storage?: Storage) {
  const tip = root.querySelector<HTMLElement>('[data-stats-tip]');
  if (!root.querySelector('[data-stats]') || !tip) return;
  initTooltips(root, tip);
  initSwitches(root);
  initProgress(root, storage);
  countUp(root);
  if ('IntersectionObserver' in window) initTabs(root);
}
