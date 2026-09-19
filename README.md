# Gyanodaya Public School

Website and content management portal for Gyanodaya Public School, Bagodar (Giridih, Jharkhand).

Parents and applicants browse notices, academics, facilities and the gallery, and submit admission,
enquiry, campus-visit and prospectus forms. School staff sign in to an admin dashboard to edit the news
ticker, notice board, photographs and site settings, and to review submissions.

## Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript   |
| Styling   | Tailwind CSS v4                                 |
| Database  | MongoDB                                         |
| Images    | Cloudflare R2                                   |
| Hosting   | Vercel                                          |
| Tooling   | yarn, oxfmt                                     |

## Getting started

```bash
yarn install
# create .env with at least MONGODB_URI and SESSION_SECRET (see Environment below)
yarn admin:create       # create your first administrator account
yarn dev
```

Open `http://localhost:8443` (override with `PORT`). The admin panel is at `/admin`.

### Scripts

| Script            | Purpose                          |
| ----------------- | -------------------------------- |
| `yarn dev`        | Next.js dev server with HMR      |
| `yarn build`      | Production build                 |
| `yarn start`      | Serve the production build       |
| `yarn typecheck`  | `tsc --noEmit`                   |
| `yarn admin:create` | Create an administrator account |
| `yarn admin:password` | Reset an administrator's password |
| `yarn format`     | Format with oxfmt                |

This project uses **yarn** (`yarn.lock`). Don't mix in `npm` or `pnpm`.

### Environment

