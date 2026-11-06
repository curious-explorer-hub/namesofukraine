import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Event pages (src/content/events): an en file per uk file, the same number of timeline steps, and links
// only to profiles and events that exist, in the same language.
const root = dirname(fileURLToPath(import.meta.url));
const eventsDir = join(root, 'events');
const list = (dir: string) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : []);
const events = list(join(eventsDir, 'uk'));
const steps = (text: string) => text.match(/^timeline:\n((?: .*\n)*)/m)?.[1].match(/^ {2}- /gm)?.length ?? 0;

describe('events', () => {
  it.each(events)('%s: has an en file with one timeline step per uk step', (file) => {
    const en = join(eventsDir, 'en', file);
    expect(existsSync(en), 'en file missing').toBe(true);
    expect(steps(readFileSync(en, 'utf8'))).toBe(steps(readFileSync(join(eventsDir, 'uk', file), 'utf8')));
  });

  // Links from events to people and events; from profiles, only those to events (people.test.ts checks the rest).
  const check = (file: string, lang: string, kinds: string) => {
    for (const [, linkLang, kind, slug] of readFileSync(file, 'utf8').matchAll(new RegExp(`\\]\\(\\/(\\w+)\\/(${kinds})\\/([^/)]+)\\/?\\)`, 'g'))) {
      expect(linkLang, `${slug}: wrong language`).toBe(lang);
      expect(existsSync(join(root, kind, 'uk', `${slug}.md`)), `${kind}/${slug}: no such page`).toBe(true);
    }
  };
  for (const lang of ['uk', 'en']) {
    it.each(list(join(eventsDir, lang)))(`${lang}/%s: links point to existing pages in the same language`, (file) => check(join(eventsDir, lang, file), lang, 'people|events'));
    it(`${lang}: profile links to events point to existing events in the same language`, () => {
      for (const file of list(join(root, 'people', lang))) check(join(root, 'people', lang, file), lang, 'events');
    });
  }
});
