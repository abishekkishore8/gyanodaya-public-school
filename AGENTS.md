# gyanodaya-public-school

Website and content management portal for Gyanodaya Public School, Bagodar.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · MongoDB · Cloudflare R2.**
Package manager is **yarn**. Deployed to Vercel.

## Commands

```bash
yarn install
yarn dev            # Next dev server on $PORT (default 8443)
yarn build          # production build
yarn start          # serve the production build
yarn typecheck      # tsc --noEmit
yarn admin:create   # create an administrator account
yarn admin:password # reset an administrator's password
yarn format         # oxfmt
```

Do not use `npm` or `pnpm` — the lockfile is `yarn.lock`.

## Architecture

Editable site content (notices, announcements, vacancies, images, settings) lives in **one MongoDB
document** — `site_content` keyed `main`. The client loads it once on mount and `PUT`s the whole document
back after every admin edit. If that document cannot be read, the site renders a blocking error screen.

**`GET /api/site-content` is public, so nothing personal may go in that document.** Form submissions
(`form_submissions`), job applications (`job_applications`) and accounts (`admin_users`) each have their own
collection behind admin-only reads. When adding a feature that captures personal data, give it a collection
— do not extend `SiteContentDocument`.

There are two surfaces:

- **`/`** — the public site, plus one route per navigation entry (`/about`, `/academics`,
  `/notice-board`, `/facilities`, `/admissions`, `/online-forms`, `/gallery`). Each is a server component
  that sets its own SEO metadata and renders `src/components/SchoolSite.tsx` (which carries `"use client"`)
  with a `page` prop; `SchoolSite` picks the sections for that page. Home keeps every section on one
  scrolling view, so a section's markup has exactly one definition. No admin affordances anywhere.
- **`/admin/*`** — the management panel, one route per section. `src/app/admin/(panel)/layout.tsx` is a
  server component that verifies the session cookie and redirects to `/admin/login` when there is none, so
  panel markup never reaches an unauthenticated visitor. `/admin/login` sits outside the `(panel)` group so
  it is not behind the guard.

### Authentication

Administrator accounts live in the `admin_users` collection — never in environment variables. Passwords are
bcrypt-hashed with `bcryptjs` (pure JavaScript, so there is no native build step on serverless). Signing in
sets an httpOnly, SameSite=Lax cookie holding an HS256 JWT signed with `jose`, expiring after 8 hours.
Pre-migration `scrypt$…` hashes still verify and are upgraded to bcrypt on the owner's next sign-in.

- `src/server/auth.ts` — hashing, strength rules, token sign/verify
- `src/server/users.ts` — the `admin_users` collection
- `src/server/session.ts` — `getCurrentAdmin()` for server components, `requireAdmin()` for route handlers

Guard every new mutating route handler:

```ts
const auth = await requireAdmin();
if (auth instanceof NextResponse) return auth;
```

A route that must stay public (the two forms, and sign-in) gets a rate limit instead:

```ts
const limit = await checkRateLimit("bucket", clientIdentifier(request), 10, 10 * 60 * 1000);
if (!limit.allowed) return tooManyRequests(limit.retryAfter, "Too many requests.");
```

State is held in React contexts. The public site nests:

```
ToastProvider → SiteContentProvider → UiProvider → <SiteBody/>
```

and the admin panel (`AdminShell`) nests:

```
ToastProvider → SiteContentProvider → AdminProvider → <panel page/>
```

- `ToastContext` — the toast notification queue
- `SiteContentContext` — the site document, derived view data (hero slides, gallery, facilities with
  admin-managed images applied) and `saveContent` / `saveFormSubmissions`. Pass `initialContent` to render
  from server-fetched data and skip the client fetch; the admin layout does this
- `UiContext` — cross-component UI: mobile menu, lightbox, and every modal opened from more than one place
- `AdminDataContext` — enquiries and job applications, which are not part of the site document
- `AdminContext` — every content mutation the panel performs, plus the notice/vacancy editor state. It holds
  no authentication state; the session is server-side only.

Form state stays local to the component that owns the form; it is not lifted into context.

Server-only modules live in `src/server/` and import `server-only` to guarantee they are never pulled into
a client bundle. Route handlers are thin: they parse the request, call into `src/server/`, and shape the
response.

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect
other files when required, when a documented path is missing, or when the repository contradicts this guide.

Application code lives under `src/`. Only config, `public/` and docs sit at the repo root.

### Routing and shell (`src/app/`)

- `layout.tsx` - `<html>`/`<body>`, SEO metadata, JSON-LD, and the `next/font` typefaces
- `page.tsx` - Home: every section on one scrolling view
- `{about,academics,notice-board,facilities,admissions,online-forms,gallery}/page.tsx` - One route per
  navigation entry, each with its own title, description and canonical URL
- `robots.ts`, `sitemap.ts` - `/robots.txt` and `/sitemap.xml`; both read `SITE_URL` from `data/site.ts`
  and exclude `/admin` and `/api`
