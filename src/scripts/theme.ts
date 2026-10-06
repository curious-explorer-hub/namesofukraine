// Light / dark theme toggle in the header. public/theme.js sets <html data-theme> before the first
// paint; this keeps the toggle in sync, saves the visitor's choice in this browser only, and follows the
// system setting while no choice has been made.

export const STORAGE_KEY = 'iu:theme';
export type Theme = 'light' | 'dark';

export function storedTheme(storage: Storage = localStorage): Theme | null {
  try {
    const value = storage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null; // blocked storage: follow the system
  }
}

export function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const system = matchMedia('(prefers-color-scheme: dark)');

  const apply = (theme: Theme) => {
    root.dataset.theme = theme;
    toggle?.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  apply(storedTheme() ?? (system.matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // blocked storage: the theme still changes for this page
    }
  });
  system.addEventListener('change', (e) => {
    if (!storedTheme()) apply(e.matches ? 'dark' : 'light');
  });
}
