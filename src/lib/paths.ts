import { getPeople } from './people';
import type { Lang } from '../i18n';

// Static paths shared by the Ukrainian and English route files.
export const personPaths = async (lang: Lang) => {
  const people = await getPeople(lang);
  return people.map((person) => ({ params: { slug: person.slug }, props: { person, people } }));
};

