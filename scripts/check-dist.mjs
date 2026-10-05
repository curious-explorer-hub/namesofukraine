// Fails if the deploy folder contains anything that must never be public: repository metadata,
// dependencies, source, or secrets. Only dist/ is deployed (never the repo root).
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? 'dist';
const forbidden = [/^\.git$/, /^node_modules$/, /^\.env/, /^src$/, /^package(-lock)?\.json$/, /^\.astro$/, /\.(pem|key)$/, /^\.npmrc$/];

const hits = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (forbidden.some((re) => re.test(entry.name))) hits.push(relative(root, path));
    else if (entry.isDirectory()) walk(path);
  }
};
walk(root);

if (hits.length) {
  console.error(`Must not be deployed:\n${hits.map((h) => `  ${h}`).join('\n')}`);
  process.exit(1);
}
console.log(`${root}/: no repository files or secrets.`);
