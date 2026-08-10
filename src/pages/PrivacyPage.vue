<script setup lang="ts">
import { useSeoMeta } from '@/composables/useSeoMeta'
import { scrollToElement } from '@/composables/useSmoothScroll'
import RevealSection from '@/components/RevealSection.vue'
import Logo from '@/components/Logo.vue'
import { SUPPORT_EMAIL } from '@/constants/brand'

useSeoMeta({
  title: 'Privacy Policy',
  description:
    'How YM² handles SMS, Gmail, and manual transaction data — processed entirely on-device, never uploaded, never sold, never used for ads or tracking.',
  path: '/privacy',
})

const lastUpdated = '10 August 2026'

const sections = [
  { id: 'short-version', label: 'The short version' },
  { id: 'what-we-collect', label: 'What the app reads, and why' },
  { id: 'sms-gmail', label: 'SMS and Gmail permission use' },
  { id: 'ai-processing', label: 'AI processing & approval' },
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
  { id: 'google-api', label: 'Google API Limited Use Statement' },
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
      <header class="flex items-center gap-3">
        <Logo :size="44" :showWordmark="false" />
        <div>
          <div class="font-display text-base font-bold text-white">YM²</div>
          <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Privacy Policy
          </p>
        </div>
      </header>

      <h1 class="mt-6 font-display text-4xl font-extrabold text-white">
        How YM² handles your data
      </h1>
      <p class="mt-3 text-sm text-slate-500">Last updated {{ lastUpdated }}</p>

      <p class="mt-6 max-w-2xl border-b border-border pb-8 leading-relaxed text-slate-400">
        This policy describes how the YM² Android app handles data — written to match what the
        app's code actually does, not boilerplate. If a future version changes what the app reads
        or where data goes, this page is updated before that change ships.
      </p>
    </RevealSection>

    <RevealSection class="mx-auto mt-8 max-w-3xl">
      <nav aria-label="Sections" class="rounded-2xl border border-border bg-card/40 p-6">
        <span class="text-xs font-semibold uppercase tracking-widest text-slate-500">
          On this page
        </span>
        <ol class="mt-3 grid list-decimal gap-x-8 gap-y-2 pl-5 text-sm sm:grid-cols-2">
          <li v-for="section in sections" :key="section.id">
            <a
              :href="`#${section.id}`"
              class="text-slate-300 transition-colors hover:text-white"
              @click="scrollToSection"
            >
              {{ section.label }}
            </a>
          </li>
        </ol>
      </nav>
    </RevealSection>

    <div class="prose-legal mx-auto mt-10 max-w-3xl space-y-10 text-slate-300">
      <RevealSection as="section" aria-labelledby="short-version">
        <h2 id="short-version" class="scroll-mt-28 font-display text-xl font-bold text-white">
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
        <h2 id="what-we-collect" class="scroll-mt-28 font-display text-xl font-bold text-white">
          What the app reads, and why
        </h2>
        <div class="mt-4 overflow-x-auto rounded-xl border border-border">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr class="border-b border-border text-xs uppercase tracking-wider text-slate-500">
                <th class="px-4 py-3 font-semibold">Data</th>
                <th class="px-4 py-3 font-semibold">Why the app reads it</th>
                <th class="px-4 py-3 font-semibold">Where it goes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr>
                <td class="px-4 py-3 align-top">
                  SMS inbox
                  <div class="text-xs text-slate-500">(with your permission)</div>
                </td>
                <td class="px-4 py-3 align-top">
                  To detect bank/UPI transaction alerts and turn them into transaction records
                </td>
                <td class="px-4 py-3 align-top">
                  Stays on your device, in the app's local database. Never transmitted anywhere.
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 align-top">
                  Gmail
                  <div class="text-xs text-slate-500">(only if you explicitly connect it)</div>
                </td>
                <td class="px-4 py-3 align-top">
                  To detect bank transaction confirmation emails, the same way SMS is used
                </td>
                <td class="px-4 py-3 align-top">
                  Read via Google's own Gmail API over an encrypted connection, directly from your
                  device to Google — YM²'s developer never receives or stores a copy
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 align-top">Manual entries</td>
                <td class="px-4 py-3 align-top">
                  Transactions you add yourself via the "+" button, for banks that don't send SMS/
                  email, or if you decline SMS/Gmail permission entirely
                </td>
                <td class="px-4 py-3 align-top">
                  Stored the same way as SMS/Gmail-sourced transactions — on-device only
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

      <RevealSection as="section" aria-labelledby="sms-gmail">
        <h2 id="sms-gmail" class="scroll-mt-28 font-display text-xl font-bold text-white">
          SMS and Gmail permission use, in plain terms
        </h2>
        <p class="mt-3 leading-relaxed">
          If you grant SMS permission, YM² reads transaction-related SMS messages (from banks and
          card issuers) to detect and log transactions automatically.
          <strong class="text-white">SMS processing happens entirely on your device.</strong>
          Message content is parsed locally to extract amount, merchant, and account details — the
          raw SMS text is never uploaded to any server, ever.
        </p>
        <p class="mt-3 leading-relaxed">
          Gmail access is <strong class="text-white">entirely optional</strong>. If you choose to
          connect Gmail, YM² scans transaction-related emails (e.g. payment receipts) to fill in
          gaps SMS parsing can't catch, using <strong class="text-white">read-only</strong> access
          via Google's own sign-in consent screen. You can decline this permission and use YM²
          fully without it.
        </p>
        <p class="mt-3 leading-relaxed">
          <strong class="text-white">Does YM² support adding transactions manually? Yes.</strong>
          A "+" button is available on both the Dashboard and the Transactions section to create a
          manual transaction at any time — for a bank that doesn't send transaction SMS or email,
          or if you'd simply rather not grant SMS or Gmail permission at all. YM² works fully on
          manual entry alone.
        </p>
        <ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            SMS is read only after you turn on "Enable SMS import" in Settings — never
            automatically, never at install time.
          </li>
          <li>
            You can revoke either permission at any time: turn the SMS toggle off, or disconnect
            Gmail access from your Google Account's
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary underline underline-offset-2 hover:text-secondary"
              >connected apps settings</a
            >.
          </li>
          <li>
            Any transaction you enter manually is stored using the same on-device, encrypted
            storage as SMS- and Gmail-sourced transactions.
          </li>
        </ul>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="ai-processing">
        <h2 id="ai-processing" class="scroll-mt-28 font-display text-xl font-bold text-white">
          AI processing &amp; approval
        </h2>
        <p class="mt-3 leading-relaxed">
          Categorization and merchant-learning models run on-device. No transaction content is
          sent to a remote AI service as part of this processing. Transactions that are
          automatically categorized and approved by YM²'s AI
          <strong class="text-white">always remain visible and editable</strong> in your Approval
          Queue — automation never locks you out of correcting a transaction.
        </p>
        <p class="mt-3 leading-relaxed">
          <strong class="text-white">What happens if I don't approve a transaction?</strong> You
          can turn on auto-approve in Settings so detected transactions are approved by themselves
          after a time period you choose. If you leave auto-approve off, nothing is applied to
          your budgets or reports automatically — every detected transaction simply sits in your
          Pending Transactions list until you review and approve it yourself.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="data-use">
        <h2 id="data-use" class="scroll-mt-28 font-display text-xl font-bold text-white">
          How data is used
        </h2>
        <p class="mt-3 leading-relaxed">
          Data extracted from SMS, Gmail, or manual entry is used exclusively to power the
          features you see in the app: transaction lists, budgets, reports, and analytics. It is
          never used to build an advertising profile, because YM² shows no advertisements.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="offline-storage">
        <h2 id="offline-storage" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Offline storage
        </h2>
        <p class="mt-3 leading-relaxed">
          Your transactions, budgets, and settings are stored in an encrypted local database on
          your device. YM² is designed offline-first — the app functions fully without an
          internet connection.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="internet-usage">
        <h2 id="internet-usage" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Internet usage
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² uses the internet only for optional features you explicitly enable — such as Gmail
          import or future cloud backup/sync. Core tracking and budgeting features require no
          network access at all.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="data-sharing">
        <h2 id="data-sharing" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Data sharing
        </h2>
        <p class="mt-3 leading-relaxed">
          <strong class="text-white">We do not sell user data.</strong> YM² contains no
          advertising SDKs, no analytics SDKs, and no third-party trackers. We do not share your
          financial data with advertisers, data brokers, or any other third party.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="security">
        <h2 id="security" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Security
        </h2>
        <p class="mt-3 leading-relaxed">
          Local data is encrypted at rest. Any optional network calls (e.g. Gmail API, future
          sync) use industry-standard TLS encryption in transit.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="backups">
        <h2 id="backups" class="scroll-mt-28 font-display text-xl font-bold text-white">
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
        <h2 id="data-deletion" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Data deletion
        </h2>
        <p class="mt-3 leading-relaxed">
          Because there is no account and no server-side copy of your data, there is nothing for
          us to delete on your behalf — your data only ever exists on your device (and in any
          backup file you've created yourself). To remove all app data, uninstall the app, or use
          Android's own <strong class="text-white">Settings → Apps → YM² → Storage → Clear
          storage</strong>.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="permissions">
        <h2 id="permissions" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Permissions
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² requests only the Android permissions required for the features you use: SMS
          (transaction detection), storage (backups), and network (optional Gmail import / sync).
          Every permission can be revoked from Android Settings at any time; core app
          functionality degrades gracefully rather than breaking.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="children-privacy">
        <h2 id="children-privacy" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Children's privacy
        </h2>
        <p class="mt-3 leading-relaxed">
          YM² is not directed at children under 13, and we do not knowingly collect information
          from children under 13.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="changes">
        <h2 id="changes" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Changes to this policy
        </h2>
        <p class="mt-3 leading-relaxed">
          We may update this Privacy Policy from time to time. Material changes will be reflected
          by updating the "Last updated" date above.
        </p>
      </RevealSection>

      <RevealSection as="section" aria-labelledby="google-api">
        <h2 id="google-api" class="scroll-mt-28 font-display text-xl font-bold text-white">
          Google API Limited Use Statement
        </h2>
        <p class="mt-3 leading-relaxed">
          YM²'s use and transfer of information received from Google APIs adheres to the
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline underline-offset-2 hover:text-secondary"
            >Google API Services User Data Policy</a
          >, including the Limited Use requirements.
        </p>
      </RevealSection>

      <RevealSection
        as="section"
        aria-labelledby="contact"
        class="rounded-2xl border border-border bg-primary/10 p-6"
      >
        <h2 id="contact" class="font-display text-xl font-bold text-white">Contact</h2>
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

    <RevealSection class="mx-auto mt-10 max-w-3xl border-t border-border pt-6 text-xs text-slate-500">
      This is the canonical privacy policy for the YM² Android app, published here for Play
      Console review.
    </RevealSection>
  </div>
</template>
