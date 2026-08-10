## 1. Brand asset generation pipeline

- [x] 1.1 Add `sharp` and `png-to-ico` as temporary devDependencies
      (`npm install -D sharp png-to-ico`)
- [x] 1.2 Write `scripts/generate-brand-assets.mjs`: reads
      `C:\Users\bhanu\Downloads\ChatGPT Image Aug 10, 2026, 02_09_08 AM.png`
      as the source, flattens its alpha onto opaque black, then
      letterboxes (not hard-crops — see design.md for why) the mark into
      a 1024×1024 square for the icon, and the full 1536×1024 source for
      the OG image
- [x] 1.3 Generate `src/assets/brand/icon.png` (1024×1024 letterboxed
      square, source of truth) and `src/assets/brand/icon-128.png`
      (128×128)
- [x] 1.4 Generate `src/assets/brand/logo-light.png` (full landscape
      wordmark, flattened onto opaque black — per this repo's naming
      convention, "light" names the variant used ON dark surfaces, e.g.
      navbar/footer, not the wordmark's own color)
- [x] 1.5 Generate `src/assets/brand/logo-dark.png` (original
      alpha-preserving artwork composited onto a white rounded card —
      the variant used on light surfaces, e.g. the README; visually
      verified. An initial pass had these two swapped — caught before
      wiring the README image tag by re-reading README.md's existing
      "Brand assets" section, see design.md)
- [x] 1.6 Generate `public/icon.png`, `public/apple-touch-icon.png`
      (180×180), `public/favicon.ico` (via `png-to-ico` from a 256×256
      PNG), and `public/og-image.png` (1200×630) from the square/landscape
      sources per the README's documented derivation list
- [x] 1.7 Copy the regenerated `logo-dark.png`/`logo-light.png` into
      `public/brand/` too, matching the existing duplication pattern
- [x] 1.8 Run the script once, spot-check every generated file opens
      correctly and isn't corrupted/empty (all verified by rendering),
      then remove `sharp`/`png-to-ico` from devDependencies (kept the
      script itself for future regeneration, per the README's existing
      convention)

## 2. Shared brand constants

- [x] 2.1 Add `src/constants/brand.ts` exporting `BRAND_NAME = 'YM²'`,
      `BRAND_FULL_NAME = 'YM Squared — Your Money Matters'`, and
      `SUPPORT_EMAIL = 'support.ymsquared@gmail.com'`
- [x] 2.2 Update `src/components/Logo.vue` to use `BRAND_NAME` for the
      visible wordmark text and alt text (already imported the
      `icon-128.png` asset, now regenerated with the YM² mark by task 1;
      no import path change needed)

## 3. Site-wide copy and metadata (MFlow → YM²)

- [x] 3.1 `index.html`: `<title>`, meta description, `og:site_name`,
      `og:title`, `twitter:title` updated to YM²; canonical/`og:image`/
      `og:url`/`twitter:image` URLs updated to the new deployment domain
      by task 6 once the user confirmed it mid-change
- [x] 3.2 `src/composables/useSeoMeta.ts`: `SITE_NAME` now imports
      `BRAND_NAME` from `src/constants/brand.ts`; `SITE_URL` updated by
      task 6
- [x] 3.3 `src/pages/HomePage.vue`: hero `<h1>`, SEO title/description,
      "Why MFlow" section id (`#why-mflow` → `#why-ym2`) + eyebrow +
      heading copy → "Why YM²", CTA copy — all "MFlow" occurrences
      replaced (verified via grep, zero remaining)
- [x] 3.4 `src/components/NavBar.vue`: "Why MFlow" nav label/hash →
      "Why YM²" / `#why-ym2`, `aria-label="MFlow home"` →
      `aria-label="YM² home"`
- [x] 3.5 `src/components/AppFooter.vue`: nav label/hash, copyright line
      (`&copy; {{ year }} YM². All rights reserved.`) — `GITHUB_URL`
      updated by task 6
- [x] 3.6 `README.md`: header image alt text, tagline, brand-assets
      section rewritten for the swapped `logo-light`/`logo-dark` meaning
      (see design.md), openspec reference updated to point at both the
      archived build and this rebrand change. Project-tree label,
      `VITE_BASE_PATH` mentions, and the live-site link updated by task 6
      once `package.json`'s name was also renamed (kept in sync — an
      illustration that didn't match the real package name would be
      worse than not touching it at all)
- [x] 3.7 `public/404.html`: `<title>` updated to YM²; the path-segment
      comment updated to the new `/ymsquared` segment by task 6
- [x] 3.8 `public/sitemap.xml`, `public/robots.txt`: updated to the new
      deployment domain by task 6

## 4. Privacy Policy page redesign

- [x] 4.1 Rebuilt `src/pages/PrivacyPage.vue`'s template structure per
      design.md's section-mapping table: masthead (`Logo` mark + "YM²" +
      "Privacy Policy" eyebrow), h1 "How YM² handles your data",
      `lastUpdated = '10 August 2026'`, intro paragraph, two-column TOC
      nav (15 sections) with a `scrollToSection` click handler using the
      existing `scrollToElement` smooth-scroll composable (existing
      brand-design-system spec requirement: same-page anchors must not
      rely on native `scroll-behavior`)
- [x] 4.2 Rewrote "The short version" section (from existing
      Introduction, plus the no-account/no-server framing)
