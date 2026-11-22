import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import { validateEnquiry, formatEnquiry } from '../src/scripts/enquiry.mjs';
import { projects } from '../src/content.mjs';
import { originalMedia, assertOriginalMedia } from '../src/media.mjs';
import { root, output } from '../scripts/build.mjs';

async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes:true});
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
test('website media uses exact NBG originals and rejects replacements, altered URLs and unlisted video', async () => {
  for (const value of Object.values(originalMedia)) {
    const url = new URL(value);
    assert.equal(url.origin, 'https://nbgconstructions.com.au');
    assert.ok(url.pathname.startsWith('/wp-content/uploads/'));
    assert.equal(url.search, '');
  }
  for (const project of projects) assert.ok(Object.values(originalMedia).includes(project.image));
  for (const file of (await walk(output)).filter(file => file.endsWith('.html'))) assertOriginalMedia(await readFile(file,'utf8'));
  assert.throws(() => assertOriginalMedia('<img src="/assets/generated-office.png">'));
  assert.throws(() => assertOriginalMedia(`<img src="${originalMedia.office}?filter=warm">`));
  assert.throws(() => assertOriginalMedia('<video src="https://example.com/replacement.mp4"></video>'));
  assert.throws(() => assertOriginalMedia('<video poster="/assets/generated-poster.png"></video>'));
  assert.throws(() => assertOriginalMedia(`<img src="${originalMedia.office}" srcset="/assets/edited-office.png 2x">`));
});
test('required fields, Unicode names, enumerated values and boundary lengths are checked', () => {
  assert.deepEqual(Object.keys(validateEnquiry({})), ['name','email','type','message']);
  const valid = {name:'李 明',email:'client@example.com',type:'Project enquiry',service:'Not sure',message:'Ten chars!'};
  assert.deepEqual(validateEnquiry(valid), {});
  assert.ok(validateEnquiry({...valid,email:'broken'}).email);
  assert.ok(validateEnquiry({...valid,type:'arbitrary'}).type);
  assert.ok(validateEnquiry({...valid,service:'arbitrary'}).service);
  assert.ok(validateEnquiry({...valid,message:'a'.repeat(2001)}).message);
  assert.deepEqual(validateEnquiry({...valid,message:'a'.repeat(2000)}), {});
  assert.ok(validateEnquiry({...valid,name:' '.repeat(5)}).name);
  const draft = formatEnquiry(valid);
  assert.match(draft, /李 明/);
  assert.match(draft, /Phone: Not provided/);
  assert.doesNotMatch(draft, /undefined|null/);
});
test('all local-review routes have unique identity, noindex, accessible landmarks and resolvable links/assets', async () => {
  const files = await walk(output);
  const titles = new Set();
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  assert.equal(htmlFiles.length, 19);
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `duplicate title: ${title}`); titles.add(title);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, file);
    assert.match(html, /<html lang="en-AU"/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /aria-controls="main-navigation"/);
    for (const [, attr, raw] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (!raw.startsWith('/')) continue;
      const clean = raw.split(/[?#]/)[0];
      const target = path.join(output, clean, clean.endsWith('/') ? 'index.html' : '');
      assert.ok(files.includes(target), `${attr} ${raw} in ${file}`);
    }
    assert.doesNotMatch(html, /architecture@hub|info@hub|600\+|100\+|tokens\.json|design\.md|PRD\.md/);
  }
});
test('only runtime assets enter output; no internal design system or documentation', async () => {
  const files = (await walk(output)).map(file => path.relative(output, file).replaceAll('\\','/'));
  assert.ok(files.every(file => /(?:\.html|\.css|\.mjs|\.ttf|\.txt)$/.test(file)));
  assert.ok(!files.some(file => /README|PRD|catalog|tokens\.json|design\.md|\.env|notes|concepts/.test(file)));
  assert.equal(await readFile(path.join(output,'robots.txt'),'utf8'), 'User-agent: *\nDisallow: /\n');
  assert.ok(projects.every(project => project.approval === 'draft'));
  assert.ok(projects.every(project => project.source.startsWith('https://nbgconstructions.com.au/')));
});
test('Netlify and CLI cannot publish this draft', async () => {
  const config = await readFile(path.join(root,'netlify.toml'),'utf8');
  assert.match(config, /ignore = "exit 0"/);
  assert.match(config, /command = "npm run build:production"/);
  assert.match(config, /publish = "dist"/);
  const run = spawnSync(process.execPath, ['scripts/blocked-publication.mjs'], {cwd:root,encoding:'utf8'});
  assert.equal(run.status,1);
  assert.match(run.stderr,/Publication is disabled/);
  const workflow = await readFile(path.join(root,'.github/workflows/check.yml'),'utf8');
  assert.doesNotMatch(workflow, /NETLIFY_AUTH_TOKEN|netlify deploy|curl|workflow_dispatch/);
  assert.match(workflow,/branches: \[main\]/);
});
test('local server returns true 404s, protects source paths, preserves query redirects and rejects form posts', async () => {
  const server = spawn(process.execPath,['scripts/dev.mjs'],{cwd:root,env:{...process.env,PORT:'4174'},stdio:['ignore','pipe','pipe']});
  try {
    await Promise.race([once(server.stdout,'data'),new Promise((_, reject)=>setTimeout(()=>reject(Error('Server did not start')),10000).unref())]);
    for (const route of ['/missing/','/PRD.md','/src/content.mjs','/company/brand/design_system/','/notes/','/.env']) {
      const response = await fetch('http://127.0.0.1:4174' + route);
      assert.equal(response.status,404,route);
      assert.match(await response.text(),/Let’s get you/);
    }
    const response = await fetch('http://127.0.0.1:4174/projects/');
    assert.equal(response.status,200);
    assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow');
    assert.match(response.headers.get('content-security-policy'),/form-action 'none'/);
    const redirect = await fetch('http://127.0.0.1:4174/projects?sector=office',{redirect:'manual'});
    assert.equal(redirect.status,308);
    assert.equal(redirect.headers.get('location'),'/projects/?sector=office');
    const renamed = await fetch('http://127.0.0.1:4174/projects/hold-east-office/?sector=office',{redirect:'manual'});
    assert.equal(renamed.status,301);
    assert.equal(renamed.headers.get('location'),'/projects/holder-east-office/?sector=office');
    assert.equal((await fetch('http://127.0.0.1:4174/contact/',{method:'POST',body:'test'})).status,405);
  } finally { server.kill(); }
});
