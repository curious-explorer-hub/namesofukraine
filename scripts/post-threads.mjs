// Publishes one profile to Threads: the share card, name, years, role, summary and a link, in Ukrainian.
// Run by .github/workflows/post-threads.yml; the token comes from $THREADS_ACCESS_TOKEN.
// Only profiles live on the site can be posted: Threads fetches the card from the site, and drafts aren't there.
// Without a profile it posts today's entry (Kyiv time) from the month's plan, social/YYYY-MM.txt.
//
// Usage: node scripts/post-threads.mjs [profile link or slug] [--dry-run]
import { pathToFileURL } from 'node:url';
import { SITE, years, pickProfile, assertLive, graphApi } from './social.mjs';

const MAX_LENGTH = 500; // Threads text limit

export function postText(f, url) {
  const text = `${f.name} (${years(f)})\n${f.role}\n\n${f.summary}\n\n${url}`;
  if ([...text].length > MAX_LENGTH) throw new Error(`Post is ${[...text].length} characters; Threads allows ${MAX_LENGTH}`);
  return text;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const profile = pickProfile(args.find((a) => !a.startsWith('--')));
  if (!profile) return;
  const image = `${SITE}/og/uk/${profile.slug}.jpg`;
  const text = postText(profile.fields, profile.url);
  await assertLive(profile.url);
  await assertLive(image);

  console.log(`${text}\n\nImage: ${image}\n`);
  if (dryRun) return console.log('Dry run: nothing posted.');
  if (!process.env.THREADS_ACCESS_TOKEN) throw new Error('Set THREADS_ACCESS_TOKEN');
  const api = graphApi('https://graph.threads.net/v1.0', 'Threads', process.env.THREADS_ACCESS_TOKEN);

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
