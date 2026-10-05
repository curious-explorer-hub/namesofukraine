import { getPeople, groups, byBirth } from './people';
import type { Lang } from '../i18n';

// Static paths shared by the Ukrainian and English route files.
export const personPaths = async (lang: Lang) => {
  const people = await getPeople(lang);
  return people.map((person) => ({ params: { slug: person.slug }, props: { person, people } }));
};

export const groupPaths = async (lang: Lang) => {
  const people = (await getPeople(lang)).sort(byBirth);
  return groups
    .map((group) => ({ group, members: people.filter((p) => p.data.group === group.id) }))
    .filter(({ members }) => members.length > 0)
    .map(({ group, members }) => ({ params: { group: group.id }, props: { label: group.label[lang], members } }));
};
