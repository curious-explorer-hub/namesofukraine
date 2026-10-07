// Serves dist/ the way Cloudflare Pages will, for the Playwright smoke tests: the "/*" headers from
// public/_headers (so pages run under the real Content-Security-Policy), directory index pages, and
// the per-language 404 pages. Usage: node scripts/serve-dist.mjs [port]
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = 'dist';
const port = Number(process.argv[2] ?? 4390);
const headers = Object.fromEntries(
  readFileSync('public/_headers', 'utf8')
    .split('\n')
    .filter((line) => /^\s+[\w-]+:/.test(line))
    .map((line) => {
      const i = line.indexOf(':');
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  let status = 200;
  if (!existsSync(file)) {
    status = 404;
    const lang = path.match(/^\/(uk|en)\//)?.[1];
    file = join(root, lang ? `${lang}/404.html` : '404.html');
  }
  res.writeHead(status, { ...headers, 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root}/ at http://127.0.0.1:${port}`));
