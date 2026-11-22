// Read-only origin check; does not download files to the website or transform media.
import { createHash } from 'node:crypto';
import { originalMedia } from '../src/media.mjs';

const homepage = await fetch('https://nbgconstructions.com.au/', {signal:AbortSignal.timeout(30000)});
if (!homepage.ok) throw new Error(`NBG homepage returned ${homepage.status}`);
const html = (await homepage.text()).replaceAll('&amp;', '&').replaceAll('\\/', '/');
const results = await Promise.all(Object.entries(originalMedia).map(async ([name, url]) => {
  // The existing site's logo uses http in its HTML. HTTPS serves the same original;
  // verify byte identity rather than weakening the website to mixed-content HTTP.
  const sourceUrl = html.includes(url) ? url : url.replace(/^https:/, 'http:');
  if (!html.includes(sourceUrl)) throw new Error(`${name}: original URL not found on existing NBG homepage`);
  const response = await fetch(url, {signal:AbortSignal.timeout(30000)});
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${name}: original image did not load`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sourceUrl !== url) {
    const sourceResponse = await fetch(sourceUrl, {signal:AbortSignal.timeout(30000)});
    if (!sourceResponse.ok) throw new Error(`${name}: original HTTP source did not load`);
    const sourceHash = createHash('sha256').update(Buffer.from(await sourceResponse.arrayBuffer())).digest('hex');
    if (sourceHash !== sha256) throw new Error(`${name}: HTTPS file differs from original HTTP source`);
  }
  return {name, url, sourceUrl, referencedByExistingHomepage:true, bytes:bytes.length, sha256};
}));
console.log(JSON.stringify({checkedAt:new Date().toISOString(), originals:results, video:'No video is currently included in this website implementation.'},null,2));
