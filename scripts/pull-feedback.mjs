// Prints a Markdown summary of feedback-form submissions (Tally) for the weekly review in MAINTENANCE.md.
// Reads the API key from $TALLY_API_KEY or ~/.tally-key. Prints to the terminal only: submissions contain
// personal data, so never commit the output to this public repository.
//
// Usage: npm run feedback -- [--since YYYY-MM-DD] [--show-email]
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const FORM_ID = 'A7Vpkl'; // https://tally.so/r/A7Vpkl (see src/site.ts)
const SITE = 'https://namesofukraine.pages.dev';
const args = process.argv.slice(2);
const sinceArg = args.includes('--since') ? args[args.indexOf('--since') + 1] : null;
const showEmail = args.includes('--show-email');
const since = sinceArg ? new Date(`${sinceArg}T00:00:00Z`) : new Date(Date.now() - 7 * 864e5);
if (Number.isNaN(since.getTime())) throw new Error('--since must be a date like 2026-10-01');

const key = (process.env.TALLY_API_KEY ?? readFileSync(join(homedir(), '.tally-key'), 'utf8')).trim();
const headers = { Authorization: `Bearer ${key}`, 'User-Agent': 'namesofukraine-maintenance/1.0' };

async function fetchAll() {
  const out = { questions: [], submissions: [] };
  for (let page = 1; ; page++) {
    const res = await fetch(`https://api.tally.so/forms/${FORM_ID}/submissions?page=${page}&limit=100`, { headers });
    if (!res.ok) throw new Error(`Tally API ${res.status}: ${await res.text()}`);
    const data = await res.json();
    if (page === 1) out.questions = data.questions;
    out.submissions.push(...data.submissions);
    if (!data.hasMore) return out;
  }
}

const { questions, submissions } = await fetchAll();
// Question titles by id; hidden fields (lang, type, profile) arrive as their own answers.
const title = new Map();
const options = new Map();
for (const q of questions) {
  if (q.type === 'HIDDEN_FIELDS') for (const f of q.fields ?? []) title.set(f.uuid ?? f.id, f.title ?? f.name);
  else title.set(q.id, (q.title ?? '').split(' / ')[0]);
  for (const f of q.fields ?? []) for (const o of f.options ?? []) options.set(o.id, o.text);
}
const answerText = (a) =>
  Array.isArray(a) ? a.map((x) => options.get(x) ?? (typeof x === 'object' ? JSON.stringify(x) : x)).join(', ') : String(a ?? '');

const recent = submissions.filter((s) => s.isCompleted && new Date(s.submittedAt) >= since);
const groups = new Map();
for (const s of recent) {
  const fields = Object.fromEntries(s.responses.map((r) => [title.get(r.questionId) ?? r.questionId, answerText(r.answer)]));
  const topic = (fields['Про що ваше повідомлення?'] || fields.type || 'Інше').split(' / ')[0];
  if (!groups.has(topic)) groups.set(topic, []);
  groups.get(topic).push({ s, fields });
}

console.log(`# Feedback since ${since.toISOString().slice(0, 10)}: ${recent.length} submission(s) (of ${submissions.length} in total)\n`);
for (const [topic, items] of groups) {
  console.log(`## ${topic} (${items.length})\n`);
  for (const { s, fields } of items) {
    console.log(`### ${s.submittedAt.slice(0, 10)} · submission ${s.id}`);
    if (fields.profile) console.log(`- **Profile:** ${fields.profile} (${SITE}/${fields.lang || 'uk'}/people/${fields.profile}/)`);
    for (const [k, v] of Object.entries(fields)) {
      if (!v || ['lang', 'type', 'profile', 'Про що ваше повідомлення?'].includes(k)) continue;
      const shown = /e-mail/i.test(k) && !showEmail ? '(given; run with --show-email to see it)' : v.replace(/\n+/g, ' ');
      console.log(`- **${k}:** ${shown}`);
    }
    console.log('');
  }
}
if (!recent.length) console.log('Nothing new. ✓');
