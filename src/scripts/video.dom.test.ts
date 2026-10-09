// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { embedUrl, initVideos } from './video';

// Mirrors the card in src/views/PersonView.astro.
const card = `<figure class="story-video"><a class="story-video-play" href="https://www.youtube.com/watch?v=TRCzSsB2WWY" data-youtube="TRCzSsB2WWY" data-title="Звернення"><span class="story-video-icon"></span></a></figure>`;

describe('initVideos (click-to-play story videos)', () => {
  it('loads nothing from YouTube until play is pressed', () => {
    document.body.innerHTML = card;
    initVideos();
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('replaces the card with a no-cookie player on click', () => {
    document.body.innerHTML = card;
    initVideos();
    document.querySelector<HTMLAnchorElement>('a[data-youtube]')!.click();
    const frame = document.querySelector('iframe')!;
    expect(frame.src).toBe(embedUrl('TRCzSsB2WWY'));
    expect(frame.src.startsWith('https://www.youtube-nocookie.com/embed/')).toBe(true);
    expect(frame.title).toBe('Звернення');
    expect(document.querySelector('a[data-youtube]')).toBeNull();
  });

  it('leaves a modified click (new tab) to the browser', () => {
    document.body.innerHTML = card;
    initVideos();
    document.querySelector('a[data-youtube]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }));
    expect(document.querySelector('iframe')).toBeNull();
  });
});
