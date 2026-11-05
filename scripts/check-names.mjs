// Which of these people the site already knows: a profile (live or draft), a row in docs/CANDIDATES.md, or neither.
// Used by the scout-people skill to dedupe names found in outside sources. Names come as arguments or one per line on stdin.
// Usage: node scripts/check-names.mjs "Андрій Мельник" "Майк Йогансен"   or   node scripts/check-names.mjs < names.txt
import { readFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const PEOPLE = 'src/content/people/uk';

export const words = (name) =>
  name
    .replace(/\(.*?\)|«.*?»/g, ' ')
    .replace(/[ʼ’`]/g, "'")
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((w) => /\p{L}/u.test(w));

// Same first name (first 3 letters) and surname (all but the last 2 letters, so case endings still match).
export function sameName(a, b) {
  const [x, y] = [words(a), words(b)];
  if (x.length < 2 || y.length < 2) return x.join(' ') === y.join(' ');
  const [sx, sy] = [x.at(-1), y.at(-1)];
  const stem = (s) => s.slice(0, Math.max(3, s.length - 2));
  return x[0].slice(0, 3) === y[0].slice(0, 3) && (sx.startsWith(stem(sy)) || sy.startsWith(stem(sx)));
}

// An aliases.json stem phrase: every word is the start of a word in the name, in order.
export function matchesAlias(name, alias) {
  const w = words(name);
  let i = 0;
  for (const stem of words(alias)) {
    while (i < w.length && !w[i].startsWith(stem)) i++;
    if (i++ >= w.length) return false;
  }
  return true;
}

export function loadKnown() {
  const aliases = JSON.parse(readFileSync('src/content/aliases.json', 'utf8'));
  const profiles = readdirSync(PEOPLE)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const text = readFileSync(`${PEOPLE}/${f}`, 'utf8');
      const slug = f.slice(0, -3);
      return {
        slug,
        name: text.match(/^name: "?(.+?)"?$/m)?.[1] ?? slug,
        status: text.match(/^status: (\w+)/m)?.[1] ?? 'live',
        // A one-word stem (a surname alone) is too loose for a full name: «Палі» would match Палій-Сидорянський.
        aliases: (aliases[slug]?.uk ?? []).filter((a) => words(a).length > 1),
      };
    });
  const candidates = [];
  let section = '';
  for (const line of readFileSync('docs/CANDIDATES.md', 'utf8').split('\n')) {
    if (line.startsWith('## ')) section = line.slice(3);
    const cell = line.match(/^\| ([^|]+?) \|/)?.[1];
    if (cell && cell !== 'Person' && !cell.startsWith('---'))
      for (const name of cell.split(/, | і /)) candidates.push({ name, row: cell, section });
  }
  return { profiles, candidates };
}

export function lookup(name, { profiles, candidates }) {
  const p = profiles.find((p) => sameName(name, p.name) || p.aliases.some((a) => matchesAlias(name, a)));
  if (p) return `profile ${p.slug}${p.status === 'live' ? '' : ` (${p.status})`}`;
  const c = candidates.find((c) => sameName(name, c.name));
  if (c) return `CANDIDATES.md, ${c.section}: ${c.row}`;
  return 'new';
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const names = process.argv.length > 2 ? process.argv.slice(2) : readFileSync(0, 'utf8').split('\n');
  const known = loadKnown();
  for (const name of names.map((n) => n.trim()).filter(Boolean)) console.log(`${name}\t${lookup(name, known)}`);
}
