import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects, services, sectors } from '../src/content.mjs';
import * as page from '../src/templates.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const output = path.join(root, 'dist');
export async function build() {
  // The target is a fixed child of this checkout, never a caller-supplied path.
  if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Unsafe output directory');
  await rm(output, {recursive:true, force:true});
  await mkdir(path.join(output, 'assets'), {recursive:true});
  await cp(path.join(root, 'public'), output, {recursive:true});
  await cp(path.join(root, 'src/styles/site.css'), path.join(output, 'assets/site.css'));
  for (const file of ['site.mjs', 'enquiry.mjs']) await cp(path.join(root, 'src/scripts', file), path.join(output, 'assets', file));
  const routes = [
    ['/', 'Commercial construction, fitouts & refurbishment', 'Melbourne commercial construction, fitouts and refurbishment. Explore NBG projects and discuss your space.', page.home()],
    ['/projects/', 'Projects', 'Explore NBG’s education, office, hospitality and retail project portfolio.', page.projectIndex()],
    ['/services/', 'Services', 'Explore commercial construction, fitouts, refurbishment and project management with NBG.', page.serviceIndex()],
    ['/sectors/', 'Sectors', 'Explore NBG projects in education, office, hospitality and retail environments.', page.sectorIndex()],
    ['/about/', 'About NBG', 'Meet Melbourne-based NIU Builders Group. Established in 2009 with a focus on commercial building and fitouts.', page.about()],
    ['/contact/', 'Discuss your project', 'Prepare a project enquiry draft and find the current contact page for NIU Builders Group.', page.contact()],
    ['/privacy/', 'Privacy', 'How enquiry drafts, external images and links are handled in this unpublished website preview.', page.privacy()],
    ['/company-policy/', 'Company policies', 'Request current company policies and capability information from NIU Builders Group.', page.policies()],
    ...projects.map(project => [`/projects/${project.slug}/`, project.title, project.summary, page.projectDetail(project)]),
    ...services.map(service => [`/services/${service.slug}/`, service.title, service.short, page.serviceDetail(service)]),
    ...sectors.map(sector => [`/sectors/${sector.slug}/`, sector.title, sector.intro, page.sectorDetail(sector)]),
  ];
  for (const [route, title, description, body] of routes) {
    const directory = path.join(output, route);
    await mkdir(directory, {recursive:true});
    await writeFile(path.join(directory, 'index.html'), page.layout(route, title, description, body));
  }
  await writeFile(path.join(output, '404.html'), page.layout('/404/', 'Page not found', 'Return to the NBG homepage or explore our projects.', page.notFound()));
  await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  return routes.map(([route]) => route);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const routes = await build();
  console.log(`Built ${routes.length} local-review pages plus 404. No publication performed.`);
}
