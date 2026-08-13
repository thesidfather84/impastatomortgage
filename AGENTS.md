<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Impastato Mortgage — project guide for coding agents

Production marketing/education site for a Louisiana mortgage professional
(Dawn Impastato). This is a brand-new, standalone project — unrelated to
any other project on this machine. Do not touch other repositories.

## Stack

- Next.js 16.3.0, App Router, TypeScript, Tailwind CSS v4 (CSS-based config
  via `@theme` in `src/app/globals.css`, not `tailwind.config.js`)
- No external UI/animation libraries — keep JS minimal, ship fast on mobile
- No database, no auth, no analytics wired up yet

## Windows path-casing gotcha

This repo's on-disk directory name is `impastatomortgage` but if you ever
see build errors like `Invariant: Expected workStore to be initialized`,
check whether the shell's cwd casing matches `Get-Item`'s reported casing
(`Get-ChildItem C:\Users\<user> -Filter "*mpastato*"`). Turbopack/webpack
resolve modules by literal path string on Windows, so a casing mismatch
between the shell cwd and the true NTFS name creates duplicate module
instances and breaks singletons. `next.config.ts` pins `turbopack.root` to
`path.resolve(__dirname)` to help, but if the *shell's own* cwd string still
disagrees with the real casing, `cd`/`Set-Location` into the exact casing
reported by `Get-ChildItem` before running `next build`/`next dev`.

## Architecture / where things live

- `src/config/` — single source of truth for brand copy, contact info, and
  **regulated compliance facts** (`compliance.ts`). Never hardcode a phone
  number, NMLS ID, or tagline directly in a component — import it.
- `src/content/` — structured content (Ask Dawn knowledge base, Mortgage
  Compass questions, location pages). Content, not layout.
- `src/components/site/` — layout chrome (header, footer, hero, nav)
- `src/components/compliance/` — regulated-disclosure components. These
  must always render *something* for a missing fact (a visible "Pending"
  notice) — never silently omit a disclosure.
- `src/components/accessibility/` — text-size control, skip link, Read
  This Page (progressive enhancement only, feature-detected)
- `src/components/ask-dawn/` — the retrieval-first Q&A assistant. It only
  ever answers from `src/content/ask-dawn/knowledge-base.ts` via the
  deterministic matcher in `src/lib/ask-dawn/match.ts`. **Never wire this
  up to an LLM or generative API without re-reading the compliance
  constraints this was built under** — it must not hallucinate mortgage
  guidance, rates, or eligibility.
- `src/components/mortgage-compass/` — educational routing wizard, not a
  loan engine. Never add SSN/bank-account collection to it.
- Argent Lending (`src/config/application.ts`) and ERA Top Agent Realty
  (`src/config/compliance.ts`, `compliance.realEstate`) are replaceable
  external affiliations, not fixed to this codebase — Dawn's lender and
  brokerage relationships can change. Keep application URLs, licensing
  data, brokerage data, and affiliation-specific disclosures centralized
  in `src/config/`; never hardcode them across components.

## Compliance rules (do not relax without the site owner's explicit sign-off)

- `src/config/compliance.ts` holds every regulated fact (NMLS IDs,
  licensing, required disclosures) as `{ status: "confirmed" | "todo" }`.
  Never fill in a `todo` field with an invented value — leave it and let
  the `PendingNotice` component render.
- Contact CTAs must always be real `tel:`/`sms:`/`mailto:` links from
  `src/config/contact.ts`. Never add a contact form or scheduler that
  doesn't have a real backend — see `unconfiguredFeatures` in that file
  for the pattern of honestly labeling not-yet-available features.
- Ask Dawn's personality layer (`src/content/ask-dawn/personality.ts`) is
  always on — there is no toggle — and may only affect greetings, answer
  intros, and escalation hand-offs, via a separate `intro` field. It must
  never modify `approvedAnswer` text from the knowledge base.
- Regulated identity facts (NMLS IDs, real-estate license) live in
  `src/config/compliance.ts` under `compliance.mortgage` and
  `compliance.realEstate`. Impastato Mortgage is Dawn's personal brand,
  not itself a licensed lender/broker — she currently originates through
  Argent Lending LLC. Never state otherwise; see `/licensing-disclosures`.

## Commands

```
npm run dev
npm run build
npm run lint
npm test
```
