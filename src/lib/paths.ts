import { getPeople } from './people';
import { getEvents } from './events';
import type { Lang } from '../i18n';

// Static paths shared by the Ukrainian and English route files.
export const personPaths = async (lang: Lang) => {
  const people = await getPeople(lang);
  return people.map((person) => ({ params: { slug: person.slug }, props: { person, people } }));
};

export const eventPaths = async (lang: Lang) => {
  const [events, people] = await Promise.all([getEvents(lang), getPeople(lang)]);
  return events.map((event) => ({ params: { slug: event.slug }, props: { event, people } }));
};
