import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { fullDate } from './people';
import { t, type Lang } from '../i18n';

interface Photo { src: ImageMetadata; alt: string; caption: string; section: number }
interface Video { youtube: string; title: string; source: string; date: Date; duration: string; section: number }

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Story photos and videos (profiles and events): each one closes the `section`-th `##` section of the
// rendered story, under the text it illustrates; photos first, then videos.
export const withMedia = async (html: string, gallery: Photo[], videos: Video[], lang: Lang) => {
  const sections = html.split(/(?=<h2)/);
  const offset = sections[0].startsWith('<h2') ? 1 : 0;
  for (const g of gallery) {
    const img = await getImage({ src: g.src, widths: [480, 720, 1080], format: 'webp' });
    const i = Math.min(g.section - offset, sections.length - 1);
    // Shown at its own pixel width, but no taller than 640px; CSS keeps it within half to all of the column.
    const width = Math.round(Math.min(g.src.width, (g.src.width * 640) / g.src.height));
    const height = Math.round((width * g.src.height) / g.src.width);
    sections[i] += `<figure class="story-photo"><img src="${img.src}" srcset="${img.srcSet.attribute}" sizes="(min-width: 48rem) 42rem, 100vw" width="${width}" height="${height}" alt="${escape(g.alt)}" loading="lazy" decoding="async"><figcaption>${escape(g.caption)}</figcaption></figure>`;
  }
  // Without JS the card is a plain link to YouTube; with JS it becomes a player in place, but only after
  // the reader presses play (src/scripts/video.ts, D18).
  for (const v of videos) {
    const i = Math.min(v.section - offset, sections.length - 1);
    const meta = [v.source, fullDate(v.date, false, lang), v.duration].join(' · ');
    sections[i] += `<figure class="story-video"><a class="story-video-play" href="https://www.youtube.com/watch?v=${v.youtube}" data-youtube="${v.youtube}" data-title="${escape(v.title)}" aria-label="${escape(t('video.play', lang, { title: v.title }))}"><span class="story-video-icon" aria-hidden="true"></span><span class="story-video-note">${t('video.note', lang)}</span></a><figcaption><span class="story-video-title">${escape(v.title)}</span><span class="story-video-meta">${escape(meta)}</span></figcaption></figure>`;
  }
  return sections.join('');
};
