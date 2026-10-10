// Publishes one profile to Instagram: the 4:5 card (/og/instagram/<slug>.jpg) with name, years, role, summary
// and the profile address, in Ukrainian. Instagram captions can't hold clickable links, so the address is plain
// text and the bio links to the site.
// Run by .github/workflows/post-instagram.yml; the token comes from $INSTAGRAM_ACCESS_TOKEN.
// Without a profile it posts today's entry (Kyiv time) from the month's plan, social/YYYY-MM.txt.
//
// Usage: node scripts/post-instagram.mjs [profile link or slug] [--dry-run]
import { pathToFileURL } from 'node:url';
import { SITE, years, pickProfile, assertLive, graphApi } from './social.mjs';

const MAX_LENGTH = 2200; // Instagram caption limit

export function caption(f, url) {
  const text = `${f.name} (${years(f)})\n${f.role}\n\n${f.summary}\n\nБільше — за посиланням у профілі:\n${url.replace(/^https:\/\//, '')}`;
  if ([...text].length > MAX_LENGTH) throw new Error(`Caption is ${[...text].length} characters; Instagram allows ${MAX_LENGTH}`);
  return text;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const profile = pickProfile(args.find((a) => !a.startsWith('--')));
  if (!profile) return;
  const image = `${SITE}/og/instagram/${profile.slug}.jpg`;
  const text = caption(profile.fields, profile.url);
  await assertLive(profile.url);
  await assertLive(image);

  console.log(`${text}\n\nImage: ${image}\n`);
  if (dryRun) return console.log('Dry run: nothing posted.');
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) throw new Error('Set INSTAGRAM_ACCESS_TOKEN');
  const api = graphApi('https://graph.instagram.com', 'Instagram', process.env.INSTAGRAM_ACCESS_TOKEN);

  const { user_id } = await api('me', { fields: 'user_id' }, 'GET');
  const { id: container } = await api(`${user_id}/media`, { image_url: image, caption: text });
  // Meta asks to wait until the container has fetched the image before publishing.
  for (let i = 0; ; i++) {
    const { status_code } = await api(container, { fields: 'status_code' }, 'GET');
    if (status_code === 'FINISHED') break;
    if (status_code === 'ERROR' || status_code === 'EXPIRED' || i === 30) throw new Error(`Container ${container}: ${status_code}`);
    await new Promise((r) => setTimeout(r, 10000));
  }
  const { id } = await api(`${user_id}/media_publish`, { creation_id: container });
  const { permalink } = await api(id, { fields: 'permalink' }, 'GET');
  console.log(`Posted: ${permalink}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
