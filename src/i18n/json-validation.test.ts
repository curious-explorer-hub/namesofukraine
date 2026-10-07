import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));

describe('i18n JSON files', () => {
  it('uk.json is valid JSON', () => {
    const content = readFileSync(join(here, 'uk.json'), 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  it('en.json is valid JSON', () => {
    const content = readFileSync(join(here, 'en.json'), 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  it('both files parse to objects', () => {
    const uk = JSON.parse(readFileSync(join(here, 'uk.json'), 'utf-8'));
    const en = JSON.parse(readFileSync(join(here, 'en.json'), 'utf-8'));
    expect(typeof uk).toBe('object');
    expect(typeof en).toBe('object');
  });
});
