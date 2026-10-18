// The feedback form (D19): sends the message to /api/feedback and shows the thank-you note in its place.
// The Turnstile spam check loads only once the reader starts filling in the form (or came to write, from
// a "Report a mistake" link), so a visit to the page alone contacts no one else.
import { isFeedbackType, isProfileSlug } from '../lib/feedback';

export const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface Turnstile {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(widget?: string): void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

export function initFeedback(form: HTMLFormElement, params = new URLSearchParams(location.search)) {
  const check = form.querySelector<HTMLElement>('[data-feedback-check]')!;
  const status = form.querySelector<HTMLElement>('[data-feedback-status]')!;
  const send = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const done = document.querySelector<HTMLElement>('[data-feedback-done]')!;

  // A "Report a mistake" or "Join the team" link pre-fills the kind of message and the profile.
  const type = params.get('type');
  if (isFeedbackType(type)) form.querySelector<HTMLInputElement>(`input[name="type"][value="${type}"]`)!.checked = true;
  const profile = params.get('profile');
  if (isProfileSlug(profile)) form.querySelector<HTMLInputElement>('input[name="profile"]')!.value = profile;

  let widget: string | undefined;
  let requested = false;
  const loadCheck = () => {
    if (requested) return;
    requested = true;
    const script = document.createElement('script');
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.onload = () => {
      widget = window.turnstile?.render(check, {
        sitekey: form.dataset.sitekey,
        language: form.dataset.lang,
        theme: 'auto',
        appearance: 'interaction-only',
      });
    };
    document.head.append(script);
  };
  form.addEventListener('focusin', loadCheck);
  if (params.has('type') || params.has('profile')) loadCheck();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (!data.get('cf-turnstile-response')) {
      loadCheck();
      status.textContent = form.dataset.msgWait!;
      return;
    }
    send.disabled = true;
    status.textContent = form.dataset.msgSending!;
    try {
      const res = await fetch(form.action, { method: 'POST', body: data });
      if (res.ok) {
        form.hidden = true;
        done.hidden = false;
        done.focus();
        return;
      }
      status.textContent = form.dataset.msgError!;
    } catch {
      status.textContent = form.dataset.msgError!;
    } finally {
      send.disabled = false;
    }
    // A Turnstile token works once: get a fresh one for the next try.
    window.turnstile?.reset(widget);
  });
}
