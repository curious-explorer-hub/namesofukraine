// Upscales and restores profile portraits with a Gemini image model, for review only: no
// colorizing, and nothing is written into the repo. Each output gets a JSON sidecar with the
// source, license and a suggested credit line. Images with no clear free license (fair use,
// unknown, all rights reserved) are not sent to the API; they are listed for manual review.
// Using an output on the site is a manual step: copy it into src/content/people/uk/images/ and
// add "enhanced with AI (Gemini)" to the credit (decision D6).
//
// Setup: GEMINI_API_KEY in the environment or .env (key from https://aistudio.google.com/apikey).
// Optional: GEMINI_IMAGE_MODEL (default below), ENHANCE_OUT (default ~/namesofukraine-enhanced).
// Usage: npm run enhance -- [slug ...] [--force]
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';

const ROOT = new URL('..', import.meta.url).pathname;
const PEOPLE = join(ROOT, 'src/content/people/uk');
const OUT = process.env.ENHANCE_OUT ?? join(homedir(), 'namesofukraine-enhanced');
const MODEL = process.env.GEMINI_IMAGE_MODEL ?? 'gemini-3.1-flash-image';
const ASPECT_RATIOS = ['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'];
const PROMPT =
  'Restore this historical photograph and upscale it to a higher resolution. Sharpen detail and ' +
  'reduce noise, scratches, blur and compression artifacts. Do not colorize: keep the original ' +
  'tones exactly (a black-and-white photo stays black and white). Do not change the face, ' +
  'expression, hair, clothing, pose, framing or background, and do not add or remove anything.';

// Reads the `image:` block of a profile's frontmatter (flat `key: value` lines, indented 2 spaces).
export function readImage(markdown) {
  const block = markdown.match(/^image:\n((?: {2}.*\n)+)/m)?.[1];
  if (!block) return null;
  return Object.fromEntries(
    [...block.matchAll(/^ {2}(\w+): (.*)$/gm)].map(([, key, value]) => [key, value.replace(/^"(.*)"$/, '$1')]),
  );
}

// What a license asks of anyone reusing the image (and of a modified copy, such as an AI output).
export function classifyLicense(license = '') {
  if (/public domain|^PD\b|^PD-|CC0/i.test(license)) return { attribution: false, shareAlike: false, review: false };
  if (/CC[ -]BY-SA|GFDL/i.test(license)) return { attribution: true, shareAlike: true, review: false };
  if (/CC[ -]BY/i.test(license)) return { attribution: true, shareAlike: false, review: false };
  return { attribution: false, shareAlike: false, review: true }; // fair use, unknown, all rights reserved…
}

export function sourceName(url = '') {
  if (/commons\.wikimedia\.org/.test(url)) return 'Wikimedia Commons';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown source';
  }
}

export function sidecar(image, file, date) {
  const rule = classifyLicense(image.license);
  const credit = [image.author, image.license, `via ${sourceName(image.source_url)}`].filter(Boolean).join(', ');
  return {
    original_file: file,
    source_url: image.source_url ?? null,
    author: image.author ?? null,
    license: image.license ?? null,
    attribution_required: rule.attribution,
    // Public-domain images still get a credit line: the site credits every image.
    attribution_text: rule.shareAlike
      ? `${credit}; enhanced with AI (Gemini), shared under the same license`
      : `${credit}; enhanced with AI (Gemini)`,
    share_alike: rule.shareAlike,
    ai_processing: `Upscaled/restored (not colorized) via Gemini API (${MODEL}) on ${date}`,
    manual_review_needed: rule.review,
  };
}

const closestRatio = (width, height) =>
  ASPECT_RATIOS.reduce((best, r) => {
    const [w, h] = r.split(':').map(Number);
    const [bw, bh] = best.split(':').map(Number);
    return Math.abs(Math.log(w / h / (width / height))) < Math.abs(Math.log(bw / bh / (width / height))) ? r : best;
  });

async function enhance(ai, sharp, photo) {
  const { width, height } = await sharp(photo).metadata();
  const request = () =>
    ai.models.generateContent({
      model: MODEL,
      contents: [
        { inlineData: { mimeType: 'image/jpeg', data: readFileSync(photo).toString('base64') } },
        { text: PROMPT },
      ],
      config: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: closestRatio(width, height), imageSize: '2K' } },
    });
  let response;
  try {
    response = await request();
  } catch (error) {
    if (error?.status !== 429) throw error;
    console.warn('  rate limited, waiting 60 s and trying once more…');
    await new Promise((r) => setTimeout(r, 60_000));
    response = await request();
  }
  const data = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData?.data;
  if (!data) throw new Error(`no image in the response (finish reason: ${response.candidates?.[0]?.finishReason ?? 'none'})`);
  return sharp(Buffer.from(data, 'base64')).jpeg({ quality: 90 }).toBuffer();
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const only = args.filter((a) => a !== '--force');

  if (!process.env.GEMINI_API_KEY) {
    console.error('Set GEMINI_API_KEY (in the environment or .env). Get a key at https://aistudio.google.com/apikey');
    process.exit(1);
  }
  const { GoogleGenAI } = await import('@google/genai');
  const { default: sharp } = await import('sharp');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const date = new Date().toISOString().slice(0, 10);

  const slugs = readdirSync(PEOPLE)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3))
    .filter((slug) => !only.length || only.includes(slug));
  const unknown = only.filter((slug) => !slugs.includes(slug));
  if (unknown.length) console.warn(`No profile for: ${unknown.join(', ')}`);
  mkdirSync(OUT, { recursive: true });

  const rows = [];
  for (const slug of slugs) {
    const md = join(PEOPLE, `${slug}.md`);
    const image = readImage(readFileSync(md, 'utf8'));
    if (!image?.src) continue; // no portrait (initials placeholder)
    const photo = resolve(dirname(md), image.src);
    const name = image.src.split('/').pop().replace(/\.\w+$/, '');
    const rule = classifyLicense(image.license);
    const row = { file: name, license: image.license, attribution_required: rule.attribution, manual_review_needed: rule.review };
    rows.push(row);

    if (rule.review) {
      row.result = 'SKIPPED: manual review';
      continue;
    }
    const out = join(OUT, `${name}_enhanced.jpg`);
    if (existsSync(out) && !force) {
      row.result = 'exists (use --force)';
      continue;
    }
    console.log(`${slug}: enhancing…`);
    try {
      writeFileSync(out, await enhance(ai, sharp, photo));
      writeFileSync(join(OUT, `${name}_enhanced.json`), `${JSON.stringify(sidecar(image, relative(ROOT, photo), date), null, 2)}\n`);
      row.result = 'ok';
    } catch (error) {
      row.result = `FAILED: ${error.message.slice(0, 80)}`;
      console.warn(`  ${slug}: ${error.message}`);
    }
  }

  console.table(rows);
  const flagged = rows.filter((r) => r.manual_review_needed);
  if (flagged.length) {
    console.warn(`\n${flagged.length} image(s) need a license check before any reuse; not sent to the API:`);
    for (const r of flagged) console.warn(`  - ${r.file}: ${r.license || '(no license)'}`);
  }
  console.log(`\nOutput: ${OUT}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
