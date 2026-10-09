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

// Name forms for finding mentions of profiled people (BACKLOG I17); one entry per profile, both languages.
describe('aliases.json', () => {
  const aliases = JSON.parse(readFileSync(join(dir, '..', '..', 'aliases.json'), 'utf8')) as Record<string, { uk: string[]; en: string[] }>;
  const slugs = Object.keys(aliases).filter((k) => !k.startsWith('$'));

  it('has an entry for every profile and none for missing ones', () => {
    expect(slugs.sort()).toEqual(profiles.map((f) => f.slice(0, -3)).sort());
  });

  it.each(slugs)('%s: has at least one name form in each language', (slug) => {
    expect(aliases[slug].uk.length).toBeGreaterThan(0);
    expect(aliases[slug].en.length).toBeGreaterThan(0);
  });
});

// Links between profiles in the story text (BACKLOG I17): /<lang>/people/<slug>/, same language as the file, to a profile that exists.
describe('links between profiles', () => {
  for (const lang of ['uk', 'en']) {
    const langDir = join(dir, '..', lang);
    it.each(readdirSync(langDir).filter((f) => f.endsWith('.md')))(`${lang}/%s: profile links point to an existing profile in the same language`, (file) => {
      for (const [, linkLang, slug] of readFileSync(join(langDir, file), 'utf8').matchAll(/\]\(\/(\w+)\/people\/([^/)]+)\/?\)/g)) {
        expect(linkLang, `${slug}: wrong language`).toBe(lang);
        expect(existsSync(join(dir, `${slug}.md`)), `${slug}: no such profile`).toBe(true);
        expect(slug, 'links to itself').not.toBe(file.slice(0, -3));
      }
    });
  }
});

// The en file pairs its `gallery` and `videos` entries with the uk ones by position; a missing entry
// would show the Ukrainian caption or title on the English page.
describe('en gallery and videos', () => {
  const entries = (text: string, field: string) => text.match(new RegExp(`^${field}:\\n((?: .*\\n)*)`, 'm'))?.[1].match(/^ {2}- /gm)?.length ?? 0;
  const enDir = join(dir, '..', 'en');
  it.each(profiles.filter((f) => existsSync(join(enDir, f))))('%s: the en file has one entry per uk entry', (file) => {
    const uk = readFileSync(join(dir, file), 'utf8');
    const en = readFileSync(join(enDir, file), 'utf8');
    for (const field of ['gallery', 'videos']) expect(entries(en, field), field).toBe(entries(uk, field));
  });
});

// Women's profiles (`gender: female`) show the tags in feminine form in Ukrainian: Поетеса, not Поет.
describe('categories.json tags', () => {
  const { tags } = JSON.parse(readFileSync(join(dir, '..', '..', 'categories.json'), 'utf8')) as { tags: { id: string; uk_female?: string }[] };
  it.each(tags.map((t) => [t.id, t.uk_female]))('%s has a Ukrainian feminine form', (_, form) => {
    expect(form).toBeTruthy();
  });
});
