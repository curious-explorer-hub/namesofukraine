// Overlapping lifetimes from frontmatter dates (parsed as UTC midnight, so read in UTC).

interface Life {
  born: Date;
  died?: Date;
}

interface Field {
  group: string;
  tags: string[];
}

// Whole years two lifetimes share; the living count up to `now`.
export const yearsInCommon = (a: Life, b: Life, now = new Date()) => {
  const start = Math.max(a.born.getUTCFullYear(), b.born.getUTCFullYear());
  const end = Math.min((a.died ?? now).getUTCFullYear(), (b.died ?? now).getUTCFullYear());
  return Math.max(0, end - start);
};

// People whose lives overlapped with `person`'s (at least one year): those in the same field (group or
// a shared tag) first, then everyone else, each longest overlap first.
export const contemporaries = <T extends { slug: string; data: Life & Field }>(person: T, people: T[], exclude: string[] = [], limit = 5, now = new Date()) => {
  const sameField = (p: T) => p.data.group === person.data.group || p.data.tags.some((tag) => person.data.tags.includes(tag));
  return people
    .filter((p) => p.slug !== person.slug && !exclude.includes(p.slug))
    .map((p) => ({ person: p, years: yearsInCommon(person.data, p.data, now), field: sameField(p) }))
    .filter((c) => c.years > 0)
    .sort((a, b) => Number(b.field) - Number(a.field) || b.years - a.years)
    .slice(0, limit);
};
