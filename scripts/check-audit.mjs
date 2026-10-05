// Fails when `npm audit` reports an advisory that isn't on the reviewed allowlist below.
// Each allowlisted advisory must say why it can't affect this static site; recheck on every update.
import { execFileSync } from 'node:child_process';

const allowed = {
  // Via astro. About shared HTTP caches serving one user's response to another; the site is static
  // files with no server or cache of ours.
  'GHSA-ch52-4w7c-c8xp': 'http-cache-semantics: no server-side cache in a static site',
  // Via satori (share cards). Malformed ZIP64 input; satori runs only at build time on our own files.
  'GHSA-px8p-9vwx-vf98': 'fflate: build-time only, trusted input',
};

let report;
try {
  report = execFileSync('npm', ['audit', '--json'], { encoding: 'utf8' });
} catch (error) {
  report = error.stdout; // npm audit exits non-zero whenever it finds anything
}

const found = new Map();
for (const vuln of Object.values(JSON.parse(report).vulnerabilities ?? {})) {
  for (const via of vuln.via) {
    if (typeof via === 'object') found.set(via.url.split('/').pop(), `${via.name} (${via.severity}): ${via.title}`);
  }
}

const unknown = [...found].filter(([id]) => !(id in allowed));
for (const [id, text] of found) console.log(`${id in allowed ? 'allowed' : 'NEW    '} ${id} ${text}`);
if (unknown.length) {
  console.error(`\n${unknown.length} advisory(ies) not reviewed. Update the dependency, or add it to scripts/check-audit.mjs with a reason.`);
  process.exit(1);
}
