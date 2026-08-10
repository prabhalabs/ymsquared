## Context

The site's current brand tokens (`src/style.css`: primary `#2563EB` blue,
secondary `#14B8A6` teal, accent `#22C55E` green, dark background/card/
border) already happen to sit inside the blue→teal→green range the YM²
reference artwork uses for its gradient. No palette change is required —
this is a wordmark/icon/copy rebrand, not a color-system rebrand.

Two reference PNGs were supplied (both 1536×1024, landscape, black
background):
1. A crisp, clean-lined "YM²" wordmark — legible at small sizes, suitable
   as an icon/favicon source.
2. A heavily blurred, glow-only variant of the same mark — reads fine as
   large ambient art, illegible once shrunk to favicon/nav-icon sizes.

Decision (user-confirmed): use image 1 as the single source-of-truth brand
asset; image 2 is not used for this change.

## Goals / Non-Goals

**Goals**
- Replace every visible "MFlow" reference across the site with "YM²" / "YM
  Squared" and the new support email.
- Redesign `/privacy` to match the reference layout while keeping 100% of
  the existing policy content (nothing gets cut for Play Console
  compliance reasons).
- Produce a working, regenerable icon/favicon/OG-image asset pipeline from
  the new source artwork, since none existed as a script before (the
  README describes the derivation but the actual prior derivation was done
  by hand/externally).

**Non-Goals**
- Redesigning `/terms` or `/support` to the new masthead+TOC layout — only
  `/privacy` gets the layout treatment in this change.
- Any palette/typography change — existing tokens and fonts (Inter +
  Manrope) are kept as-is.

