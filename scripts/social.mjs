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

// One emoji per group (categories.json) on both sides of the role.
const GROUP_EMOJI = {
  statehood: '🏛️',
  literature: '📖',
  'visual-arts': '🎨',
  'performing-arts': '🎭',
  science: '🔬',
  civic: '🕊️',
  faith: '🕯️',
  sport: '🏅',
  defenders: '🛡️',
};

export const wrap = (text, icon) => `${icon} ${text} ${icon}`;

// The first two lines of a post: name and years between flags, then the role between the group's emoji.
export function headline(f) {
  const emoji = GROUP_EMOJI[f.group];
  if (!emoji) throw new Error(`No emoji for group ${f.group}`);
  return `${wrap(`${f.name} (${years(f)})`, '🇺🇦')}\n${wrap(f.role, emoji)}`;
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
  const markdown = readFileSync(file, 'utf8');
  const en = `src/content/people/en/${slug}.md`;
  const enName = existsSync(en) ? readFields(readFileSync(en, 'utf8')).name : undefined;
  return { slug, fields: readFields(markdown), markdown, enName, url: `${SITE}/uk/people/${slug}/` };
}

// Meta's APIs fetch the image from the site, so the profile and its card must be live (drafts aren't).
export async function assertLive(url) {
  const res = await fetch(url, { method: 'HEAD' });
  if (!res.ok) throw new Error(`${url} returned ${res.status}; only profiles live on the site can be posted`);
}

// Errors Meta returns without acting on the request, so a retry can't post twice: ones it marks transient, and
// "media not found" for a post just published but not yet visible to the next call (e.g. a reply to it).
const retryable = (error) => error?.is_transient === true || (error?.code === 24 && error?.error_subcode === 4279009);

// A caller for one of Meta's Graph APIs (Threads or Instagram): query parameters, JSON reply, errors thrown.
export const graphApi = (base, name, token) => async (path, params, method = 'POST') => {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${base}/${path}?${new URLSearchParams({ ...params, access_token: token })}`, { method });
    const data = await res.json();
    if (res.ok) return data;
    const message = `${name} API ${res.status}: ${JSON.stringify(data.error ?? data)}`;
    if (attempt === 5 || !retryable(data.error)) throw new Error(message);
    console.log(`${message}; retrying (${attempt} of 4)`);
    await new Promise((r) => setTimeout(r, 10000));
  }
};
