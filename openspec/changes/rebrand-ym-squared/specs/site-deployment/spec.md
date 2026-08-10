## MODIFIED Requirements

### Requirement: Client-side routing works on Pages
The system SHALL ensure that directly loading or refreshing a deep route
(e.g. `/privacy`) on GitHub Pages does not produce a raw 404 from the host,
by providing an appropriate fallback (e.g. a `404.html` redirect strategy
compatible with GitHub Pages' static hosting model).

#### Scenario: Hard refresh on a deep route
- **WHEN** a visitor directly requests `/privacy` on the deployed GitHub
  Pages site (not via in-app navigation)
- **THEN** the YM² Privacy Policy page is displayed rather than GitHub's
  generic 404 page

### Requirement: GitHub Pages-compatible build
The system SHALL produce a static build whose asset URLs resolve correctly
when the site is served from a GitHub Pages project path (a non-root base
path), via a configurable Vite `base` setting, currently `/ymsquared/` to
match the `prabhalabs/ymsquared` repository.

#### Scenario: Built assets resolve under a subpath
- **WHEN** the site is built with the GitHub Pages project base path
  configured and served from that subpath
- **THEN** all CSS, JS, and image assets load successfully (no 404s caused
  by absolute root-relative paths)
