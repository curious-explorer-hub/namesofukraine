// Applies the light or dark theme before the first paint, so the page doesn't flash. A plain file in
// <head> because the Content-Security-Policy allows no inline scripts. The visitor's choice (header
// toggle, src/scripts/theme.ts) wins; otherwise the system setting. Keep the key in sync with theme.ts.
(function () {
  var theme;
  try { theme = localStorage.getItem('iu:theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
})();
