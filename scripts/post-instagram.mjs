// Publishes one profile to Instagram as a carousel: the 4:5 portrait card (/og/instagram/<slug>.jpg), then the
// text slides (/og/instagram/<slug>/2.jpg, 3.jpg…), with a caption that tells the story on its own. Instagram
// captions can't hold clickable links, so the post reads in full in the app; the address is plain text and the
// bio links to the site.
// Run by .github/workflows/post-instagram.yml; the token comes from $INSTAGRAM_ACCESS_TOKEN.
// Without a profile it posts today's entry (Kyiv time) from the month's plan, social/YYYY-MM.txt.
// To see a post before it goes out: scripts/preview-social.mjs.
//
// Usage: node scripts/post-instagram.mjs [profile link or slug] [--dry-run]
import { pathToFileURL } from 'node:url';
import { SITE, headline, pickProfile, assertLive, graphApi } from './social.mjs';

const MAX_LENGTH = 2200; // Instagram caption limit
const STORY_LENGTH = 1500; // keeps the caption a read of a minute or so
const MAX_SLIDES = 10; // Instagram carousel limit
// Instagram allows 5 hashtags a post: the project, the topic, one in English, the person's field and their name.
const TAGS = ['#знайсвоїх', '#історіяукраїни', '#ukraine'];
const GROUP_TAGS = {
  statehood: '#державотворення',
  literature: '#українськалітература',
  'visual-arts': '#українськемистецтво',
  'performing-arts': '#українськакультура',
  science: '#українськанаука',
  civic: '#громадянськесуспільство',
  faith: '#українськацерква',
  sport: '#українськийспорт',
  defenders: '#захисникиукраїни',
};

// The English surname as a tag (#Shevchenko, #AntonenkoDavydovych); names without one, like "Yaroslav the Wise",
// in full (#YaroslavTheWise).
export function nameTag(enName) {
  const name = enName.replace(/\s*\(.*\)/, '');
  const words = (/ [a-z]/.test(name) ? name : name.split(' ').at(-1)).split(/[ -]/);
  return `#${words.map((w) => w[0].toUpperCase() + w.slice(1)).join('')}`;
}

export function hashtags(f, enName) {
  const group = GROUP_TAGS[f.group];
  if (!group) throw new Error(`No hashtag for group ${f.group}`);
  return [...TAGS, group, ...(enName ? [nameTag(enName)] : [])].join(' ');
}

// The profile's story as plain paragraphs: no headings, links reduced to their text, no emphasis marks.
export function storyParagraphs(markdown) {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#'))
    .map((p) => p.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?|__?/g, '').replace(/\s*\n\s*/g, ' '));
}

// Whole paragraphs, in order, while they fit; the first one is cut at a sentence end if it alone is too long.
function story(markdown, budget) {
  const out = [];
  let used = 0;
  for (const p of storyParagraphs(markdown)) {
    if (used + p.length + 2 > budget) {
      if (!out.length) out.push(p.slice(0, budget).replace(/[^.!?…»]*$/, ''));
      break;
    }
    out.push(p);
    used += p.length + 2;
  }
  return out.filter(Boolean).join('\n\n');
}

export function caption(f, url, markdown = '', enName) {
  const head = headline(f);
  const tail = `Повна історія, фото й джерела — за посиланням у профілі:\n${url.replace(/^https:\/\//, '')}\n\n${hashtags(f, enName)}`;
  const budget = Math.min(STORY_LENGTH, MAX_LENGTH - head.length - tail.length - 4);
  const text = `${head}\n\n${story(markdown, budget) || f.summary}\n\n${tail}`;
  if ([...text].length > MAX_LENGTH) throw new Error(`Caption is ${[...text].length} characters; Instagram allows ${MAX_LENGTH}`);
  return text;
}

// The portrait card and the text slides that exist for this profile.
async function images(slug) {
  const list = [`${SITE}/og/instagram/${slug}.jpg`];
  for (let n = 2; n <= MAX_SLIDES; n++) {
    const url = `${SITE}/og/instagram/${slug}/${n}.jpg`;
    if (!(await fetch(url, { method: 'HEAD' })).ok) break;
    list.push(url);
  }
  return list;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const profile = pickProfile(args.find((a) => !a.startsWith('--')));
  if (!profile) return;
  const text = caption(profile.fields, profile.url, profile.markdown, profile.enName);
  await assertLive(profile.url);
  await assertLive(`${SITE}/og/instagram/${profile.slug}.jpg`);
  const slides = await images(profile.slug);

  console.log(`${text}\n\nImages:\n${slides.join('\n')}\n`);
  if (dryRun) return console.log('Dry run: nothing posted.');
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) throw new Error('Set INSTAGRAM_ACCESS_TOKEN');
  const api = graphApi('https://graph.instagram.com', 'Instagram', process.env.INSTAGRAM_ACCESS_TOKEN);
  // Meta asks to wait until a container has fetched its image before using it.
  const ready = async (container) => {
    for (let i = 0; ; i++) {
      const { status_code } = await api(container, { fields: 'status_code' }, 'GET');
      if (status_code === 'FINISHED') return container;
      if (status_code === 'ERROR' || status_code === 'EXPIRED' || i === 30) throw new Error(`Container ${container}: ${status_code}`);
      await new Promise((r) => setTimeout(r, 10000));
    }
  };

  const { user_id } = await api('me', { fields: 'user_id' }, 'GET');
  const children = [];
  for (const image_url of slides) children.push(await ready((await api(`${user_id}/media`, { image_url, is_carousel_item: 'true' })).id));
  const { id: carousel } = await api(`${user_id}/media`, { media_type: 'CAROUSEL', children: children.join(','), caption: text });
  const { id } = await api(`${user_id}/media_publish`, { creation_id: await ready(carousel) });
  const { permalink } = await api(id, { fields: 'permalink' }, 'GET');
  console.log(`Posted: ${permalink}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
