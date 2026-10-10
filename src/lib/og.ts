// Share-preview cards (1200×630 JPEG) and Instagram cards (1080×1350), rendered at build time with Satori + resvg.
// Uses the same visual language as the site: Fixel type, cobalt-tinted portrait, wheat accent.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { freeImage, lifespan, type Person } from './people';
import { t, type Lang } from '../i18n';
import { closingSection } from './story.mjs';

const W = 1200;
const H = 630;
const C = { paper: '#f6f8fb', ink: '#15223b', cobalt: '#1f4ba5', wheat: '#e2b13c', slate: '#566077' };

const root = process.cwd();
const font = (file: string) => readFileSync(join(root, 'src/assets/fonts', file));
const fonts = [
  { name: 'Fixel Display', data: font('FixelDisplay-Bold.ttf'), weight: 700 as const, style: 'normal' as const },
  { name: 'Fixel Text', data: font('FixelText-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Fixel Text', data: font('FixelText-Medium.ttf'), weight: 500 as const, style: 'normal' as const },
];

// Minimal element helper for Satori's object syntax.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

const stitch = (color: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="${color}" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`,
  ).toString('base64')}`;
const stitchRow = (n: number, size = 22) =>
  h('div', { display: 'flex', gap: 6 }, Array.from({ length: n }, (_, i) => h('img', { width: size, height: size }, undefined, { src: stitch(i === 0 ? C.wheat : C.cobalt), width: size, height: size })));

// Portraits on the person cards, in full colour as on the profile page, cropped towards the face.
const portrait = async (slug: string, width: number, height: number) => {
  const out = await sharp(join(root, 'src/content/people/uk/images', `${slug}.jpg`))
    .resize(width, height, { fit: 'cover', position: 'north' })
    .jpeg({ quality: 88 })
    .toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
};

// The site card's row of faces: grayscale screened over cobalt, so mixed photos read as one set.
const tintedPortrait = async (slug: string, width: number, height: number) => {
  const gray = await sharp(join(root, 'src/content/people/uk/images', `${slug}.jpg`))
    .resize(width, height, { fit: 'cover', position: 'north' })
    .grayscale()
    .linear(1.1, -12)
    .toBuffer();
  const out = await sharp({ create: { width, height, channels: 3, background: C.cobalt } })
    .composite([{ input: gray, blend: 'screen' }])
    .jpeg({ quality: 88 })
    .toBuffer();
  return `data:image/jpeg;base64,${out.toString('base64')}`;
};

const render = async (tree: Node, width = W, height = H) => {
  const svg = await satori(tree as never, { width, height, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
  // JPEG keeps photo-heavy cards small for link previews.
  return sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
};

export async function personCard(p: Person) {
  const img = freeImage(p) ? await portrait(p.slug, 480, H) : null;
  const long = p.data.name.length > 20;
  return render(
    h('div', { display: 'flex', width: W, height: H, background: C.paper, fontFamily: 'Fixel Text', color: C.ink }, [
      img ? h('img', { width: 480, height: H, objectFit: 'cover' }, undefined, { src: img, width: 480, height: H }) : null,
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 64px', borderLeft: `10px solid ${C.wheat}` }, [
        h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: 30, color: C.ink }, t('site.title', p.lang)),
        h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }, [
          h('div', { fontSize: 30, color: C.slate, marginBottom: 12 }, lifespan(p)),
          h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: long ? 64 : 80, lineHeight: 1.02, letterSpacing: -2 }, p.data.name),
          h('div', { fontWeight: 500, fontSize: 36, color: C.cobalt, marginTop: 20, lineHeight: 1.2 }, p.data.role),
        ]),
        stitchRow(9),
      ]),
    ]),
  );
}

// Instagram's tallest feed format (4:5): portrait on top, a short strip with name and role below; text only when the
// portrait isn't free to share. Years and the site name are left to the caption, so the portrait gets the space.
const IG_W = 1080;
const IG_H = 1350;
const IG_PHOTO = 1150;

