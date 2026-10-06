// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEY, storedTheme } from './theme';

beforeEach(() => localStorage.clear());

describe('stored theme', () => {
  it('is empty until the visitor picks one, so the system setting applies', () => {
    expect(storedTheme()).toBeNull();
  });

  it('returns the saved choice', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    expect(storedTheme()).toBe('dark');
  });

  it('ignores anything that is not light or dark', () => {
    localStorage.setItem(STORAGE_KEY, 'sepia');
    expect(storedTheme()).toBeNull();
  });

  it('uses the same key as public/theme.js, which runs before the first paint', async () => {
    const { readFileSync } = await import('node:fs');
    expect(readFileSync('public/theme.js', 'utf8')).toContain(`'${STORAGE_KEY}'`);
  });
});
