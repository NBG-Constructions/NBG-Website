# NBG-Website

NIU Builders Group company website — first local-review implementation, **not published**.

## Run and check

Requires Node 22 or later. There are no npm dependencies to install.

```text
npm run dev
npm run check
```

Open http://127.0.0.1:4173 for local review. The server binds only to loopback. `npm run build` generates an unpublished review in `dist/`; rebuild/restart after source edits.

## Website structure

- `src/content.mjs`: company, service, sector and project draft content with public-source references.
- `src/templates.mjs`: shared header/footer, home and page templates.
- `src/styles/site.css`: application-only NBG design system styles.
- `src/scripts/`: mobile navigation, URL-preserved project filtering and local enquiry drafts.
- `public/fonts/`: self-hosted Inter/Manrope and their open font licences.
- `scripts/`: allowlisted static build, loopback server and publication block.
- `tests/`: validation, links, output isolation, HTTP behaviour and publication safeguards.
- [Implementation and release blockers](notes/implementation.md): scope, content sources, design-system boundary and outstanding approvals.

## No publication

All updates are committed directly to `main`. GitHub Actions runs checks only. Netlify builds are skipped and the production build command is explicitly blocked. No deploy token or production action is included.

The internal design system's specification, gallery, PRD and token manifests are not included here. Only the runtime visual rules and openly licensed fonts needed by the website are reused. Project images remain hosted on the existing NBG website and require release review.

The contact page prepares a local draft, with copy/save actions. It **does not send an enquiry**. Real form receiving, approved public documents, project content and image rights remain release blockers.

## Codex website development skills

[AGENTS.md](AGENTS.md) links all 14 website-focused skills available in the configured Codex environment: requirements and planning, design and implementation, code generation, frontend testing, SEO/accessibility/conversion review, React/Next.js, shadcn/ui, website copy, image generation, Stripe, Supabase/Postgres, Sites hosting, and Sites remixing. Codex should read the relevant skill instructions before working on the matching task.

These are references to skills available in the Codex environment; they do not install plugins or application dependencies. Repository updates use `main` directly.
