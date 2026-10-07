// Approves draft profiles after the owner's review: `npm run approve <slug> [<slug> …]`.
// Sets `status: approved` and stamps `published` with the current time in the Ukrainian file. Profiles
// approved together get consecutive seconds, in the order given, so "new additions" keeps that order.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error('Usage: npm run approve <slug> [<slug> …]');
  process.exit(1);
}

const start = Date.now();
let failed = false;
slugs.forEach((slug, i) => {
  const file = `src/content/people/uk/${slug}.md`;
  if (!existsSync(file) || !existsSync(`src/content/people/en/${slug}.md`)) {
    console.error(`${slug}: missing ${file} or its English file`);
    failed = true;
    return;
  }
  const text = readFileSync(file, 'utf8');
  if (!/^status: draft$/m.test(text)) {
    console.error(`${slug}: not a draft (no "status: draft" line)`);
    failed = true;
    return;
  }
  const published = new Date(start + i * 1000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  writeFileSync(file, text.replace(/^status: draft$/m, `status: approved\npublished: ${published}`));
  console.log(`${slug}: approved, published ${published}`);
});
process.exit(failed ? 1 : 0);