- [x] 4.3 Built the "What the app reads, and why" table (SMS / Gmail /
      manual entries rows) plus the fuller "SMS and Gmail permission use"
      prose section below it, preserving existing detail (permission
      toggle behavior, revocation instructions, on-device-only storage).
      **Deviation**: did not add a "logger redacts account numbers/UPI
      IDs" claim — that line only existed in the reference frame, not in
      this repo's current content or anywhere else in this codebase;
      adding an unverified technical claim to a legal document was judged
      riskier than matching the reference exactly (same reasoning as
      dropping "Exports", see design.md)
- [x] 4.4 Kept "AI processing & approval" as its own section, preserving
      the existing approve-vs-pending-transaction explanation verbatim in
      substance
- [x] 4.5 Kept "Data sharing" and "Security" as their own sections
      (existing content, rebranded copy only)
- [x] 4.6 Rewrote "Backups" (from Backup & Restore). Did **not** add an
      "Exports" section — see design.md's section-mapping table for why
      (unverified product claim, not present anywhere in this repo)
- [x] 4.7 Rewrote "Data deletion" (new, but stating only generic Android
      OS behavior — see design.md), "Children's privacy", and "Changes to
      this policy" sections
- [x] 4.8 Kept "Google API Limited Use Statement" as its own section,
      unchanged in substance (Play Console compliance — not cut)
- [x] 4.9 Built the highlighted contact box using `SUPPORT_EMAIL` from
      `src/constants/brand.ts`
- [x] 4.10 Rewrote the footer note — dropped the reference's "mirrors
      docs/PRIVACY_POLICY.md in the MFlow source repository" claim
      entirely, since no such doc exists anywhere in this repo (verified
      via `find`); now states this page is simply the canonical policy,
      published for Play Console review
- [x] 4.11 Every section wrapped in the existing `RevealSection`
      component, `scroll-mt-28` added to each `h2` so the smooth-scroll
      TOC lands below the fixed navbar instead of underneath it
- [x] 4.12 Updated `useSeoMeta` call: title unchanged, description
      reworded to YM², path stays `/privacy`
- [x] 4.13 Verified zero "MFlow" occurrences remain in the file (`grep`)

## 5. Terms and Support pages (lightweight rebrand)

- [x] 5.1 `src/pages/TermsPage.vue`: replaced the local `contactEmail`
      const with the shared `SUPPORT_EMAIL` import, replaced every "MFlow"
      body-copy reference with "YM²", updated `lastUpdated` to
      `'10 August 2026'`
- [x] 5.2 `src/pages/SupportPage.vue`: replaced `contactEmail` with
      `SUPPORT_EMAIL`, replaced "MFlow" references in SEO meta and all 8
      FAQ question/answer entries with "YM²" — FAQ content/order itself
      unchanged (only brand references within the text)

## 6. Deployment identity (resolved mid-change — user confirmed the new repo)

- [x] 6.1 User confirmed the real target repo:
      `https://github.com/prabhalabs/ymsquared`. Updated the local
      `origin` git remote to match
- [x] 6.2 `.github/workflows/deploy.yml`: `VITE_BASE_PATH` `/mflow/` →
      `/ymsquared/`
- [x] 6.3 `AppFooter.vue`'s `GITHUB_URL` → `https://github.com/prabhalabs/ymsquared`
- [x] 6.4 `package.json`: `"name"` `mflow-web` → `ymsquared-web`,
      description updated; `package-lock.json` resynced via `npm install`
- [x] 6.5 `LICENSE`: copyright holder `mflowapp` → `prabhalabs`
- [x] 6.6 `public/sitemap.xml`, `public/robots.txt`,
      `useSeoMeta.ts`'s `SITE_URL`, and the canonical/`og:url`/`og:image`/
      `twitter:image` tags in `index.html` updated to
      `prabhalabs.github.io/ymsquared`
- [x] 6.7 `README.md`: live-site link, `VITE_BASE_PATH` mentions, and the
      project-tree label updated to match (no longer inconsistent with
      `package.json`'s name, now that it's also renamed)
- [ ] 6.8 **Still needs the user** — the GitHub Pages hosting setup
      itself (Settings → Pages → Source: GitHub Actions) on the
      `prabhalabs/ymsquared` repo is outside this repo/session and hasn't
      been verified; without it the site won't be reachable at the new
      URLs even though every file now points at them

## 7. OpenSpec spec sync

- [x] 7.1 Hand-applied the delta specs in this change's `specs/` folder
      (CLI unavailable) onto `openspec/specs/marketing-site/spec.md`,
      `openspec/specs/brand-design-system/spec.md`, and
      `openspec/specs/site-deployment/spec.md` (added mid-change once the
      deployment identity was resolved — see design.md Decision 3)
- [x] 7.2 Updated `openspec/config.yaml`'s project context (brand name,
      asset paths/convention, repo URL, feature/reason counts) so future
      AI-authored changes in this repo start from accurate context instead
      of the stale MFlow-era description

## 8. Verification

- [ ] 8.1 `npm run build` (type-check + production build) passes with no
      errors
- [ ] 8.2 `npm run dev`, visually check `/`, `/privacy`, `/support`,
      `/terms`, and an unknown route in a browser: no remaining visible
      "MFlow" text anywhere, favicon/nav logo show the new mark, contact
      links use the new email
- [ ] 8.3 Confirm the Privacy Policy page still contains every content
      obligation from the current `marketing-site` spec (AI processing,
      manual transactions, data sharing, security, Google API Limited Use
      Statement) — nothing silently dropped during the layout rewrite
