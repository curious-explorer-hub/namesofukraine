import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath } from './people';
import type { Lang } from '../i18n';

type EventEntry = CollectionEntry<'events'>;
type EventTranslation = CollectionEntry<'events_en'>;

// An event page in one language: facts from the Ukrainian file, text from the translation.
export interface HistoricEvent {
  slug: string;
  lang: Lang;
  data: EventEntry['data'];
  body: EventEntry | EventTranslation;
}

const slugOf = (e: EventEntry) => e.id.split('/').slice(1).join('/');

const localize = (entry: EventEntry, translation: EventTranslation | undefined, lang: Lang): HistoricEvent => {
  const slug = slugOf(entry);
  if (lang === 'uk' || !translation) return { slug, lang, data: entry.data, body: entry };
  const tr = translation.data;
  const { image, place, timeline, gallery, videos } = entry.data;
  return {
    slug,
    lang,
    data: {
      ...entry.data,
      name: tr.name,
      summary: tr.summary,
      place: { ...place, name: tr.place_name },
      image: image && { ...image, alt: tr.image_alt ?? image.alt },
      timeline: timeline.map((step, i) => ({ ...step, ...tr.timeline[i] })),
      gallery: gallery.map((g, i) => ({ ...g, ...tr.gallery[i] })),
      videos: videos.map((v, i) => ({ ...v, ...tr.videos[i] })),
    },
    body: translation,
  };
};

// As for profiles: drafts only in dev; in production an event is published once approved, with both language files.
export const getEvents = async (lang: Lang = 'uk'): Promise<HistoricEvent[]> => {
  const [entries, translations] = await Promise.all([getCollection('events'), getCollection('events_en')]);
  const bySlug = new Map(translations.map((tr) => [tr.id, tr]));
  return entries
    .filter((e) => import.meta.env.DEV || (e.data.status === 'approved' && bySlug.has(slugOf(e))))
    .map((e) => localize(e, bySlug.get(slugOf(e)), lang))
    .sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
};

// Events that list this person, oldest first.
export const eventsOf = (events: HistoricEvent[], slug: string) => events.filter((e) => e.data.people.includes(slug));

export const eventUrl = (e: HistoricEvent) => localePath(e.lang, `/events/${e.slug}/`);
