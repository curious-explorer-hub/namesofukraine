// Fetches readers' numbers for the Stats page (D20) from Cloudflare Web Analytics and writes
// src/data/readers.json (not in git), which the build reads. Runs in CI before the build, and locally
// to preview the page with real numbers. Needs CLOUDFLARE_ANALYTICS_TOKEN (a token with only
// "Account Analytics: Read") and CLOUDFLARE_ACCOUNT_ID; without them it does nothing. It never fails
// the build: on any error it leaves the last file (or none) and the page shows the catalogue only.
//
// Usage: CLOUDFLARE_ANALYTICS_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… npm run readers
import { mkdirSync, writeFileSync } from 'node:fs';
import { countryShares, daily, profileTotals, ranking, trending } from '../src/lib/readers.mjs';

const OUT = 'src/data/readers.json';
const HOST = 'namesofukraine.com';
const token = process.env.CLOUDFLARE_ANALYTICS_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;

const query = (dimension) => `query Readers($account: String!, $host: String!, $start: Time!, $end: Time!, $path: String!) {
  viewer { accounts(filter: { accountTag: $account }) {
    rumPageloadEventsAdaptiveGroups(limit: 5000, orderBy: [count_DESC], filter: {
      requestHost: $host, datetime_geq: $start, datetime_lt: $end, requestPath_like: $path
    }) { count sum { visits } dimensions { ${dimension} } }
  } }
}`;

async function rows(dimension, start, end, path = '/%') {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query(dimension), variables: { account, host: HOST, start: start.toISOString(), end: end.toISOString(), path } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));
  const groups = json.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups;
  if (!Array.isArray(groups)) throw new Error('no rumPageloadEventsAdaptiveGroups in the response');
  return groups.map((g) => ({ value: g.dimensions?.[dimension], count: g.count ?? 0, visits: g.sum?.visits ?? 0 }));
}

if (!token || !account) {
  console.log('readers: no CLOUDFLARE_ANALYTICS_TOKEN / CLOUDFLARE_ACCOUNT_ID; skipped.');
  process.exit(0);
}

try {
  // Whole UTC days, ending with yesterday (today is still incomplete).
  const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  const ago = (days) => new Date(today.getTime() - days * 864e5);
  const dates = Array.from({ length: 30 }, (_, i) => ago(30 - i).toISOString().slice(0, 10));
  const paths = async (from, to) =>
    profileTotals((await rows('requestPath', ago(from), ago(to), '%/people/%')).map((r) => ({ path: r.value, count: r.count })));

  const perDay = async (path) => (await rows('date', ago(60), today, path)).map((r) => ({ date: r.value, visits: r.visits }));
  const [uk, en] = [await perDay('/uk/%'), await perDay('/en/%')];
  const days = daily(dates, uk, en);
  const before = daily(Array.from({ length: 30 }, (_, i) => ago(60 - i).toISOString().slice(0, 10)), uk, en);
  const sum = (list) => list.reduce((s, d) => s + d.uk + d.en, 0);

  const [month, monthBefore, week, weekBefore] = [await paths(30, 0), await paths(60, 30), await paths(7, 0), await paths(14, 7)];
  const countries = countryShares((await rows('countryName', ago(30), today)).map((r) => ({ country: r.value, visits: r.visits })));

  const visits = sum(days);
  if (!visits) throw new Error('no visits in the last 30 days');
  const data = {
    updated: today.toISOString(),
    days,
    visits,
    visitsBefore: sum(before),
    profileViews: [...month.values()].reduce((s, n) => s + n, 0),
    enShare: Math.round((days.reduce((s, d) => s + d.en, 0) / visits) * 100),
    countries,
    month: ranking(month, monthBefore, 6),
    week: ranking(week, weekBefore, 6),
    trending: trending(week, weekBefore, 5),
  };
  mkdirSync('src/data', { recursive: true });
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`readers: wrote ${OUT} (${visits} visits in 30 days, ${month.size} profiles read).`);
} catch (error) {
  console.warn(`readers: skipped, ${error instanceof Error ? error.message : error}`);
}
