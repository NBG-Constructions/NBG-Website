import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { build, output } from './build.mjs';

await build();
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
const server = createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {'Allow':'GET, HEAD'}); res.end(); return; }
  try {
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    let target = path.resolve(output, '.' + pathname);
    if (!target.startsWith(output + path.sep) && target !== output) throw new Error('Outside document root');
    let exists;
    try { exists = await stat(target); } catch { exists = null; }
    if (exists?.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, {Location:pathname + '/' + url.search}); res.end(); return; }
      target = path.join(target, 'index.html');
    }
    let status = 200, body;
    try { body = await readFile(target); } catch { status = 404; target = path.join(output, '404.html'); body = await readFile(target); }
    res.writeHead(status, {
      'Content-Type':mime[path.extname(target)] || 'application/octet-stream',
      'Cache-Control':'no-store', 'X-Robots-Tag':'noindex, nofollow',
      'X-Content-Type-Options':'nosniff', 'Referrer-Policy':'strict-origin-when-cross-origin',
      'Content-Security-Policy':"default-src 'self'; img-src 'self' https://nbgconstructions.com.au; style-src 'self'; font-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(400, {'Content-Type':'text/plain'}); res.end('Bad request'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '127.0.0.1', () => console.log(`NBG local review: http://127.0.0.1:${port} — loopback only, not published`));
