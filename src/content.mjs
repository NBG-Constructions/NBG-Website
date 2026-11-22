// Editorial draft for local review. Source assertions are not web-publication approvals.
// Remote company photographs stay on the existing company host; no source library is copied.
import { originalMedia } from './media.mjs';
export const company = {
  name: 'NIU BUILDERS GROUP',
  legalName: 'NEWDECOR PTY LTD trading as NIU BUILDERS GROUP',
  location: 'Melbourne, Victoria',
  founded: '2009',
  logo: originalMedia.logo,
  currentContact: 'https://nbgconstructions.com.au/contact/',
};
export const navigation = [['Projects', '/projects/'], ['Services', '/services/'], ['Sectors', '/sectors/'], ['About', '/about/'], ['Contact', '/contact/']];
export const sectors = [
  { slug: 'education', title: 'Education', intro: 'Spaces for learning, living and campus life.', body: 'Student accommodation, learning spaces and university facilities each bring different operational needs. Start with the way your campus uses the space, the access available and the programme you have in mind.', image: 'richardson-hall' },
  { slug: 'office', title: 'Office', intro: 'Workplaces shaped around the working day.', body: 'From meeting areas to shared spaces, an office fitout needs to support how people work. Discuss your layout, existing building, required services and plans for occupation with NBG.', image: 'hold-east-office' },
  { slug: 'hospitality-retail', title: 'Hospitality & retail', intro: 'Places to meet, experience and discover.', body: 'Restaurants and showrooms bring customer-facing spaces together with operational requirements. Tell us about the experience you want to create and the practical needs behind it.', image: 'dayali-roast-duck' },
];
export const services = [
  { slug: 'commercial-construction', title: 'Commercial construction', short: 'Building works for commercial spaces and the people who use them.', intro: 'Bring the building, the brief and the practical requirements together.', scope: ['Commercial building works', 'Coordination with the project team', 'Construction and handover planning'], body: 'Talk to NBG about the building work your project needs. The scope, responsibilities and programme are agreed for each project, with the existing building and its use in view.', related: ['midea-showroom', 'dayali-roast-duck'] },
  { slug: 'fitouts-refurbishments', title: 'Fitouts & refurbishments', short: 'New uses, renewed interiors and considered details.', intro: 'Make an existing space work for what comes next.', scope: ['Commercial interior fitouts', 'Refurbishment of existing spaces', 'Coordination of finishes and building services'], body: 'From workplace interiors to education and hospitality spaces, a fitout starts with the requirements of the people using it. Share your brief, drawings and priorities so the project scope can be defined.', related: ['richardson-hall', 'hold-east-office'] },
  { slug: 'project-management', title: 'Project management', short: 'A clear conversation about scope, coordination and delivery.', intro: 'Keep the project conversation connected from brief to handover.', scope: ['Scope and programme discussions', 'Project team coordination', 'Construction progress and handover coordination'], body: 'Discuss the coordination support your project needs, who is involved and how responsibilities will be shared. The appointment and services are defined for the individual project.', related: ['midea-showroom', 'hold-east-office'] },
];
export const projects = [
  {
    slug: 'richardson-hall', title: 'Richardson Hall', sector: 'education', location: 'Monash University, Clayton',
    image: originalMedia.richardson,
    alt: 'Brick student residence and landscaped grounds at Richardson Hall',
    summary: 'Renewing student accommodation within a university campus.',
    description: 'The existing NBG portfolio documents refurbishment work across Monash University residential halls, including Richardson Hall. This profile brings the campus accommodation work into one place for review.',
    scope: ['Student accommodation refurbishment', 'Window upgrades', 'Interior finishes and joinery'],
    service: 'fitouts-refurbishments',
    source: 'https://nbgconstructions.com.au/portfolio/richardson-hall-monash-university-2026/',
    approval: 'draft', review: 'Confirm phase boundaries, precise scope and photographic rights before release. No dates or outcome metrics are carried forward.'
  },
  {
    slug: 'dayali-roast-duck', title: 'DAYALI Roast Duck', sector: 'hospitality-retail', location: 'Melbourne, Victoria',
    image: originalMedia.dayali,
    alt: 'DAYALI Roast Duck street frontage with illuminated restaurant signage',
    summary: 'A restaurant environment with hospitality at its heart.',
    description: 'A Melbourne restaurant project featured in NBG’s existing portfolio, bringing dining areas and the working requirements of a commercial kitchen into the fitout.',
    scope: ['Restaurant fitout and finishes', 'Commercial kitchen installation', 'Building services and amenities'],
    service: 'commercial-construction',
    source: 'https://nbgconstructions.com.au/portfolio/dayali-roast-duck-hawthorne-vic-2026/',
    approval: 'draft', review: 'Confirm suburb spelling, exact NBG responsibilities and photographic rights before release.'
  },
  {
    slug: 'midea-showroom', title: 'Midea HVAC Showroom', sector: 'hospitality-retail', location: 'Oakleigh, Victoria',
    image: originalMedia.midea,
    alt: 'Glazed Midea HVAC showroom frontage and signage',
    summary: 'A commercial setting for product display and training.',
    description: 'NBG’s existing portfolio presents the Midea showroom as a space combining product displays, training and workplace functions in Oakleigh.',
    scope: ['Showroom and workplace fitout', 'Building services coordination', 'Training spaces and amenities'],
    service: 'commercial-construction',
    source: 'https://nbgconstructions.com.au/portfolio/midea-hvac-showroom-oakleigh-vic-2026/',
    approval: 'draft', review: 'Confirm final scope, current project status and photographic rights. No commercial value or performance claim is reproduced.'
  },
  {
    slug: 'hold-east-office', title: 'Hold East Office', sector: 'office', location: 'Queen Street, Melbourne',
    image: originalMedia.office,
    alt: 'Timber ceiling and meeting area at Hold East Office',
    summary: 'A workplace with warmth, texture and room to connect.',
    description: 'Hold East Office is a workplace project featured in NBG’s existing portfolio. The photography shows the material detail of the meeting and shared spaces.',
    scope: [], service: 'fitouts-refurbishments',
    source: 'https://nbgconstructions.com.au/',
    approval: 'draft', review: 'The linked source verifies the name and location only. Confirm the spelling of Hold East, NBG role, scope, completion status and photographic rights. Do not infer scope from the image.'
  },
];
export const projectBySlug = slug => projects.find(project => project.slug === slug);
export const sectorBySlug = slug => sectors.find(sector => sector.slug === slug);
