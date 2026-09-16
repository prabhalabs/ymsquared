<script setup lang="ts">
import { useSeoMeta } from '@/composables/useSeoMeta'
import { scrollToElement } from '@/composables/useSmoothScroll'
import RevealSection from '@/components/RevealSection.vue'
import { SUPPORT_EMAIL } from '@/constants/brand'

useSeoMeta({
  title: 'Privacy Policy',
  description:
    'How YM² handles SMS and manual transaction data — processed entirely on-device, never uploaded, never sold, never used for ads or tracking.',
  path: '/privacy',
})

const lastUpdated = '17 September 2026'

const sections = [
  { id: 'short-version', label: 'The short version' },
  { id: 'what-we-collect', label: 'What the app reads, and why' },
  { id: 'sms-permission', label: 'SMS permission use' },
  { id: 'categorization', label: 'Categorization & approval' },
  { id: 'data-use', label: 'How data is used' },
  { id: 'offline-storage', label: 'Offline storage' },
  { id: 'internet-usage', label: 'Internet usage' },
  { id: 'data-sharing', label: 'Data sharing' },
  { id: 'security', label: 'Security' },
  { id: 'backups', label: 'Backups' },
  { id: 'data-deletion', label: 'Data deletion' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'children-privacy', label: "Children's privacy" },
  { id: 'changes', label: 'Changes to this policy' },
]

function scrollToSection(event: MouseEvent) {
  const anchor = event.currentTarget as HTMLAnchorElement
  const id = anchor.getAttribute('href')?.slice(1)
  const el = id ? document.getElementById(id) : null
  if (!el) return
  event.preventDefault()
  scrollToElement(el)
}
</script>

