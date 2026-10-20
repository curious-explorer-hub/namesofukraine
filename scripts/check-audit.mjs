// Fails when `npm audit` reports an advisory that isn't on the reviewed allowlist below.
// Each allowlisted advisory must say why it can't affect this static site; recheck on every update.
import { execFileSync } from 'node:child_process';

const allowed = {
  // Via @lhci/cli (Lighthouse budget, CI only). It audits our own dist/ on localhost: no FTP, proxy,
  // downloaded archives or formats from outside input.
  'GHSA-c475-qrg2-pj4r': 'basic-ftp: CI only, no FTP',
  'GHSA-jmr9-qjv8-65gv': 'extract-zip: CI only, no untrusted archives',
  'GHSA-7pqw-9j4j-h8q3': 'extract-zip: CI only, no untrusted archives',
  'GHSA-hp3w-g68c-fv3c': 'sprintf-js: CI only, no outside format input',
  'GHSA-w5hq-g745-h8pq': 'uuid: CI only, no caller-supplied buffers',
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
