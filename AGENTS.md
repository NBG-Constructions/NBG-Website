# NBG-Website agent instructions

Repository: https://github.com/NBG-Constructions/NBG-Website

## Linked website development skills

For each task, resolve the following skill identifiers from the current Codex session's available-skills catalog, open the corresponding SKILL.md, and follow the applicable instructions. Read any supporting resources the selected skill requires. These references use skill identifiers so they remain usable when plugin cache versions or checkout paths change.

| Skill identifier | Use when |
| --- | --- |
| `build-web-apps:frontend-app-builder` | Building a new website/page or an explicitly requested visual redesign. |
| `build-web-apps:frontend-testing-debugging` | Testing rendered pages, fixing UI bugs, or making targeted frontend improvements. |
| `build-web-apps:react-best-practices` | Writing or reviewing React or Next.js code, if that stack is used. |
| `build-web-apps:shadcn` | Working with shadcn/ui, its components, or a project containing components.json. |
| `app-6aba497ee93c81919592399bfa4c4609:app-copy` | Writing website copy, page text, navigation labels, or calls to action. |
| `imagegen` | Generating or editing bitmap concepts, illustrations, or website imagery. |

| `app-6aba497ee93c81919592399bfa4c4609:ai-app-and-website-builder` | Website ideas, initial requirements, or the App Builder service workflow. |
| `app-6aba497ee93c81919592399bfa4c4609:app-plan` | Planning website features, pages, flows, booking, shops, or implementation options. |
| `app-6aba497ee93c81919592399bfa4c4609:app-code` | Requested website code, prototypes, or edits using the App Builder coding workflow. |
| `app-6aba497ee93c81919592399bfa4c4609:app-check` | Reviewing a website or screen for SEO, accessibility, conversion, or copy improvements. |
| `build-web-apps:stripe-best-practices` | Implementing or reviewing Stripe payments, Checkout, subscriptions, or Connect. |
| `build-web-apps:supabase-postgres-best-practices` | Implementing or reviewing Supabase/Postgres schemas, queries, or database performance. |
| `sites:sites` | Building, editing, publishing, or managing hosting through Sites, following its routing instructions. |
| `sites:sites-remix` | Remixing an identified existing Sites website into a new Site. |

Only apply skills relevant to the requested work. Their inclusion does not select a framework, install packages, or authorize a redesign. If a referenced skill is unavailable, report that limitation and continue any independent work that can be completed. Do not claim a skill was read or run unless it was.

Skill implementations and plugin tools must be available in the executing Codex environment. This file routes tasks to those installed skills; it does not bundle or install them. Avoid committing machine-specific plugin cache paths or copies of plugin packages.

## Original NBG photography and video (user requirement)

- All website photos and videos must be unmodified originals from the existing `nbgconstructions.com.au` website. Use the exact original URL, or a byte-identical copy with recorded source and checksum.
- Do not generate, replace, retouch, recolour, composite, AI-enhance or re-encode photos/video. Do not ship stock images, generated concept imagery or altered posters. Do not produce edited/trimmed video without a new explicit user instruction.
- Responsive CSS sizing/framing may adapt to the page; it must not change the source asset or apply colour filters/overlays. Keep the original scene and project association accurate.
- Register original media in `src/media.mjs`; retain source evidence and run the origin audit when adding media. No video has been added yet; any future video needs its exact original NBG source, not a substitute.
- This originals-only instruction takes precedence over optional image-generation suggestions in linked skills for this website.

## Project workflow

- Use `main` for all updates, commits, pushes, and deployments. Do not create branches or pull requests.
- Before repository changes, inspect remotes, the current branch, worktree, and staging area; fetch and synchronize the latest `main` while preserving existing local work.
- Resolve routine conflicts from context without discarding user changes or force-pushing remote history.
- Commit only changes within the current task's scope, push directly to `main`, and verify the remote result. Verify deployment results when a deployment is part of the task.
- Keep changes small and consistent with the existing project. Inspect the actual stack before choosing framework-specific skills.
- For rendered frontend changes, check responsive layout, relevant interactions, keyboard focus, and readable contrast through the testing skill. Report what was verified and any remaining limitations.
- Use user-approved company information. Do not invent project history, client endorsements, accreditations, performance claims, or contact details.
