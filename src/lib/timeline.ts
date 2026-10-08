// Overlapping lifetimes from frontmatter dates (parsed as UTC midnight, so read in UTC).

interface Life {
  born: Date;
  died?: Date;
}

// Whole years two lifetimes share; the living count up to `now`.
export const yearsInCommon = (a: Life, b: Life, now = new Date()) => {
  const start = Math.max(a.born.getUTCFullYear(), b.born.getUTCFullYear());
  const end = Math.min((a.died ?? now).getUTCFullYear(), (b.died ?? now).getUTCFullYear());
  return Math.max(0, end - start);
};

// People whose lives overlapped with `person`'s the longest (at least one year), longest first.
export const contemporaries = <T extends { slug: string; data: Life }>(person: T, people: T[], exclude: string[] = [], limit = 6, now = new Date()) =>
  people
    .filter((p) => p.slug !== person.slug && !exclude.includes(p.slug))
    .map((p) => ({ person: p, years: yearsInCommon(person.data, p.data, now) }))
    .filter((c) => c.years > 0)
    .sort((a, b) => b.years - a.years)
    .slice(0, limit);
