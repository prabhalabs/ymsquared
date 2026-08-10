## MODIFIED Requirements

### Requirement: Landing page hero
The system SHALL render a landing page at `/` whose hero section displays the
product name "YM²", the full brand name "YM Squared" available in
surrounding copy, a subtitle summarizing the private/AI-assisted/on-device
value proposition, and a "Download on Google Play" call-to-action.

#### Scenario: First paint of the landing page
- **WHEN** a visitor loads `/`
- **THEN** the hero headline "YM²", the tagline, the subtitle copy, and the
  "Download on Google Play" button are all visible above the fold without
  scrolling on a standard desktop viewport

### Requirement: "Why YM²" section
The landing page SHALL present reasons to trust the product: Offline First,
Privacy First, No Ads, No Tracking, AI Learning, Indian Banking Support,
Future Cloud Sync, and No Account Required.

#### Scenario: Trust section renders all reasons
- **WHEN** a visitor scrolls to the "Why YM²" section
- **THEN** all 8 reasons are visible as distinct items

### Requirement: Global navigation
Every page SHALL share a sticky top navigation bar containing the YM² logo
(linking to `/`), links to the Features and Why-YM² sections on the landing
page, links to Privacy (`/privacy`) and Support (`/support`), and a Download
call-to-action button.

#### Scenario: Navbar stays visible while scrolling
- **WHEN** a visitor scrolls down any page
- **THEN** the navigation bar remains fixed to the top of the viewport and
  remains legible over page content

#### Scenario: Navbar link navigates correctly
- **WHEN** a visitor clicks "Privacy" or "Support" in the navbar from any page
- **THEN** the router navigates to `/privacy` or `/support` respectively

### Requirement: Global footer
Every page SHALL share a footer containing the YM² logo, links to Privacy
Policy, Terms, Support, and the project's GitHub repository, plus a copyright
line reading "YM²" and the current year.

#### Scenario: Footer present on every route
- **WHEN** a visitor is on `/`, `/privacy`, `/support`, `/terms`, or an
  unmatched route
- **THEN** the shared footer with all required links is rendered

### Requirement: Privacy Policy page
The system SHALL provide a `/privacy` route with a complete privacy policy
covering: a masthead with the YM² mark, wordmark, and "Privacy Policy"
eyebrow; an introductory "short version" summary; a table-of-contents
navigation linking every section on the page; information collected (SMS
permission, Gmail permission, manual transactions), presented both as a
summary table (data / why it's read / where it goes) and in fuller prose;
AI processing (including what happens to a transaction that isn't
approved); data sharing; security; backups and exports; data deletion;
children's privacy; changes to the policy; the Google API Limited Use
Statement; and a highlighted contact box with a mailto link to the support
address. It SHALL explicitly state that SMS processing happens entirely
on-device, SMS is never uploaded, Gmail access is optional, and that there
are no advertisements, no analytics, no tracking, and no selling of user
data, and that auto-approved transactions remain user-editable. The Manual
Transactions content SHALL confirm that manual entry is supported via a "+"
button on both the Dashboard and the Transactions section, and that this is
the fallback for banks that don't send transaction SMS/email or for users
who decline SMS/Gmail permission. The AI Processing content SHALL explain
what happens to a transaction that isn't approved: it is auto-approved
after a user-configured time period if auto-approve is enabled, and
otherwise sits in the Pending Transactions list until the user reviews it,
with nothing applied to budgets or reports before approval. The page SHALL
display a "Last updated" date. Each policy section SHALL reveal
independently as the visitor scrolls to it, so the page is never blank on
initial load while content further down has not yet entered the viewport.

#### Scenario: Visitor reads the privacy policy
- **WHEN** a visitor navigates to `/privacy`
- **THEN** all listed sections are present and the on-device SMS processing,
  no-tracking, and no-data-selling statements are visible in the text

#### Scenario: Visitor asks about manual transactions
- **WHEN** a visitor reads the Manual Transactions content
- **THEN** it confirms manual transaction entry is supported via a "+"
  button on the Dashboard and the Transactions section, for use when SMS/
  email isn't available or SMS/Gmail permission isn't granted

#### Scenario: Visitor asks what happens without approval
- **WHEN** a visitor reads the AI Processing content
- **THEN** it explains that a transaction is either auto-approved after a
  configured time period, or — if auto-approve is off — remains in Pending
  Transactions until manually approved

#### Scenario: First paint of the privacy policy page
- **WHEN** a visitor loads `/privacy` without scrolling
- **THEN** the masthead, heading, "Last updated" date, and intro section are
  visible immediately, not blank, and each subsequent section becomes
  visible as the visitor scrolls to it rather than all at once partway down
  the page

#### Scenario: Visitor uses the table of contents
- **WHEN** a visitor clicks a table-of-contents entry near the top of the
  page
- **THEN** the page scrolls to the corresponding section

### Requirement: Support page
The system SHALL provide a `/support` route containing a FAQ covering
permissions, manual transactions, backup, restore, SMS detection, transaction
approval, and Gmail sync, plus a visible contact email address for support
requests. The manual transactions entry SHALL confirm that a "+" button on
both the Dashboard and the Transactions section creates a manual transaction,
for use when SMS/email isn't available or SMS/Gmail permission isn't
granted. The transaction approval entry SHALL explain that a transaction is
either auto-approved after a user-configured time period, or — if
auto-approve is off — remains in Pending Transactions until manually
approved.

#### Scenario: Visitor looks for help
- **WHEN** a visitor navigates to `/support`
- **THEN** the FAQ entries for permissions, manual transactions, backup,
  restore, SMS detection, transaction approval, and Gmail sync are visible,
  and a contact email is displayed as a mailto link

### Requirement: Terms of Service page
The system SHALL provide a `/terms` route containing standard terms of use:
disclaimer, license, user responsibilities, no-warranty statement, and
limitation of liability, branded as YM².

#### Scenario: Visitor reads the terms
- **WHEN** a visitor navigates to `/terms`
- **THEN** all five required sections are present in the rendered content

## ADDED Requirements

### Requirement: Support contact address
Every page offering a support contact (Privacy, Support, Terms) SHALL use
`support.ymsquared@gmail.com` as the contact email.

#### Scenario: Visitor emails support from any legal/support page
- **WHEN** a visitor clicks the contact email link on `/privacy`,
  `/support`, or `/terms`
- **THEN** the mailto link addresses `support.ymsquared@gmail.com`
