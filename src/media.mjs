// Exact original asset URLs already used by the existing NBG website.
// Do not replace these with generated, retouched, recoloured or re-encoded media.
export const originalMedia = Object.freeze({
  logo: 'https://nbgconstructions.com.au/wp-content/uploads/2022/06/go01-1-1-removebg-preview.png',
  richardson: 'https://nbgconstructions.com.au/wp-content/uploads/2026/02/Richardson-Hall-home-page.png',
  dayali: 'https://nbgconstructions.com.au/wp-content/uploads/2026/05/DA-YA-LI-homepage.png',
  midea: 'https://nbgconstructions.com.au/wp-content/uploads/2026/05/Midea-home-page.png',
  office: 'https://nbgconstructions.com.au/wp-content/uploads/2026/06/Hold-East-Office-730x583-1.png',
});

export function assertOriginalMedia(html) {
  const allowed = new Set(Object.values(originalMedia));
  for (const [tag] of html.matchAll(/<(?:img|video|source)\b[^>]*>/gi)) {
    for (const [, name, value] of tag.matchAll(/\b(src|poster|srcset)="([^"]*)"/gi)) {
      const urls = name.toLowerCase() === 'srcset' ? value.split(',').map(part => part.trim().split(/\s+/)[0]) : [value];
      for (const url of urls) if (!allowed.has(url)) throw new Error(`Media must be an approved NBG original: ${url}`);
    }
  }
}
