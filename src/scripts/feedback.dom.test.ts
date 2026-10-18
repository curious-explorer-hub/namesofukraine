// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initFeedback, TURNSTILE_SRC } from './feedback';

// Mirrors the form in src/views/PageView.astro.
const page = `
  <form data-feedback action="/api/feedback" method="post" data-sitekey="key" data-lang="uk" data-msg-sending="sending" data-msg-wait="wait" data-msg-error="error">
    <input type="hidden" name="lang" value="uk" />
    <input type="hidden" name="profile" value="" />
    <input type="radio" name="type" value="person" />
    <input type="radio" name="type" value="correction" />
    <textarea name="message">Помилка</textarea>
    <div data-feedback-check></div>
    <button type="submit">Send</button>
    <p data-feedback-status></p>
  </form>
  <div data-feedback-done hidden tabindex="-1"></div>`;

const form = () => document.querySelector<HTMLFormElement>('form')!;
const status = () => document.querySelector('[data-feedback-status]')!.textContent;
const turnstileScripts = () => [...document.querySelectorAll('script')].filter((s) => s.src === TURNSTILE_SRC);
const submit = () => form().dispatchEvent(new Event('submit', { cancelable: true }));
// Stands in for the Turnstile widget once it has passed: it adds its hidden token field to the form.
const passCheck = () => form().querySelector('[data-feedback-check]')!.insertAdjacentHTML('beforeend', '<input type="hidden" name="cf-turnstile-response" value="token" />');

describe('initFeedback', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = page;
  });
  afterEach(() => vi.unstubAllGlobals());

  it('contacts Turnstile only once the reader starts filling in the form', () => {
    initFeedback(form(), new URLSearchParams());
    expect(turnstileScripts()).toHaveLength(0);
    form().querySelector('textarea')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    form().querySelector('textarea')!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(turnstileScripts()).toHaveLength(1);
  });

  it('pre-fills the kind and profile from a "Report a mistake" link and loads the check at once', () => {
    initFeedback(form(), new URLSearchParams('type=correction&profile=roksolana'));
    expect(form().querySelector<HTMLInputElement>('[value="correction"]')!.checked).toBe(true);
    expect(form().querySelector<HTMLInputElement>('[name="profile"]')!.value).toBe('roksolana');
    expect(turnstileScripts()).toHaveLength(1);
  });

  it('ignores an unknown kind and a profile that is not a slug', () => {
    initFeedback(form(), new URLSearchParams('type=spam&profile=<b>'));
    expect(form().querySelectorAll('input[type="radio"]:checked')).toHaveLength(0);
    expect(form().querySelector<HTMLInputElement>('[name="profile"]')!.value).toBe('');
  });

  it('asks the reader to wait while the spam check has not passed, sending nothing', () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    initFeedback(form(), new URLSearchParams());
    submit();
    expect(status()).toBe('wait');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('sends the form and shows the thank-you note in its place', async () => {
    const fetch = vi.fn(async () => Response.json({ ok: true }));
    vi.stubGlobal('fetch', fetch);
    initFeedback(form(), new URLSearchParams());
    passCheck();
    submit();
    await vi.waitFor(() => expect(form().hidden).toBe(true));
    const body = (fetch.mock.calls[0] as unknown as [string, RequestInit])[1].body as FormData;
    expect(body.get('message')).toBe('Помилка');
    expect(body.get('cf-turnstile-response')).toBe('token');
    expect(document.querySelector<HTMLElement>('[data-feedback-done]')!.hidden).toBe(false);
  });

  it('keeps the text and asks for a fresh spam check when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 500 })));
    const reset = vi.fn();
    vi.stubGlobal('turnstile', { render: vi.fn(), reset });
    initFeedback(form(), new URLSearchParams());
    passCheck();
    submit();
    await vi.waitFor(() => expect(status()).toBe('error'));
    expect(form().hidden).toBe(false);
    expect(form().querySelector('textarea')!.value).toBe('Помилка');
    expect(reset).toHaveBeenCalled();
  });
});
