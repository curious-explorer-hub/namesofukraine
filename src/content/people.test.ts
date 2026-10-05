import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Profiles without a freely licensed portrait show a monogram; any portrait that is set must be credited and exist.
const dir = join(dirname(fileURLToPath(import.meta.url)), 'people', 'uk');
const profiles = readdirSync(dir).filter((f) => f.endsWith('.md'));

describe('profile portraits', () => {
  it.each(profiles)('%s: a portrait, if set, has credits and the image file exists', (file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    if (!/^image:/m.test(text)) return;
    const src = text.match(/^image:\n {2}src: (.+)$/m)?.[1];
    expect(src, 'image.src missing').toBeTruthy();
    for (const field of ['alt', 'author', 'license', 'source_url']) {
      expect(text, `image.${field} missing`).toMatch(new RegExp(`^ {2}${field}: .+$`, 'm'));
    }
    expect(existsSync(join(dir, src!)), `${src} not found`).toBe(true);
  });
});
