// Checks that the tokens the workflows use still work and aren't about to expire, so a failing post or deploy
// isn't the first sign. Run weekly by .github/workflows/check-tokens.yml, which emails the report when
// something needs attention. Prints only names, states and dates, never a token: run logs are public.
//
// Usage: node scripts/check-tokens.mjs (tokens from the environment; one that isn't set is reported)
import { pathToFileURL } from 'node:url';

export const WARN_DAYS = 10;
// Instagram has no endpoint that tells a token's expiry, so the date is kept here: update it on every refresh
// (docs/MAINTENANCE.md). The other expiry dates are read from the APIs.
export const INSTAGRAM_EXPIRES = '2026-12-09';

/** 'ok', 'soon' (within WARN_DAYS) or 'expired' for an expiry date; 'ok' when there is none. */
export function verdict(expires, now = new Date()) {
  if (!expires) return 'ok';
  const days = (new Date(expires).getTime() - now.getTime()) / 864e5;
  return days <= 0 ? 'expired' : days <= WARN_DAYS ? 'soon' : 'ok';
}

const getJson = async (url, headers = {}) => {
  const res = await fetch(url, { headers });
  return { ok: res.ok, body: await res.json().catch(() => ({})) };
};

async function threads(token) {
  const { body } = await getJson(`https://graph.threads.net/v1.0/debug_token?input_token=${token}&access_token=${token}`);
  if (!body.data?.is_valid) return { valid: false };
  return { valid: true, expires: body.data.expires_at ? new Date(body.data.expires_at * 1000).toISOString() : undefined };
}

async function instagram(token) {
  const { ok } = await getJson(`https://graph.instagram.com/me?fields=user_id&access_token=${token}`);
  return { valid: ok, expires: INSTAGRAM_EXPIRES };
}

// User tokens and account-owned tokens are verified at different addresses.
async function cloudflare(token) {
  const headers = { Authorization: `Bearer ${token}` };
  for (const url of ['https://api.cloudflare.com/client/v4/user/tokens/verify', `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/tokens/verify`]) {
    const { body } = await getJson(url, headers);
    if (body.success && body.result?.status === 'active') return { valid: true, expires: body.result.expires_on ?? undefined };
  }
  return { valid: false };
}

const CHECKS = [
  ['THREADS_ACCESS_TOKEN', threads, 'refresh it: docs/MAINTENANCE.md, "refresh the Threads token"'],
  ['INSTAGRAM_ACCESS_TOKEN', instagram, 'refresh it: docs/MAINTENANCE.md, "refresh the Instagram token"'],
  ['CLOUDFLARE_API_TOKEN', cloudflare, 'deploys: roll it in Cloudflare (My Profile → API Tokens) and update the secret'],
  ['CLOUDFLARE_ANALYTICS_TOKEN', cloudflare, 'Stats page readers: roll it in Cloudflare and update the secret'],
  ['CLOUDFLARE_D1_TOKEN', cloudflare, 'feedback digest: roll it in Cloudflare and update the secret'],
];

/** A Markdown table row; with `expires`, the date and the whole days left. A token that doesn't work has no known expiry. */
export function row(name, state, expires, action, now = new Date()) {
  const date = expires ? expires.slice(0, 10) : state === 'ok' ? 'no expiry' : '-';
  const days = expires ? String(Math.floor((new Date(expires).getTime() - now.getTime()) / 864e5)) : '-';
  return `| ${name} | ${state === 'ok' ? '✅ ok' : `⚠️ ${state}`} | ${date} | ${days} | ${state === 'ok' ? '' : action} |`;
}

async function main() {
  const rows = [];
  let attention = 0;
  for (const [name, check, fix] of CHECKS) {
    const token = process.env[name];
    let state;
    let expires;
    if (!token) state = 'not set';
    else {
      try {
        const result = await check(token);
        expires = result.expires;
        state = result.valid ? verdict(expires) : 'invalid';
      } catch (error) {
        state = `check failed (${error instanceof Error ? error.message : error})`;
      }
    }
    if (state !== 'ok') attention++;
    rows.push(row(name, state, expires, state === 'not set' ? 'add the repository secret' : fix));
  }
  console.log(attention ? `**${attention} token(s) need attention.**\n` : '**All tokens OK.**\n');
  console.log(['| Secret | Status | Expires | Days left | What to do |', '|---|---|---|---|---|', ...rows].join('\n'));
  if (attention) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