*(Originally, renaming the GitHub repository / Vite base path /
`GITHUB_URL` / `package.json` name / `LICENSE` holder was also a
non-goal, deferred pending explicit user sign-off — see "Deployment
identity" under Decisions below for how and why that changed mid-change.)*

## Decisions

### 1. Icon/favicon derivation pipeline (no image CLI available)

No ImageMagick, ffmpeg, or PIL is installed in this environment. Rather
than requiring the user to hand-produce every derived size, add `sharp` as
a temporary devDependency and a one-off Node script
(`scripts/generate-brand-assets.mjs`, deleted or kept at the user's
discretion after running once) that:
1. Reads the 1536×1024 source PNG. It turns out to have an alpha
   channel — what reads as a solid black background in a casual preview
   is actually transparency, not an opaque fill — so every opaque
   derivative is produced via `sharp().flatten({ background: black })`
   first, rather than assuming the source is already flat.
2. Squares the mark via letterbox, not a hard crop: an initial attempt
   used a centered `1024×1024` crop of the `1536×1024` source (on the
   assumption the mark's bounding box, roughly x=270–1310, would fit),
   but the mark is wider than 1024px and the crop clipped both the left
   "Y" tail and the right superscript "2" — confirmed by rendering the
   cropped output. Replaced with `resize(1024, 1024, { fit: 'contain',
   background: black })`, which scales the whole flattened mark down to
   fit the square and pads top/bottom with black, so nothing is cut off.
3. Outputs `src/assets/brand/icon.png` (1024×1024 letterboxed square,
   source of truth), `icon-128.png` (128×128), `public/icon.png`
   (512×512), `public/apple-touch-icon.png` (180×180), `public/
   favicon.ico` (256×256 PNG encoded via `png-to-ico`, a temporary
   devDependency since `sharp` alone doesn't emit `.ico`), and `public/
   og-image.png` (1200×630, same flatten + letterbox treatment on the
   full landscape source, since OG cards are wide, not square).
4. For `logo-light.png`/`logo-dark.png` (full wordmark, used where a
   horizontal lockup reads better than the square mark) — **note the
   naming is the surface's contrast partner, not the wordmark's own ink
   color**, per this repo's pre-existing README convention (`Logo.vue`'s
   `variant` prop follows the same pattern: `'light'` renders on dark
   backgrounds): `logo-light.png` is the flattened (opaque black) full
   source — used on the site's dark surfaces (navbar/footer), where the
   black background blends in. `logo-dark.png` composites the
   *original, alpha-preserving* source (not the flattened one) onto a
   white rounded card — used on light surfaces (e.g. this repo's own
   README on GitHub's white background), letting the transparent space
   between the neon strokes show the white card instead of a black box.
   An initial pass had these two swapped (assumed "light"/"dark" named
   the wordmark's color rather than its target surface); caught and
   fixed by re-reading README.md's existing "Brand assets" section
   before wiring the README image tag in task 3.6.

This keeps asset generation reproducible and scripted rather than a
one-time manual Photoshop-style edit that can't be redone if the source
art changes again.

### 2. Privacy page: merge reference layout with existing content

The reference design's section list (short version, what-the-app-reads
table, SMS/Gmail detail, backups, exports, deletion, children, changes) is
a subset of what's already live. Mapping:

| Reference section | Existing content folded in |
|---|---|
| Masthead + h1 + updated date + intro | New copy, same structure |
| TOC nav | Expanded to list all sections below, not just the reference's 8 |
| "The short version" | Kept as-is (matches existing "Introduction" tone) |
| "What the app reads, and why" (table) | Existing "Information We Collect" (SMS/Gmail/Manual Transactions) content becomes table rows plus explanatory prose below, since the existing copy has more nuance (e.g. the approve/pending-transaction explanation) than a table row can hold |
| "SMS and Gmail permission use" | Existing SMS/Gmail Permission prose, merged in |
| *(new)* "AI processing & approval" | Existing AI Processing section (unlabeled in the reference) added as its own section — not dropped |
| "Backups" | Existing Backup & Restore content |
| "Exports" | **Dropped** — the reference's "reports can be exported as CSV/Excel/PDF" claim is not documented anywhere in this repo (no export feature exists in the current Privacy content, Support FAQ, or marketing-site spec). Adding it would fabricate a product capability in a legal document; not worth the risk of an inaccurate compliance page over matching the reference's section list exactly |
| *(new)* "Data sharing" | Existing Data Sharing section kept as its own section |
| *(new)* "Security" | Existing Security section kept as its own section |
| *(new)* "Data deletion" | Not present verbatim before, but added: since the app has no account/server (already stated elsewhere in the existing copy), removing data means uninstalling the app or clearing storage — this is generic Android OS behavior, not an unverified product-specific claim, so it's safe to state without invented facts |
| "Children's privacy" | Kept |
| "Changes to this policy" | Kept |
| *(new)* "Google API Limited Use Statement" | Kept as its own section — required for Play Console review, not present in the reference and must not be cut |
| Contact box | New styled contact box, new email |
| Footer note | Adjusted wording (no longer references a separate "MFlow source repository"/`docs/PRIVACY_POLICY.md`, since that footer line in the reference doesn't apply to this repo) |

Implementation stays a Vue SFC (not static HTML) — the reference's CSS
custom properties / class structure is ported into `PrivacyPage.vue`
using Tailwind utility classes and the site's existing `RevealSection`
scroll-reveal wrapper per-section (existing spec requirement: sections
must reveal independently, not render blank on load).

### 3. Shared contact-email constant

`contactEmail` is currently duplicated as a literal in three page files.
While updating all three anyway, extract a single
`src/constants/brand.ts` (or similar) exporting `SUPPORT_EMAIL` and the
wordmark strings (`BRAND_NAME = 'YM²'`, `BRAND_FULL_NAME = 'YM Squared —
Your Money Matters'`) so a future rebrand or email change is a one-line
edit. This is a small, low-risk simplification bundled into the same
touch of these files, not a separate effort.

### 3. Deployment identity (resolved mid-change)

Initially treated as a Non-Goal: renaming the actual GitHub repository or
changing the deployed base path carries real breakage risk (stale
bookmarks/backlinks, a live Pages URL that 404s until settings catch up),
so it wasn't folded into a content/branding change without the user's
explicit sign-off. The user provided that sign-off mid-implementation,
naming the real target: `https://github.com/prabhalabs/ymsquared`. Applied:
local `origin` remote, `.github/workflows/deploy.yml`'s `VITE_BASE_PATH`
(`/mflow/` → `/ymsquared/`), `AppFooter.vue`'s `GITHUB_URL`,
`package.json`'s name/description, `LICENSE`'s copyright holder, and every
canonical/OG/twitter/sitemap/robots URL. The GitHub Pages *hosting*
settings themselves (Settings → Pages → Source) are outside this repo and
still need the user's one-time setup on the new repo, per the README's
existing "Automated deploy" instructions.

## Risks / Trade-offs

- **`logo-dark.png` is a composited approximation** (mark on a white
  card) rather than a true recolored variant, since the source artwork's
  neon-gradient strokes have no separate vector/ink-color layer to
  recolor. Visually verified and reads cleanly; a hypothetical
  true light-mode-native asset would need to come from whatever tool
  produced the original reference images.
- **GitHub Pages hosting settings are unverified** — this change updates
  every file that *assumes* `prabhalabs/ymsquared` is live with Pages
  enabled via GitHub Actions, but nothing in this repo can confirm that
  repo/Pages setup actually exists yet. If it doesn't, the site won't be
  reachable at the new URLs until that one-time GitHub-side setup is done.

## Migration Plan

No data migration — static site content/asset change only. The GitHub
Actions deploy workflow's `VITE_BASE_PATH` was updated to match the new
repo name (see Decision 3); no other workflow changes needed.

## Open Questions

- Should `logo-light.png`'s composited light-background treatment be
  revisited once seen live, or is a plain background card acceptable
  long-term? (Flagged in tasks.md for visual sign-off after generation.)
