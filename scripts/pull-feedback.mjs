// Prints a Markdown summary of feedback-form messages for the weekly review in docs/MAINTENANCE.md.
// Reads them from the D1 database (decision D19, db/feedback.sql) through wrangler, with your wrangler
// login (`npx wrangler login`). Prints to the terminal only: messages contain personal data, so never
// commit the output to this public repository.
//
// Usage: npm run feedback -- [--since YYYY-MM-DD] [--show-email]
import { execFileSync } from 'node:child_process';
import uk from '../src/i18n/uk.json' with { type: 'json' };

const DATABASE = 'namesofukraine-feedback';
const SITE = 'https://namesofukraine.com';
const args = process.argv.slice(2);
const sinceArg = args.includes('--since') ? args[args.indexOf('--since') + 1] : null;
const showEmail = args.includes('--show-email');
const since = sinceArg ? new Date(`${sinceArg}T00:00:00Z`) : new Date(Date.now() - 7 * 864e5);
if (Number.isNaN(since.getTime())) throw new Error('--since must be a date like 2026-10-01');

const query = (sql) =>
  JSON.parse(execFileSync('npx', ['--no-install', 'wrangler', 'd1', 'execute', DATABASE, '--remote', '--json', '--command', sql], { encoding: 'utf8' }))[0]
    .results;

// `since` is a parsed date, so the ISO string is safe to put into the query.
const recent = query(`SELECT * FROM feedback WHERE created >= '${since.toISOString()}' ORDER BY created`);
const [{ total }] = query('SELECT COUNT(*) AS total FROM feedback');

const groups = new Map();
for (const row of recent) {
  const topic = uk[`feedback.type.${row.type}`] ?? row.type;
  if (!groups.has(topic)) groups.set(topic, []);
  groups.get(topic).push(row);
}

console.log(`# Feedback since ${since.toISOString().slice(0, 10)}: ${recent.length} message(s) (of ${total} in total)\n`);
for (const [topic, rows] of groups) {
  console.log(`## ${topic} (${rows.length})\n`);
  for (const row of rows) {
    console.log(`### ${row.created.slice(0, 10)} · message ${row.id.slice(0, 8)} · ${row.lang}`);
    if (row.profile) console.log(`- **Profile:** ${row.profile} (${SITE}/${row.lang}/people/${row.profile}/)`);
    if (row.about) console.log(`- **About:** ${row.about}`);
    console.log(`- **Message:** ${row.message.replace(/\n+/g, ' ')}`);
    if (row.sources) console.log(`- **Sources:** ${row.sources.replace(/\n+/g, ' ')}`);
    if (row.email) console.log(`- **Email:** ${showEmail ? row.email : '(given; run with --show-email to see it)'}`);
    console.log('');
  }
}
if (!recent.length) console.log('Nothing new. ✓');
