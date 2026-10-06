import { getCollection, type CollectionEntry } from 'astro:content';
import categories from '../content/categories.json';
import eras from '../content/eras.json';
import regions from '../content/regions.json';
import { t, type Lang } from '../i18n';

type Profile = CollectionEntry<'people'>;
type Translation = CollectionEntry<'people_en'>;

// A profile in one language: facts from the Ukrainian file, text from the translation if any.
export interface Person {
  slug: string;
  lang: Lang;
  data: Profile['data'];
  // Entry whose Markdown body is rendered as the long bio.
  body: Profile | Translation;
  // True when the long bio is shown in a different language than the page (translation pending).
  bodyFallback: boolean;
}

const slugOf = (p: Profile) => p.id.split('/').slice(1).join('/');

const localize = (profile: Profile, translation: Translation | undefined, lang: Lang): Person => {
  const slug = slugOf(profile);
  if (lang === 'uk' || !translation) {
    return { slug, lang, data: profile.data, body: profile, bodyFallback: lang !== 'uk' };
  }
  const tr = translation.data;
  const { image, birthplace } = profile.data;
  return {
    slug,
    lang,
    data: {
      ...profile.data,
      name: tr.name,
      role: tr.role,
      summary: tr.summary,
      fun_fact: tr.fun_fact,
      misconception: tr.misconception ?? profile.data.misconception,
      key_accomplishments: tr.key_accomplishments,
      birthplace: { ...birthplace, name: tr.birthplace_name },
      image: image && { ...image, alt: tr.image_alt ?? image.alt },
    },
    body: translation.body?.trim() ? translation : profile,
    bodyFallback: !translation.body?.trim(),
  };
};

// Unreviewed entries are visible in dev (for authoring). In production a profile is published
// only when both language versions are reviewed (decision D3-R).
export const getPeople = async (lang: Lang = 'uk'): Promise<Person[]> => {
  const [profiles, translations] = await Promise.all([getCollection('people'), getCollection('people_en')]);
  const bySlug = new Map(translations.map((tr) => [tr.id, tr]));
  return profiles
    .filter((p) => import.meta.env.DEV || (p.data.reviewed && bySlug.get(slugOf(p))?.data.reviewed))
    .map((p) => localize(p, bySlug.get(slugOf(p)), lang));
};

// Paths: Ukrainian at the root, English under /en.
// Both languages live under their own prefix: /uk/… and /en/… (the site root redirects to /uk/).
// The portrait for uses that copy it off the site (share cards, structured data): fair-use images are left out.
export const freeImage = (p: Person) => (p.data.image?.fair_use ? undefined : p.data.image);

export const localePath = (lang: Lang, path: string) => `/${lang}${path}`;
export const personUrl = (p: Person) => localePath(p.lang, `/people/${p.slug}/`);
export const groupUrl = (id: string, lang: Lang = 'uk') => localePath(lang, `/groups/${id}/`);

const label = (items: { id: string; label: Record<string, string> }[], id: string, lang: Lang) =>
  items.find((i) => i.id === id)?.label[lang] ?? id;

export const groups = categories.groups;
export const groupLabel = (id: string, lang: Lang = 'uk') => label(categories.groups, id, lang);
export const tagLabel = (id: string, lang: Lang = 'uk') => label(categories.tags, id, lang);
export const regionLabel = (id: string, lang: Lang = 'uk') => label(regions, id, lang);
export { eras };
export const eraLabel = (id: string, lang: Lang = 'uk') => label(eras, id, lang);

const collator = (lang: Lang) => new Intl.Collator(lang);
export const byBirth = (a: Person, b: Person) => a.data.born.getTime() - b.data.born.getTime();

// Faces for a set of people (home-page tiles, era bands): those with a portrait whom other profiles
// link to most, a stand-in for prominence. Ties keep the order of `members`.
export const mostLinked = (members: Person[], everyone: Person[], n: number) => {
  const links = new Map<string, number>();
  for (const p of everyone) for (const slug of p.data.related) links.set(slug, (links.get(slug) ?? 0) + 1);
  return members
    .filter((p) => p.data.image)
    .sort((a, b) => (links.get(b.slug) ?? 0) - (links.get(a.slug) ?? 0))
    .slice(0, n);
};

// Everything up to the launch batch counts as the initial catalogue, not "new".
export const LAUNCH_DATE = new Date('2026-09-29');
const NEW_FOR_DAYS = 30;

export const isNew = (p: Person, now = new Date()) =>
  p.data.added > LAUNCH_DATE && now.getTime() - p.data.added.getTime() < NEW_FOR_DAYS * 864e5;

// Only people added after launch; empty until the first post-launch batch.
export const recentlyAdded = (people: Person[], limit = 8) =>
  people
    .filter((p) => p.data.added > LAUNCH_DATE)
    .sort((a, b) => b.data.added.getTime() - a.data.added.getTime() || collator(a.lang).compare(a.data.name, b.data.name))
    .slice(0, limit);

// Text the client-side search matches against (normalized in the browser).
export const searchText = (p: Person) =>
  [p.data.name, p.data.role, p.data.summary, ...p.data.tags.map((tag) => tagLabel(tag, p.lang))].join(' ');

// Frontmatter dates are parsed as UTC midnight; read them in UTC so the year never shifts by timezone.
export const lifespan = (p: Person) => {
  const year = (d: Date, circa: boolean) => (circa ? t('person.circa', p.lang, { year: d.getUTCFullYear() }) : d.getUTCFullYear());
  const born = year(p.data.born, p.data.born_circa);
  if (!p.data.died) return t('person.born_year', p.lang, { year: born }); // living: "нар. 1930" / "b. 1930"
  return `${born}–${year(p.data.died, p.data.died_circa)}`;
};

// "9 березня 1814 р." / "9 March 1814", or "бл. 1582" / "c. 1582" when only the year is approximate.
export const fullDate = (date: Date, circa = false, lang: Lang = 'uk') =>
  circa
    ? t('person.circa', lang, { year: date.getUTCFullYear() })
    : date.toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      });

// Publication batches, newest first: one entry per `added` date.
export const additionBatches = (people: Person[]) => {
  const byDate = new Map<number, Person[]>();
  for (const p of people) {
    const key = p.data.added.getTime();
    byDate.set(key, [...(byDate.get(key) ?? []), p]);
  }
  return [...byDate.entries()]
    .sort(([a], [b]) => b - a)
    .map(([time, batch]) => ({
      date: new Date(time),
      atLaunch: time <= LAUNCH_DATE.getTime(),
      people: batch.sort((a, b) => collator(a.lang).compare(a.data.name, b.data.name)),
    }));
};