Configuration lives in `.env` (gitignored).

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `MONGODB_URI` | yes | Database connection. Without it the site shows a blocking "Database connection required" screen. |
| `MONGODB_DB_NAME` | no | Defaults to `gps_school_website`. |
| `SESSION_SECRET` | in production | Signs the admin session cookie; at least 32 characters (`openssl rand -hex 32`). In development a random per-process secret is used, so sessions do not survive a restart. |
| `R2_ACCOUNT_ID`, `R2_BUCKET_NAME`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_BASE_URL` | for uploads | Cloudflare R2. Image upload is disabled unless all five are set. |
| `PORT` | no | Dev/start port, defaults to 8443. |

Administrator credentials are **not** environment variables — accounts live in the database.

## How content works

Editable **site content** (ticker, notices, vacancies, images, settings) lives in a single MongoDB document
(`site_content`, keyed `main`) matching [`SiteContentDocument`](src/types/site.ts). The client fetches it on
mount and `PUT`s the whole document back after each admin edit. `src/server/defaults.ts` seeds it on first
run and backfills fields added later.

**Personal data is stored separately**, because `GET /api/site-content` is public:

| Collection | Holds | Written by | Read by |
| ---------- | ----- | ---------- | ------- |
| `form_submissions` | Admission, enquiry, visit and prospectus forms | anyone (public forms) | admins only |
| `job_applications` | Careers applications + CV link | anyone (careers form) | admins only |
| `admin_users` | Administrator accounts | `yarn admin:create`, admin panel | server only |

CVs are uploaded to Cloudflare R2 under `applications/` and the record stores the public URL, which the
admin panel links to from the candidate's row.

### API

| Endpoint              | Method       | Purpose                                   |
| --------------------- | ------------ | ----------------------------------------- |
| `/api/health`         | `GET`        | Readiness probe; confirms the DB is up    |
| `/api/site-content`   | `GET`/`PUT`  | Read or replace the site document         |
| `/api/admin/login`    | `POST`       | Sign in; sets the session cookie          |
| `/api/admin/logout`   | `POST`       | Sign out; clears the session cookie       |
| `/api/admin/session`  | `GET`        | The signed-in administrator, or `null`    |
| `/api/admin/users`    | `GET`/`POST` | List or create administrators 🔒          |
| `/api/admin/users/:id`| `PATCH`/`DELETE` | Change password or delete 🔒          |
| `/api/uploads/image`  | `POST`       | Upload a site image to R2 🔒              |
| `/api/submissions`    | `POST`       | Record a public form enquiry              |
| `/api/submissions`    | `GET`        | List enquiries 🔒                         |
| `/api/submissions/:id`| `PATCH`/`DELETE` | Update status or delete 🔒            |
| `/api/applications`   | `POST`       | Apply for a vacancy (multipart, optional `cv`) |
| `/api/applications`   | `GET`        | List applications 🔒                      |
| `/api/applications/:id`| `PATCH`/`DELETE` | Update status or delete 🔒           |

🔒 requires a signed-in administrator. `PUT /api/site-content` does too.

The two public `POST` routes are open by necessity — the people using them are not signed in. Both validate
and truncate their input server-side, force the stored status, and the CV upload is limited to PDF/Word
files of 5 MB or less.

### Admin panel

The panel lives at **`/admin`** — a real set of pages, not a modal, and it is `noindex`. Sections:
Dashboard, News ticker, Notice board, Media library, Form submissions, Vacancies (with the applications
received for each, and a link to every candidate's CV), Administrators and Site settings. Content is fetched server-side in the panel layout, so pages render with real data on first
paint rather than flashing placeholder counts.

Create the first account (there is no default login):

```bash
yarn admin:create                                  # prompts for everything
yarn admin:create <username> <password> [full name]
```

Further accounts can be added from **Administrators** inside the panel. Passwords must be at least 10
characters with a letter and a number; the last remaining account cannot be deleted.

**Forgotten password.** Reset it from **Administrators** in the panel if anyone can still sign in.
If nobody can, do it from a terminal with access to the database:

```bash
yarn admin:password                       # lists the accounts, then prompts
yarn admin:password <username>            # prompts for the new password
```

Hashes are one-way, so an existing password can never be read back — only replaced.

**How auth works.** Accounts live in the `admin_users` collection with bcrypt-hashed passwords
(`bcryptjs`, cost 12 — pure JavaScript, so there is no native build step). Signing in sets an httpOnly,
SameSite=Lax cookie holding an HS256 JWT (`jose`) that expires after 8 hours. Accounts created before the
bcrypt migration keep their `scrypt$…` hash until their owner next signs in, at which point it is re-hashed
transparently — nobody has to reset a password. `/admin/*` is guarded server-side, so an unauthenticated visitor never receives the
panel markup, and `PUT /api/site-content`, `POST /api/uploads/image` and every `/api/admin/users` route
require a valid session. Rotating `SESSION_SECRET` signs everyone out.

## Deployment

Vercel, zero-config — it detects Next.js and builds with `yarn build`. Set `MONGODB_URI`, `SESSION_SECRET`
and the `R2_*` variables in the project's environment settings, then create the first administrator with
`yarn admin:create` against the production database.

This app **cannot be deployed as a static site**: the `/api/*` routes need a Node runtime, and the page
refuses to render without them, so `next export` is not an option.

## Project layout

Application code lives under `src/`; only config, `public/` and docs sit at the repo root. See
[`AGENTS.md`](AGENTS.md) for the full annotated structure.

```
src/
  app/             App Router — layout, page, globals.css, admin/ pages, api/ route handlers
  components/      SchoolSite.tsx (client root) + layout · sections · modals · admin · common · icons
  context/         Toast · SiteContent · Ui · Admin providers
  hooks/           reusable behaviour (scroll, slider, lightbox keys, …)
  lib/             API client, theme, notice and submission helpers
  data/            static content and fallback defaults
  server/          server-only: auth, session, users, config, db, site-content, storage, defaults
  types/           shared client/server data contracts
public/            static assets served from /
```

## Rate limiting

The publicly reachable `POST` endpoints are rate limited per client IP. Counters live in the `rate_limits`
collection (not process memory, which serverless instances do not share) and expire through a TTL index.

| Endpoint | Limit |
| -------- | ----- |
| `POST /api/admin/login` | 10 attempts per 15 minutes |
| `POST /api/submissions` | 10 enquiries per 10 minutes |
| `POST /api/applications` | 5 applications per hour |

Blocked requests get `429` with a `Retry-After` header. The limiter fails open — if the database is
unreachable the request is allowed, so a storage problem cannot take the public forms offline.

`x-forwarded-for` is spoofable when the app is not behind a trusted proxy, so this slows down casual abuse
rather than a determined attacker. For stronger protection add Cloudflare Turnstile to the two public forms.

## Known gaps

- Rate limiting is per IP only; there is no CAPTCHA on the public forms.
- Replacing a site image leaves the previous file in R2 (deleting an application does remove its CV).
- Images use plain `<img>`. `next.config.ts` already allowlists the Unsplash and R2 hosts, so moving to
  `next/image` is a drop-in change when wanted.
