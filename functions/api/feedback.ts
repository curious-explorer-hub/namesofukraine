// POST /api/feedback: the site's one piece of server code (decision D19). Checks a message from the
// feedback form and the Turnstile spam check, then stores it in D1 (table in db/feedback.sql). Messages
// are read with `npm run feedback` (docs/MAINTENANCE.md). Bindings: DB (D1) and the TURNSTILE_SECRET secret.
import { parseFeedback } from '../../src/lib/feedback';

interface Env {
  DB: { prepare(sql: string): { bind(...values: unknown[]): { run(): Promise<unknown> } } };
  TURNSTILE_SECRET: string;
}

const reply = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

async function passesTurnstile(token: string, secret: string, ip: string | null) {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  return res.ok && ((await res.json()) as { success?: boolean }).success === true;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  // Only the site's own page may send messages; the largest valid form is well under 20 kB.
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403, { error: 'origin' });
  if (Number(request.headers.get('Content-Length') ?? 0) > 20_000) return reply(413, { error: 'size' });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { error: 'invalid' });
  }
  const feedback = parseFeedback(form);
  if (!feedback) return reply(400, { error: 'invalid' });
  const token = form.get('cf-turnstile-response');
  if (typeof token !== 'string' || !token || !(await passesTurnstile(token, env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP')))) {
    return reply(403, { error: 'captcha' });
  }

  const { lang, type, profile, about, message, sources, email } = feedback;
  await env.DB.prepare(
    'INSERT INTO feedback (id, created, lang, type, profile, about, message, sources, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  )
    .bind(crypto.randomUUID(), new Date().toISOString(), lang, type, profile, about, message, sources, email)
    .run();
  return reply(200, { ok: true });
}
