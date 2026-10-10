// Publishes one profile to Threads: the share card, name, years, role, summary and a link, in Ukrainian.
// Run by .github/workflows/post-threads.yml; the token comes from $THREADS_ACCESS_TOKEN.
// Only profiles live on the site can be posted: Threads fetches the card from the site, and drafts aren't there.
// Without a profile it posts today's entry (Kyiv time) from the month's plan, social/YYYY-MM.txt.
//
// Usage: node scripts/post-threads.mjs [profile link or slug] [--dry-run]
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const SITE = 'https://namesofukraine.com';
const API = 'https://graph.threads.net/v1.0';
const MAX_LENGTH = 500; // Threads text limit
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

export function postText(f, url) {
  const text = `${f.name} (${years(f)})\n${f.role}\n\n${f.summary}\n\n${url}`;
  if ([...text].length > MAX_LENGTH) throw new Error(`Post is ${[...text].length} characters; Threads allows ${MAX_LENGTH}`);
  return text;
}

async function api(path, params, method = 'POST') {
  const res = await fetch(`${API}/${path}?${new URLSearchParams({ ...params, access_token: process.env.THREADS_ACCESS_TOKEN })}`, { method });
  const data = await res.json();
  if (!res.ok) throw new Error(`Threads API ${res.status}: ${JSON.stringify(data.error ?? data)}`);
  return data;
}

async function assertLive(url) {
  const res = await fetch(url, { method: 'HEAD' });
  if (!res.ok) throw new Error(`${url} returned ${res.status}; only profiles live on the site can be posted`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const input = args.find((a) => !a.startsWith('--'));

  let slug;
  if (input) slug = slugFrom(input);
  else {
    const today = kyivDate();
    const plan = `${PLAN_DIR}/${today.slice(0, 7)}.txt`;
    slug = existsSync(plan) ? parsePlan(readFileSync(plan, 'utf8'))[Number(today.slice(8)) - 1] : null;
    if (!slug) return console.log(`Nothing planned for ${today} in ${plan}: nothing posted.`);
    console.log(`${today}: entry ${Number(today.slice(8))} of ${plan}\n`);
  }
  const file = `src/content/people/uk/${slug}.md`;
  if (!existsSync(file)) throw new Error(`No profile ${file}`);
  const url = `${SITE}/uk/people/${slug}/`;
  const image = `${SITE}/og/uk/${slug}.jpg`;
  const text = postText(readFields(readFileSync(file, 'utf8')), url);
  await assertLive(url);
  await assertLive(image);

  console.log(`${text}\n\nImage: ${image}\n`);
  if (dryRun) return console.log('Dry run: nothing posted.');
  if (!process.env.THREADS_ACCESS_TOKEN) throw new Error('Set THREADS_ACCESS_TOKEN');

  const { id: container } = await api('me/threads', { media_type: 'IMAGE', image_url: image, text });
  // Meta asks to wait until the container has fetched the image before publishing.
  for (let i = 0; ; i++) {
    const { status, error_message } = await api(container, { fields: 'status,error_message' }, 'GET');
    if (status === 'FINISHED') break;
    if (status === 'ERROR' || status === 'EXPIRED' || i === 30) throw new Error(`Container ${container}: ${status} ${error_message ?? ''}`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  const { id } = await api('me/threads_publish', { creation_id: container });
  const { permalink } = await api(id, { fields: 'permalink' }, 'GET');
  console.log(`Posted: ${permalink}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
