## Why

The product is being rebranded from "MFlow" to "YM²" (YM SQUARED — full form
"Your Money Matters"). The immediate trigger is the Privacy Policy page,
which needs updated content, a refreshed layout (based on a reference design
already produced for Play Console review), a new support contact address,
and today's revision date — but "MFlow" is the site's name everywhere
(navbar, footer, hero, every page's SEO metadata, the logo component, the
support/terms pages), so a Privacy-Policy-only edit would immediately look
inconsistent with the rest of the site. This change rebrands the whole
`mflow-web` marketing site to YM², using the Privacy Policy page as the
first fully-realized page under the new brand.

Note: the `openspec` CLI is not installed in this environment (checked via
`command -v openspec` and `npx openspec@latest --version`, neither
resolves), so this change's artifacts were hand-authored following the
file/delta-spec format already established by
`openspec/changes/archive/2026-08-08-mflow-marketing-site/` and
`openspec/changes/archive/2026-08-08-landing-page-launch-polish/`.

## What Changes

- **New brand identity**: "YM²" (rendered as YM with a superscript 2) as
  the primary compact wordmark used in the navbar, footer, and favicon alt
  text; "YM Squared" or "YM Squared — Your Money Matters" used in prose,
  taglines, and meta descriptions where the fuller form reads better.
  "MFlow" is removed from every page's visible copy, `<title>`/meta tags,
  alt text, and code identifiers it appears in (see Impact).
- **New brand assets**: the two user-supplied reference images (crisp
  line-art "YM²" wordmark vs. a heavily blurred glow-only variant) are
  evaluated and the crisp one is adopted as the new
  `src/assets/brand/icon.png` source of truth, replacing the current
  MFlow "M" icon/wordmark PNGs. Every derived asset the README documents
  (`icon-128.png`, `logo-light.png`, `logo-dark.png`, and the `public/`
  favicon/apple-touch-icon/og-image set) is regenerated from it.
- **New support email**: `support.ymsquared@gmail.com` replaces
  `support.mflow@gmail.com` everywhere it's used (Privacy, Support, Terms
  pages).
- **Privacy Policy page redesign** (`src/pages/PrivacyPage.vue`): adopts
  the visual layout of a reference design already built for this
  rebrand — masthead (mark + wordmark + "Privacy Policy" eyebrow), a
  "Last updated" date line (10 August 2026), an intro paragraph, a
  two-column table-of-contents nav, a highlighted contact box, and a
  footer note — while **keeping every existing content section** (SMS/
  Gmail/manual-transaction detail, AI processing and the
  approve-vs-pending-transaction explanation, data sharing, security,
  backup & restore, and the Google API Limited Use Statement required for
  Play Console review). Nothing from the current policy is dropped; it is
  reorganized into the new layout and rebranded.
- **Terms and Support pages**: lightweight rebrand only (wordmark, contact
  email, date) — they keep their current layout, since the user's request
  was specifically about the Privacy page's visual redesign.
- **GitHub Pages deployment identity — resolved mid-change**: this was
  initially scoped out (see "Deployment identity" in design.md for the
  original reasoning), pending the user's explicit sign-off on where the
  live repo/site actually lives. The user confirmed the real target
  during implementation: `https://github.com/prabhalabs/ymsquared`. This
  change now also updates: the local `origin` git remote, the Vite `base`
  (`/mflow/` → `/ymsquared/`) and its GitHub Actions `VITE_BASE_PATH`,
  `AppFooter.vue`'s `GITHUB_URL`, `package.json`'s package name
  (`mflow-web` → `ymsquared-web`) and description, `LICENSE`'s copyright
  holder (`mflowapp` → `prabhalabs`), and every canonical/OG/sitemap/
  robots URL that pointed at `mflowapp.github.io/mflow`.

## Capabilities

### Modified Capabilities
- `marketing-site`: every page-content requirement that names "MFlow" is
  reworded to "YM²" / "YM Squared", the Privacy Policy requirement is
  updated for the new layout (masthead/TOC/contact-box structure) while
  retaining all existing content obligations, and the support/contact
  email requirement changes address.
- `brand-design-system`: the brand asset requirement now points at the new
  YM² icon/wordmark source and derived files instead of the MFlow ones.
- `site-deployment`: the GitHub Pages base-path requirement and the
  client-side-routing scenario's brand reference now describe the
  `prabhalabs/ymsquared` deployment instead of `mflowapp/mflow`.

## Impact

- **Affected code**: `index.html`, `README.md`, `public/404.html`,
  `public/sitemap.xml`, `public/robots.txt`,
  `src/composables/useSeoMeta.ts`, `src/pages/HomePage.vue`,
  `src/components/NavBar.vue`, `src/components/AppFooter.vue`,
  `src/components/Logo.vue`, `src/pages/PrivacyPage.vue`,
  `src/pages/SupportPage.vue`, `src/pages/TermsPage.vue`,
  `src/assets/brand/*`, `public/*.png`, `public/favicon.ico`,
  `.github/workflows/deploy.yml`, `package.json`, `package-lock.json`,
  `LICENSE`, and the local `origin` git remote.
- **Dependencies added (dev, temporary)**: an image-processing package
  (`sharp`, used via a one-off Node script) to crop/resize the new source
  artwork into the required square icon/favicon/OG-image derivatives — no
  image tooling (ImageMagick/ffmpeg/PIL) is available in this environment.
  It is a devDependency only; nothing ships it to the built site.
- **Not affected**: GitHub's own Pages hosting configuration (Settings →
  Pages → Source) on the `prabhalabs/ymsquared` repo — that's a one-time
  setup step outside this repo, not something this change can perform;
  see "GitHub Pages deployment identity" above.
- **No backend/API impact** — fully static site, no server-side code.
