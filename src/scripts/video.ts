// Story videos (D18): each card is a link to YouTube until the reader presses play. Only then does the
// page load the player, from youtube-nocookie.com, in place of the card.
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

export function initVideos(root: ParentNode = document) {
  for (const link of root.querySelectorAll<HTMLAnchorElement>('a[data-youtube]')) {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.className = 'story-video-frame';
      frame.src = embedUrl(link.dataset.youtube!);
      frame.title = link.dataset.title ?? '';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      link.replaceWith(frame);
      frame.focus();
    });
  }
}