<template>
  <div class="px-4 py-16 sm:px-6 lg:px-8">
    <RevealSection class="mx-auto max-w-3xl">
      <p class="font-display text-sm font-semibold uppercase tracking-widest text-secondary">
        Privacy Policy
      </p>

      <h1 class="mt-3 font-display text-4xl font-extrabold text-ink">
        How YM² handles your data
      </h1>
      <p class="mt-3 text-sm text-muted-dim">Last updated {{ lastUpdated }}</p>

      <p class="mt-6 max-w-2xl border-b border-border pb-8 leading-relaxed text-muted">
        This policy describes how the YM² Android app handles data — written to match what the
        app's code actually does, not boilerplate. If a future version changes what the app reads
        or where data goes, this page is updated before that change ships.
      </p>
    </RevealSection>

    <RevealSection class="mx-auto mt-8 max-w-3xl">
      <nav aria-label="Sections" class="rounded-2xl border border-border bg-card/40 p-6">
        <span class="text-xs font-semibold uppercase tracking-widest text-muted-dim">
          On this page
        </span>
        <ol class="mt-3 grid list-decimal gap-x-8 gap-y-2 pl-5 text-sm sm:grid-cols-2">
          <li v-for="section in sections" :key="section.id">
            <a
              :href="`#${section.id}`"
              class="text-ink/80 transition-colors hover:text-ink"
              @click="scrollToSection"
            >
              {{ section.label }}
            </a>
          </li>
        </ol>
      </nav>
    </RevealSection>

    <div class="prose-legal mx-auto mt-10 max-w-3xl space-y-10 text-ink/80">
      <RevealSection as="section" aria-labelledby="short-version">
        <h2 id="short-version" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          The short version
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² ("we", "our", "the app") is a personal finance manager for Android built around a
          simple principle: your financial data belongs to you. YM² has no backend server and no
          user account — every transaction, account, category, and budget lives in an encrypted
          database stored locally on your device, inside the app's private storage. We do not
          operate any server that your financial data is sent to, and we do not sell, rent, or
          share your data with advertisers or data brokers — there is nothing on our end
          collecting it to begin with.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="what-we-collect">
        <h2 id="what-we-collect" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          What the app reads, and why
        </h2>
        <div class="mt-4 overflow-x-auto rounded-xl border border-border">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr class="border-b border-border text-xs uppercase tracking-wider text-muted-dim">
                <th class="px-4 py-3 font-semibold">Data</th>
                <th class="px-4 py-3 font-semibold">Why the app reads it</th>
                <th class="px-4 py-3 font-semibold">Where it goes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr>
                <td class="px-4 py-3 align-top">
                  SMS inbox
                  <div class="text-xs text-muted-dim">(with your permission)</div>
                </td>
                <td class="px-4 py-3 align-top">
                  To detect bank/UPI transaction alerts, from 18 supported Indian banks, and turn
                  them into transaction records
                </td>
                <td class="px-4 py-3 align-top">
                  Stays on your device, in the app's local database. Never transmitted anywhere.
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 align-top">Manual entries</td>
                <td class="px-4 py-3 align-top">
                  Transactions you add yourself via the "+" button, for banks not yet supported,
                  or if you decline SMS permission entirely
                </td>
                <td class="px-4 py-3 align-top">
                  Stored the same way as SMS-sourced transactions — on-device only
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 leading-relaxed">
          YM² does not collect analytics, does not use crash-reporting or advertising SDKs, and
          does not track you across other apps or websites.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="sms-permission">
        <h2 id="sms-permission" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          SMS permission use, in plain terms
        </h2>
        <p class="mt-3 leading-relaxed">
          If you grant SMS permission, YM² reads transaction-related SMS messages (from banks and
          card issuers) to detect and log transactions automatically.
          <strong class="text-ink">SMS processing happens entirely on your device.</strong>
          Message content is parsed locally to extract amount, merchant, and account details — the
          raw SMS text is never uploaded to any server, ever.
        </p>
        <p class="mt-3 leading-relaxed">
          <strong class="text-ink">Does YM² support adding transactions manually? Yes.</strong>
          A "+" button is available from the Activity tab to create a manual transaction at any
          time — for a bank that doesn't send transaction SMS, or if you'd simply rather not grant
          SMS permission at all. YM² works fully on manual entry alone.
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            SMS is read only after you turn on "Enable SMS import" in Settings — never
            automatically, never at install time.
          </li>
          <li>You can revoke SMS permission at any time from Android's own app permission settings.</li>
          <li>
            Any transaction you enter manually is stored using the same on-device, encrypted
            storage as SMS-sourced transactions.
          </li>
        </ul>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="categorization">
        <h2 id="categorization" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Categorization &amp; approval
        </h2>
        <p class="mt-3 leading-relaxed">
          Categorization runs entirely on-device, using a rule-based engine and a local keyword
          matcher — no transaction content is ever sent to a remote server as part of this
          processing. Transactions that are automatically categorized
          <strong class="text-ink">always remain visible and editable</strong> in Activity →
          Pending — automation never locks you out of correcting a transaction. Corrections you
          confirm can become a rule YM² applies next time; nothing is learned without your explicit
          confirmation.
        </p>
        <p class="mt-3 leading-relaxed">
          <strong class="text-ink">What happens if I don't approve a transaction?</strong> You
          can turn on auto-approve in Settings so detected transactions are approved by themselves
          after a time period you choose. If you leave auto-approve off, nothing is applied to
          your budgets or reports automatically — every detected transaction simply sits in
          Activity → Pending until you review and approve it yourself.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="data-use">
        <h2 id="data-use" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          How data is used
        </h2>
        <p class="mt-3 leading-relaxed">
          Data extracted from SMS or manual entry is used exclusively to power the features you
          see in the app: transaction lists, budgets, goals, reserves, bill tracking, and reports.
          It is never used to build an advertising profile, because YM² shows no advertisements.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="offline-storage">
        <h2 id="offline-storage" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Offline storage
        </h2>
        <p class="mt-3 leading-relaxed">
          Your transactions, budgets, and settings are stored in an encrypted local database on
          your device. YM² is designed offline-first — the app functions fully without an
          internet connection.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="internet-usage">
        <h2 id="internet-usage" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Internet usage
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² makes no network calls anywhere in its live feature set. SMS parsing, categorization,
          and every calculation the app shows you run entirely on-device, with or without an
          internet connection.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="data-sharing">
        <h2 id="data-sharing" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Data sharing
        </h2>
        <p class="mt-3 leading-relaxed">
          <strong class="text-ink">We do not sell user data.</strong> YM² contains no
          advertising SDKs, no analytics SDKs, and no third-party trackers. We do not share your
          financial data with advertisers, data brokers, or any other third party.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="security">
        <h2 id="security" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Security
        </h2>
        <p class="mt-3 leading-relaxed">
          Your live database is encrypted at rest under a random key held in the Android Keystore,
          separate from your backup encryption. Encrypted backups use AES-256-GCM under a
          passphrase only you know, derived with PBKDF2 (210,000 rounds).
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="backups">
        <h2 id="backups" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Backups
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² supports creating an encrypted backup file that you control and store yourself, and
          restoring from it on any device running YM². Backups are never uploaded automatically —
          if you choose to move or share a backup file yourself (for example, using Android's
          share sheet to save it to cloud storage), that transfer is your own action, governed by
          whatever service you send it to, not by YM².
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="data-deletion">
        <h2 id="data-deletion" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Data deletion
        </h2>
        <p class="mt-3 leading-relaxed">
          Because there is no account and no server-side copy of your data, there is nothing for
          us to delete on your behalf — your data only ever exists on your device (and in any
          backup file you've created yourself). To remove all app data, uninstall the app, or use
          Android's own <strong class="text-ink">Settings → Apps → YM² → Storage → Clear
          storage</strong>.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="permissions">
        <h2 id="permissions" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Permissions
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² requests only the Android permissions required for the features you use: SMS
          (transaction detection), notifications (budget and reminder alerts), and storage
          (backups). Every permission can be revoked from Android Settings at any time; core app
          functionality degrades gracefully rather than breaking.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="children-privacy">
        <h2 id="children-privacy" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Children's privacy
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² is not directed at children under 13, and we do not knowingly collect information
          from children under 13.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="changes">
        <h2 id="changes" class="scroll-mt-28 font-display text-xl font-bold text-ink">
          Changes to this policy
        </h2>
        <p class="mt-3 leading-relaxed">
          We may update this Privacy Policy from time to time. Material changes will be reflected
          by updating the "Last updated" date above.
        </p>
      </RevealSection>

      <RevealSection
        as="section"
        aria-labelledby="contact"
        class="rounded-2xl border border-border bg-primary/10 p-6"
      >
        <h2 id="contact" class="font-display text-xl font-bold text-ink">Contact</h2>
        <p class="mt-3 leading-relaxed">
          Questions about this policy? Email
          <a
            :href="`mailto:${SUPPORT_EMAIL}`"
            class="font-semibold text-primary underline underline-offset-2 hover:text-secondary"
            >{{ SUPPORT_EMAIL }}</a
          >.
        </p>
      </RevealSection>
    </div>
  </div>
</template>
