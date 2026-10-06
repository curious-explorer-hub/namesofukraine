// Share-preview cards (1200×630 JPEG), rendered at build time with Satori + resvg.
// Uses the same visual language as the site: Fixel type, cobalt-tinted portrait, wheat accent.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { freeImage, lifespan, type Person } from './people';
import { t, type Lang } from '../i18n';

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

// Share images only (the site shows portraits in full colour): grayscale screened over cobalt, cropped towards the face.
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

const render = async (tree: Node) => {
  const svg = await satori(tree as never, { width: W, height: H, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
  // JPEG keeps photo-heavy cards small for link previews.
  return sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
};

export async function personCard(p: Person) {
  const img = freeImage(p) ? await tintedPortrait(p.slug, 480, H) : null;
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