export async function instagramCard(p: Person) {
  const img = freeImage(p) ? await portrait(p.slug, IG_W, IG_PHOTO) : null;
  const long = p.data.name.length > 20;
  return render(
    h('div', { display: 'flex', flexDirection: 'column', width: IG_W, height: IG_H, background: C.paper, fontFamily: 'Fixel Text', color: C.ink }, [
      img ? h('img', { width: IG_W, height: IG_PHOTO, objectFit: 'cover' }, undefined, { src: img, width: IG_W, height: IG_PHOTO }) : null,
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', padding: '20px 72px 24px', borderTop: `12px solid ${C.wheat}` }, [
        h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: img ? (long ? 58 : 72) : long ? 92 : 112, lineHeight: 1.02, letterSpacing: -2 }, p.data.name),
        h('div', { fontWeight: 500, fontSize: img ? 36 : 48, color: C.cobalt, marginTop: 12, lineHeight: 1.2 }, p.data.role),
      ]),
    ]),
    IG_W,
    IG_H,
  );
}

// The carousel's text slides after the portrait card (/og/instagram/<slug>/<n>.jpg, n from 2): the summary, the first
// three key accomplishments, the story's closing section on why the person matters, and the quote (or else the fun
// fact), so the post reads in full inside the app.
export type Slide = { label: string; text?: string; items?: string[]; note?: string };

export function instagramSlides(p: Person): Slide[] {
  const quote = p.data.quotes[0];
  const why = closingSection(p.body.body ?? '');
  return [
    { label: 'Коротко', text: p.data.summary },
    { label: 'Головне', items: p.data.key_accomplishments.slice(0, 3) },
    ...(why ? [{ label: why.heading, text: why.text }] : []),
    quote ? { label: 'Цитата', text: `«${quote.text.replace(/ \/ /g, '\n')}»`, note: quote.source } : { label: 'Чи знали ви?', text: p.data.fun_fact },
  ];
}

export async function instagramSlide(p: Person, slide: Slide, n: number, total: number) {
  const size = (chars: number) => (chars > 560 ? 36 : chars > 400 ? 40 : slide.text?.includes('\n') || chars > 220 ? 46 : chars > 140 ? 54 : 62);
  const length = slide.text?.length ?? slide.items?.join('').length ?? 0;
  return render(
    h('div', { display: 'flex', flexDirection: 'column', width: IG_W, height: IG_H, background: C.paper, fontFamily: 'Fixel Text', color: C.ink, borderTop: `16px solid ${C.wheat}`, padding: '72px 80px 64px' }, [
      h('div', { display: 'flex', justifyContent: 'space-between', fontSize: 30, color: C.slate }, [h('div', {}, t('site.title', 'uk')), h('div', {}, `${n}/${total}`)]),
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }, [
        h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: 44, color: C.cobalt, marginBottom: 36 }, slide.label),
        slide.text ? h('div', { fontSize: size(length), lineHeight: 1.3, whiteSpace: 'pre-line' }, slide.text) : null,
        slide.items
          ? h('div', { display: 'flex', flexDirection: 'column', gap: 34 }, slide.items.map((item) =>
              h('div', { display: 'flex', gap: 24, fontSize: length > 360 ? 38 : 44, lineHeight: 1.3 }, [h('img', { width: 26, height: 26, marginTop: 16, flexShrink: 0 }, undefined, { src: stitch(C.wheat), width: 26, height: 26 }), h('div', { flex: 1 }, item)])))
          : null,
        slide.note ? h('div', { fontSize: 32, color: C.slate, marginTop: 32 }, `- ${slide.note}`) : null,
      ]),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [h('div', { fontWeight: 500, fontSize: 32 }, p.data.name), stitchRow(5)]),
    ]),
    IG_W,
    IG_H,
  );
}

export async function siteCard(lang: Lang, people: Person[]) {
  const faces = await Promise.all(
    people.filter((p) => freeImage(p)).slice(0, 6).map((p) => tintedPortrait(p.slug, 180, 180)),
  );
  return render(
    h('div', { display: 'flex', flexDirection: 'column', width: W, height: H, background: C.paper, padding: '64px 72px', fontFamily: 'Fixel Text', color: C.ink, borderBottom: `12px solid ${C.wheat}` }, [
      h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: 30 }, t('site.title', lang)),
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }, [
        h('div', { fontFamily: 'Fixel Display', fontWeight: 700, fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }, t('home.title', lang)),
      ]),
      h('div', { display: 'flex', gap: 14, alignItems: 'center' }, [
        ...faces.map((src) => h('img', { width: 120, height: 120, borderRadius: 60 }, undefined, { src, width: 120, height: 120 })),
        h('div', { display: 'flex', marginLeft: 18 }, [stitchRow(6, 26)]),
      ]),
    ]),
  );
}
