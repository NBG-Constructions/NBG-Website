# Website implementation · 2026-11-22

Status: local-review first implementation, not a release. All changes use `main`.

## Scope

18 page routes and a 404 template: home, projects and four profiles, services and three detail pages, sectors and three detail pages, about, contact, privacy and company policies. Shared templates, structured content and runtime styles; no framework or production dependency.

The user's earlier internal website PRD informs this work. The PRD, internal design system documentation, component gallery and token manifests remain outside this public repository. Runtime styles reuse NBG Design System 1.0 draft's palette, semantic validation colours, typography, spacing, buttons, form controls and focus treatment. Manrope and Inter are bundled with their SIL Open Font Licences. No company knowledge base or staff contact list was copied.

## Sources and editorial state

- Company name, legal identity, Melbourne location and establishment year: company information supplied by NBG.
- Project titles, public photography URLs and descriptions: [existing company website](https://nbgconstructions.com.au/), checked 2026-11-22. Each record in `src/content.mjs` includes its public source and pending review note.
- [Richardson Hall](https://nbgconstructions.com.au/portfolio/richardson-hall-monash-university-2026/): several phases and halls are described together. Dates, quantities, value and early-completion claims are omitted. Exact phase attribution remains to be approved.
- [Midea](https://nbgconstructions.com.au/portfolio/midea-hvac-showroom-oakleigh-vic-2026/): scope is paraphrased without value, client quote, awards or speed claims.
- [DAYALI](https://nbgconstructions.com.au/portfolio/dayali-roast-duck-hawthorne-vic-2026/): scope is paraphrased. Suburb spelling remains unresolved, so the draft uses Melbourne only.
- Hold East Office: homepage title/location and existing image. The detail source timed out; no construction scope was inferred from the photograph.
- Logo and photography load from NBG's existing host. They are not copied into the public repository. Confirm web-reuse rights, alt text and selection of the best available original files on the existing NBG website before release. Do not generate optimised or enhanced replacements.
- User requirement: all photography and any future video must be unchanged originals from the existing NBG website. The build checks every rendered media URL against `src/media.mjs`; `scripts/audit-media.mjs` verifies the live homepage references and reads original bytes for SHA256 evidence. No video is included. Any future optimisation must preserve the user's originals-only instruction; do not silently create altered media variants.
- No testimonials, staff profiles, certificates, numerical performance claims or old capability PDF are included without approval.

All project records remain `draft`. Local review intentionally renders those drafts; it does not change their publication status. Do not treat the review build as approval or an approved production artefact.

## Intentional concept adaptations

Three Image Gen layout concepts were created before implementation using the existing design system: homepage, services/body and contact. They are kept locally in ignored `notes/concepts/`. Generated photographic concepts are never used as evidence of NBG work.

- Reuse the actual NBG logo and real existing project photos in place of the concept's text-only brand and illustrative photos.
- Keep project labels below photographs for consistent contrast; do not use the body concept's overlaid white titles.
- Use the PRD's `Project management` service name rather than the body concept's `Project coordination` label.
- Keep the design system's Manrope 500 heading weight and 72/80px desktop display style, rather than copying the generator's heavier type. The actual logo needs a taller header than the text-only concept.
- Contact prepares a local text draft and offers copy/save actions, because the receiving service and public recipient are not approved. It does not claim an email was opened or an enquiry sent.
- Omit unapproved endorsements and capability downloads. Offer a company-information request instead.

The homepage hero was refined to a 4:1 desktop image frame and a 64px section transition so the selected-projects section is visible sooner. Compact layouts retain a taller photo crop.

## Release blockers

1. User authorisation to publish. Netlify creation and initial build have not been authorised in this task.
2. Approved project scope, role, status, phase, photo rights and final service wording. Four candidate profiles are provided for review; the PRD's proposed six-case target is not met or silently padded.
3. Real enquiry receiver/provider, server-side validation, rate limits, idempotency, failure/retry and verified delivery. Current tool prepares a local draft only. No submission ID or success state is faked.
4. Public company contact details, current capability statement, policies and final privacy notice.
5. Production canonical domain, sitemap, old-to-new URL redirect mapping, responsive layout using unchanged original NBG media and real browser/device matrix. No DNS/mail records have been changed.

## Publication controls

- No deployment job, token, provider call or artifact upload in GitHub Actions; checks only on `main`.
- Netlify `ignore = "exit 0"` skips builds, and the production command always fails independently.
- Every generated page and the loopback server use `noindex`; robots disallows all. These are indexing controls, not access controls.
- `dist` is ignored and generated from an explicit allowlist. The local server serves `dist` only and returns real 404 responses for source/docs/internal paths.
- `npm run build` is a local review build, not a deploy command. It must never be uploaded as a way around the publication controls.

## Local commands

Node 22 or later; no dependency installation is required.

```text
npm run dev        # loopback-only http://127.0.0.1:4173
npm run build      # local-review dist; all pages noindex
npm run check      # build plus node tests
```

After editing source, restart the dev server or run the build again and refresh. Enquiry data is held only in the page; no local storage, logging or network submission is used.
