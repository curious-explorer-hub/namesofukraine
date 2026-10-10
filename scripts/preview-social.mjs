// Shows how a profile's Instagram and Threads posts will look, from the local build, before anything is posted:
// writes .social-preview/<slug>.html with the carousel slides, the caption as Instagram folds it, and the Threads post.
// Run `npm run build` first, so dist/ has this branch's cards.
//
// Usage: node scripts/preview-social.mjs <profile link or slug> [more…]
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { pickProfile } from './social.mjs';
import { caption } from './post-instagram.mjs';
import { postTexts } from './post-threads.mjs';

const OUT = '.social-preview';
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const file = (path) => pathToFileURL(resolve(path)).href;

function page(profile) {
  const { slug, fields, markdown, url } = profile;
  const card = `dist/og/instagram/${slug}.jpg`;
  if (!existsSync(card)) throw new Error(`No ${card}: run npm run build first`);
  const dir = `dist/og/instagram/${slug}`;
  const slides = [card, ...(existsSync(dir) ? readdirSync(dir).sort((a, b) => parseInt(a) - parseInt(b)).map((f) => `${dir}/${f}`) : [])];
  const ig = caption(fields, url, markdown);
  const [first, ...rest] = ig.split('\n');
  const threads = postTexts(fields, url, markdown);

  return `<!doctype html><meta charset="utf-8"><title>${escape(fields.name)}: social preview</title>
<style>
  body { font: 15px/1.4 -apple-system, system-ui, sans-serif; background: #eee; margin: 0; padding: 24px; display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; }
  .phone { width: 390px; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px #0002; }
  .phone h2 { font-size: 13px; margin: 0; padding: 10px 14px; color: #666; border-bottom: 1px solid #eee; }
  .slides { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }
  .slides img { width: 390px; flex: none; scroll-snap-align: start; }
  .text { padding: 10px 14px 16px; white-space: pre-line; }
  details summary { list-style: none; cursor: pointer; } details summary::after { content: '… ще'; color: #888; } details[open] summary::after { content: ''; }
  .threads img { width: 100%; border-radius: 8px; }
  .meta { font-size: 12px; color: #888; padding: 0 14px 12px; }
</style>
<div class="phone"><h2>Instagram · ${slides.length} slides (swipe) · ${[...ig].length}/2200</h2>
  <div class="slides">${slides.map((s) => `<img src="${file(s)}" alt="">`).join('')}</div>
  <div class="text"><b>names_of_ukraine</b> <details><summary>${escape(first)}</summary>${escape(rest.join('\n'))}</details></div>
</div>
<div class="phone threads"><h2>Threads · ${threads.length === 1 ? 'one post' : `post + ${threads.length - 1} replies`}</h2>
  ${threads.map((t, i) => `<div class="text">${escape(t)}<div class="meta">${[...t].length}/500</div></div>${i === 0 ? `<div class="text"><img src="${file(`dist/og/uk/${slug}.jpg`)}" alt=""></div>` : ''}`).join('<hr>')}
</div>`;
}

const inputs = process.argv.slice(2);
if (!inputs.length) throw new Error('Usage: node scripts/preview-social.mjs <profile link or slug> [more…]');
mkdirSync(OUT, { recursive: true });
for (const input of inputs) {
  const profile = pickProfile(input);
  const out = `${OUT}/${profile.slug}.html`;
  writeFileSync(out, page(profile));
  console.log(file(out));
}
