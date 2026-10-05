// Turns opted-in portraits (`animate: true` in src/content/people/uk/<slug>.md) into a 4.5 s
// "acknowledge" clip: the person turns to face the viewer, nods once, and turns back to the
// original pose. Only the head moves; the face is untouched. Rendered locally and for free with
// LivePortrait (scripts/head-motion.py). Output: public/portraits/<slug>.mp4; the profile page
// falls back to the photo. Spec and checklist: docs/prompts/revitalize-portraits.md.
//
// Setup: a LivePortrait checkout with a .venv at LIVEPORTRAIT_DIR (default ~/environment/git/LivePortrait).
// Usage: npm run revitalize -- [slug ...] [--force]
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { tmpdir, homedir } from 'node:os';

const ROOT = new URL('..', import.meta.url).pathname;
const PEOPLE = join(ROOT, 'src/content/people/uk');
const OUT = join(ROOT, 'public/portraits');
const LP_DIR = process.env.LIVEPORTRAIT_DIR ?? join(homedir(), 'environment/git/LivePortrait');
const PYTHON = join(LP_DIR, '.venv/bin/python');

const args = process.argv.slice(2);
const force = args.includes('--force') && Boolean(args.splice(args.indexOf('--force'), 1));
// Owner-approved motion (variant D, 2026-09-30): turn up to 18° toward the viewer, 7° nod.
const MOTION = ['--acknowledge', '--turn', '18', '--nod', '7', '--seconds', '4.5'];
const only = args;

if (!existsSync(PYTHON)) {
  console.error(`No LivePortrait install at ${LP_DIR} (expected .venv/bin/python). Set LIVEPORTRAIT_DIR.`);
  process.exit(1);
}

const slugs = readdirSync(PEOPLE)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.slice(0, -3))
  .filter((slug) => (only.length ? only.includes(slug) : /^animate: true$/m.test(readFileSync(join(PEOPLE, `${slug}.md`), 'utf8'))));

if (!slugs.length) {
  console.log('No profiles to process: set `animate: true` in a profile, or pass slugs.');
  process.exit(0);
}
mkdirSync(OUT, { recursive: true });

for (const slug of slugs) {
  const photo = join(PEOPLE, 'images', `${slug}.jpg`);
  const out = join(OUT, `${slug}.mp4`);
  if (!existsSync(photo)) {
    console.warn(`${slug}: no portrait at ${photo}, skipped`);
    continue;
  }
  if (existsSync(out) && !force) {
    console.log(`${slug}: ${out} exists, skipped (use --force to redo)`);
    continue;
  }
  console.log(`${slug}: rendering (about a minute on Apple Silicon)…`);
  const raw = join(tmpdir(), `${slug}-raw.mp4`);
  execFileSync(PYTHON, [join(ROOT, 'scripts/head-motion.py'), photo, raw, ...MOTION], {
    cwd: LP_DIR,
    stdio: 'inherit',
    env: { ...process.env, PYTORCH_ENABLE_MPS_FALLBACK: '1' },
  });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-an', '-vf', 'scale=720:-2,format=yuv420p',
    '-c:v', 'libx264', '-crf', '24', '-movflags', '+faststart', out]);
  rmSync(raw, { force: true });
  console.log(`${slug}: saved ${out}`);
}
