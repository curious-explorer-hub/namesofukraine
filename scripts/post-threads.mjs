// Publishes one profile to Threads, in Ukrainian: the share card with name, years, role and summary, then the story's
// closing section on why the person matters, and the link. When that doesn't fit in one post, the rest follows as
// replies (split between sentences), and the link ends the last one.
// Run by .github/workflows/post-threads.yml; the token comes from $THREADS_ACCESS_TOKEN.
// Only profiles live on the site can be posted: Threads fetches the card from the site, and drafts aren't there.
// Without a profile it posts today's entry (Kyiv time) from the month's plan, social/YYYY-MM.txt.
// To see a post before it goes out: scripts/preview-social.mjs.
//
// Usage: node scripts/post-threads.mjs [profile link or slug] [--dry-run]
import { pathToFileURL } from 'node:url';
import { SITE, years, pickProfile, assertLive, graphApi } from './social.mjs';
import { closingSection } from '../src/lib/story.mjs';

const MAX_LENGTH = 500; // Threads text limit
const length = (s) => [...s].length;

// Pieces of at most `max` characters, cut between sentences (or between words if one sentence is longer).
function split(text, max) {
  const parts = [];
  let part = '';
  for (const sentence of text.match(/[^.!?…]+[.!?…»"]*\s*/g) ?? [text]) {
    if (part && length(part + sentence) > max) {
      parts.push(part.trim());
      part = '';
    }
    part += sentence;
    while (length(part) > max) {
      const cut = part.lastIndexOf(' ', max);
      parts.push(part.slice(0, cut).trim());
      part = part.slice(cut + 1);
    }
  }
  return [...parts, part.trim()].filter(Boolean);
}

// The texts of the post and its replies, in order.
export function postTexts(f, url, markdown = '') {
  const main = `${f.name} (${years(f)})\n${f.role}\n\n${f.summary}`;
  const why = closingSection(markdown);
  const rest = why ? `${why.heading}\n\n${why.text}` : '';
  const single = rest ? `${main}\n\n${rest}\n\n${url}` : `${main}\n\n${url}`;
  if (length(single) <= MAX_LENGTH) return [single];
  const replies = split(rest, MAX_LENGTH - length(url) - 2);
  replies[replies.length - 1] += `\n\n${url}`;
  const texts = [main, ...replies];
  for (const text of texts) if (length(text) > MAX_LENGTH) throw new Error(`Post is ${length(text)} characters; Threads allows ${MAX_LENGTH}`);
  return texts;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const profile = pickProfile(args.find((a) => !a.startsWith('--')));
  if (!profile) return;
  const image = `${SITE}/og/uk/${profile.slug}.jpg`;
  const texts = postTexts(profile.fields, profile.url, profile.markdown);
  await assertLive(profile.url);
  await assertLive(image);

  console.log(`${texts.join('\n\n--- reply ---\n\n')}\n\nImage: ${image}\n`);
  if (dryRun) return console.log('Dry run: nothing posted.');
  if (!process.env.THREADS_ACCESS_TOKEN) throw new Error('Set THREADS_ACCESS_TOKEN');
  const api = graphApi('https://graph.threads.net/v1.0', 'Threads', process.env.THREADS_ACCESS_TOKEN);
  // Meta asks to wait until a container is ready (the image fetched) before publishing it.
  const publish = async (params) => {
    const { id: container } = await api('me/threads', params);
    for (let i = 0; ; i++) {
      const { status, error_message } = await api(container, { fields: 'status,error_message' }, 'GET');
      if (status === 'FINISHED') break;
      if (status === 'ERROR' || status === 'EXPIRED' || i === 30) throw new Error(`Container ${container}: ${status} ${error_message ?? ''}`);
      await new Promise((r) => setTimeout(r, 5000));
    }
    return (await api('me/threads_publish', { creation_id: container })).id;
  };

  const first = await publish({ media_type: 'IMAGE', image_url: image, text: texts[0] });
  let previous = first;
  for (const text of texts.slice(1)) previous = await publish({ media_type: 'TEXT', text, reply_to_id: previous });
  const { permalink } = await api(first, { fields: 'permalink' }, 'GET');
  console.log(`Posted: ${permalink}${texts.length > 1 ? ` (with ${texts.length - 1} ${texts.length === 2 ? 'reply' : 'replies'})` : ''}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