- `globals.css` - Tailwind v4 import, the `@theme` font mapping, CSS variables, keyframes and animations
- `admin/login/page.tsx` - Sign-in page (unguarded)
- `admin/(panel)/layout.tsx` - Session guard + `AdminShell`
- `admin/(panel)/{page,ticker,notices,images,submissions,vacancies,users,settings}` - One page per section
- `api/health/route.ts` - Readiness probe
- `api/site-content/route.ts` - `GET` public, `PUT` requires a session
- `api/admin/{login,logout,session}/route.ts` - Session lifecycle
- `api/admin/users/route.ts`, `api/admin/users/[id]/route.ts` - Manage accounts (guarded)
- `api/uploads/image/route.ts` - Upload an image to R2 (guarded)

### Client (`src/`)

- `components/SchoolSite.tsx` - Client root: nests the providers, picks the sections for the current
  `page` and lays out the modal layers
- `types/site.ts` - Shared client/server data contracts. Keep in sync with `src/server/site-content.ts`
- `lib/` - `api.ts` (typed `/api` wrappers), `theme.ts` (brand colors), `notices.ts` (tag theming),
  `submissions.ts` (reference ids and form helpers)
- `data/` - Static content and fallback defaults, one module per topic (`hero`, `academics`, `notices`, …)
- `context/` - The providers described above
- `hooks/` - Reusable behaviour: scroll progress, body scroll lock, hero slider, lightbox keys
- `components/layout/` - `TopBar`, `NewsTicker`, `Navbar`, `Footer`
- `components/sections/` - One file per page section; `online-forms/` holds the tab shell and its four forms
- `components/modals/` - Public modal layers (lightbox, enquiry, circular, archive, job application, receipt)
- `components/admin/` - `LoginForm`, `AdminShell` (chrome + providers) and the editors; `tabs/` holds one
  component per panel section; `ui/` is the panel's design system (`Button`, `Card`, `Field`, `Badge`,
  `Modal`, `PageHeader`, `EmptyState`) — build new admin screens from these rather than ad-hoc markup
- `components/common/`, `components/icons/` - Shared widgets and SVG icon components

### Server (`src/server/`)

Every file here starts with `import "server-only"`.

- `config.ts` - All environment reads. Never throws; missing values are reported through `missingEnv()`
- `rate-limit.ts` - Per-IP fixed-window limiter for public endpoints, backed by the `rate_limits` collection
- `submissions.ts` - The `form_submissions` collection (public writes, admin reads)
- `applications.ts` - The `job_applications` collection, including the CV link
- `auth.ts` - Password hashing and session-token signing
- `users.ts` - The `admin_users` collection
- `session.ts` - Session cookie helpers and the route/page guards
- `db.ts` - Lazy MongoDB connection, cached on `globalThis` to survive dev reloads
- `site-content.ts` - Read/normalize/write the single site document
- `storage.ts` - Image uploads to Cloudflare R2
- `defaults.ts` - Seed content used when the document does not yet exist
- `responses.ts` - Shared JSON error shaping for route handlers

### Config (repo root)

- `package.json` - Dependencies and the dev, build, start, typecheck and format scripts
- `next.config.ts` - Strict mode, `serverExternalPackages` for the Mongo/AWS SDKs, remote image patterns
- `postcss.config.mjs` - Tailwind CSS v4 via `@tailwindcss/postcss`
- `tsconfig.json` - `@/*` → `./src/*`; partly managed by Next.js
- `.env` - Environment variables (gitignored; documented in README.md). Administrator credentials are
  **not** here — they live in the database
- `.mise.toml` - Toolchain versions for Node.js and yarn
- `public/` - Static assets served from `/` (must stay at the repo root, not under `src/`)

## Dependencies

- Framework: Next.js 16 (App Router, Turbopack), React 19
- Server: MongoDB driver 7, `@aws-sdk/client-s3` (for R2), `server-only`
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss`
- Tooling: TypeScript 5.9, oxfmt

## Styling

This project uses **Tailwind CSS v4** through `@tailwindcss/postcss`. `src/app/globals.css` imports Tailwind
with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4
theme customization in `src/app/globals.css`. There is no `tailwind.config.js` — v4 is configured in CSS.

Fonts are loaded and self-hosted by `next/font/google` in `src/app/layout.tsx`, which sets `--font-inter` and
`--font-playfair` on `<html>`. The `@theme` block in `globals.css` maps those onto `--font-sans` and
`--font-serif`, which is what makes `font-sans` and `font-serif` resolve to Inter and Playfair Display. Add
new fonts the same way; do not add a Google Fonts `@import` to the CSS (Tailwind v4 strips it).

Brand colors live in `src/lib/theme.ts` (`GREEN`, `GOLD`, `GOLD_TEXT`). Import them rather than repeating the
hex values, except inside Tailwind arbitrary-value classes such as `text-[#14452f]`.

## Code quality

- Keep `yarn typecheck` clean; `yarn build` typechecks as part of the Next build.
- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in
  single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
- Import from `@/…` rather than long relative paths.
- Reach for a context only for state shared across sections; keep form and toggle state local.
- Any new module that touches the database, R2 or secrets belongs in `src/server/` and must start with
  `import "server-only"`.
- Guard every new mutating route handler with `requireAdmin()`.
- Keep admin affordances out of the public site — everything editorial belongs under `/admin`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
