// Shared by the social posting scripts (post-threads.mjs, post-instagram.mjs): which profile to post and its fields.
import { readFileSync, existsSync } from 'node:fs';

export const SITE = 'https://namesofukraine.com';
const PLAN_DIR = 'social';

export function slugFrom(input) {
  const path = input.trim().replace(/^https?:\/\/[^/]+/, '');
  const slug = (path.match(/^\/(?:uk|en)\/people\/([a-z0-9-]+)\/?$/) ?? path.match(/^([a-z0-9-]+)$/))?.[1];
  if (!slug) throw new Error(`Not a profile link or slug: ${input}`);
  return slug;
}

// A month's plan: line N is day N, a profile link or slug, or `-` for no post; `#` starts a comment.
// An empty line is an error, so a stray blank can't shift the rest of the month by a day.
export function parsePlan(text) {
  return text
    .replace(/\n$/, '')
    .split('\n')
    .map((line, i) => {
      const entry = line.replace(/#.*/, '').trim();
      if (entry === '-') return null;
      if (!entry) throw new Error(`Line ${i + 1} is empty; use - for a day with no post`);
      return slugFrom(entry);
    });
}

export function kyivDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(now); // YYYY-MM-DD
}

// The fields a post needs, from the top-level `key: value` lines of the frontmatter (values are plain or "quoted").
export function readFields(markdown) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const fields = {};
  for (const [, key, value] of frontmatter.matchAll(/^([a-z_]+): (.+)$/gm)) fields[key] = value.replace(/^"(.*)"$/, '$1');
  return fields;
}

export function years(f) {
  const year = (date, circa) => (circa === 'true' ? 'бл. ' : '') + Number(date.slice(0, 4));
  return f.died ? `${year(f.born, f.born_circa)}–${year(f.died, f.died_circa)}` : `нар. ${year(f.born, f.born_circa)}`;
}

// The profile given as a link or slug, or else today's entry (Kyiv time) in social/YYYY-MM.txt; null if none is planned.
export function pickProfile(input) {
  let slug;
  if (input) slug = slugFrom(input);
  else {
    const today = kyivDate();
    const plan = `${PLAN_DIR}/${today.slice(0, 7)}.txt`;
    slug = existsSync(plan) ? parsePlan(readFileSync(plan, 'utf8'))[Number(today.slice(8)) - 1] : null;
    if (!slug) {
      console.log(`Nothing planned for ${today} in ${plan}: nothing posted.`);
      return null;
    }
    console.log(`${today}: entry ${Number(today.slice(8))} of ${plan}\n`);
  }
  const file = `src/content/people/uk/${slug}.md`;
  if (!existsSync(file)) throw new Error(`No profile ${file}`);
  return { slug, fields: readFields(readFileSync(file, 'utf8')), url: `${SITE}/uk/people/${slug}/` };
}

// Meta's APIs fetch the image from the site, so the profile and its card must be live (drafts aren't).
export async function assertLive(url) {
  const res = await fetch(url, { method: 'HEAD' });
  if (!res.ok) throw new Error(`${url} returned ${res.status}; only profiles live on the site can be posted`);
}

// A caller for one of Meta's Graph APIs (Threads or Instagram): query parameters, JSON reply, errors thrown.
export const graphApi = (base, name, token) => async (path, params, method = 'POST') => {
  const res = await fetch(`${base}/${path}?${new URLSearchParams({ ...params, access_token: token })}`, { method });
  const data = await res.json();
  if (!res.ok) throw new Error(`${name} API ${res.status}: ${JSON.stringify(data.error ?? data)}`);
  return data;
};
