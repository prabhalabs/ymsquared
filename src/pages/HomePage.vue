<script setup lang="ts">
import {
  ScanLine,
  Sparkles,
  ShieldCheck,
  WifiOff,
  PiggyBank,
  FileBarChart2,
  Wallet,
  Gauge,
  Target,
  Vault,
  CalendarClock,
  CreditCard,
  Scale,
  GitCompare,
  TrendingUp,
  Repeat,
  Lightbulb,
  RefreshCcw,
  ListChecks,
  Lock,
  Ban,
  EyeOff,
  Landmark,
  DoorOpen,
} from '@lucide/vue'
import { PlayCircleIcon } from '@heroicons/vue/24/solid'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { scrollToElement } from '@/composables/useSmoothScroll'
import type { Feature, WhyReason } from '@/types/feature'
import AppButton from '@/components/AppButton.vue'
import PhoneMockup from '@/components/PhoneMockup.vue'
import FloatingCard from '@/components/FloatingCard.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import WhyCard from '@/components/WhyCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import RevealSection from '@/components/RevealSection.vue'
import { BRAND_TAGLINE } from '@/constants/brand'

useSeoMeta({
  title: 'YM² — Your Money Matters',
  description:
    'YM² (Your Money Matters) is a private, offline-first personal finance manager for Android. It reads your bank SMS to build your transaction history automatically and gives you a trustworthy Safe to Spend number — your data never leaves your device.',
  path: '/',
})

const PLAY_STORE_URL = '#'

function scrollToFeatures(event: MouseEvent) {
  const el = document.querySelector<HTMLElement>('#features')
  if (!el) return
  event.preventDefault()
  scrollToElement(el)
}

const features: Feature[] = [
  {
    icon: ScanLine,
    title: 'Automatic SMS Tracking',
    description: 'Bank SMS from 18 major Indian banks is parsed the instant it arrives, building your transaction history for you.',
  },
  {
    icon: ListChecks,
    title: 'Approval-First Automation',
    description: 'Every detected transaction is a suggestion first. Approve, edit, or reject it — or let a timed sweep auto-approve the routine ones.',
  },
  {
    icon: Gauge,
    title: 'Safe to Spend',
    description: 'One trustworthy number that nets your unallocated cash against upcoming bills, goals, and reserves due soon.',
  },
  {
    icon: Wallet,
    title: 'Money Pool',
    description: 'See exactly what\'s free to use — separate from your raw bank balance, which includes cash already promised elsewhere.',
  },
  {
    icon: PiggyBank,
    title: 'Budgets with Rollover',
    description: 'Set a monthly cap per category, fund it from your Money Pool, and choose whether leftovers roll forward or return to your pool.',
  },
  {
    icon: Target,
    title: 'Goals',
    description: 'Set a savings target, with an optional deadline, and see exactly how much per month keeps you on pace.',
  },
  {
    icon: Vault,
    title: 'Reserves',
    description: 'Set money aside for a known future expense with a real due date, spent directly when the time comes.',
  },
  {
    icon: CalendarClock,
    title: 'Payments & Obligations',
    description: 'Track rent, EMIs, subscriptions, and bills — due, overdue, or paid — with recurring items renewing automatically.',
  },
  {
    icon: CreditCard,
    title: 'Credit Card Tracking',
    description: 'See your outstanding balance, what you\'ve already set aside, minimum due, and an estimated interest cost.',
  },
  {
    icon: Scale,
    title: 'Reconciliation',
    description: 'Compare YM²\'s numbers to your real bank balance, post a correction, or investigate a mismatch.',
  },
  {
    icon: GitCompare,
    title: 'What If / Scenarios',
    description: 'Test a hypothetical spend or contribution and see the before/after impact — without touching your real numbers.',
  },
  {
    icon: TrendingUp,
    title: 'Net Worth',
    description: 'Your live account balances plus anything you track manually, like property or a personal loan, in one number.',
  },
  {
    icon: Lightbulb,
    title: 'Learning Categorization',
    description: 'Correct a transaction once, confirm it, and YM² remembers — nothing is learned without your say-so.',
  },
  {
    icon: Repeat,
    title: 'Recurring Expense Detection',
    description: 'YM² notices when a merchant charges you on a consistent schedule and flags it, transparently.',
  },
  {
    icon: FileBarChart2,
    title: 'Reports & Export',
    description: '7-day, monthly, and yearly summaries with category and merchant breakdowns — exportable to CSV, Excel, or PDF.',
  },
  {
    icon: RefreshCcw,
    title: 'Encrypted Backup & Restore',
    description: 'Password-protected, AES-256 encrypted backups you control, restorable any time you set up a new device.',
  },
]

const whyReasons: WhyReason[] = [
  {
    icon: WifiOff,
    title: 'Offline First',
    description: 'No backend, no network calls in the live pipeline — every feature works with zero connectivity.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your SMS and transaction data are parsed and stored entirely on your device, encrypted at rest.',
  },
  {
    icon: Ban,
    title: 'No Ads',
    description: 'A finance app has no business showing you advertisements. YM² never will.',
  },
  {
    icon: EyeOff,
    title: 'No Tracking',
    description: 'No analytics SDKs, no behavioral tracking, no third-party trackers.',
  },
  {
    icon: Sparkles,
    title: 'Learns From You',
    description: 'Categorization improves the more you use YM² — a rule-based engine that learns from your corrections, never silently.',
  },
  {
    icon: Landmark,
    title: 'Indian Banking Support',
    description: 'Built and tuned around the SMS formats of 18 Indian banks and card issuers.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Double-Entry Ledger',
    description: 'Every balance you see — account, budget, goal, net worth — is replayed from an append-only ledger, never a stored figure that can drift.',
  },
  {
    icon: DoorOpen,
    title: 'No Account Required',
    description: 'Start tracking your money in minutes — no sign-up, no email, no account to create.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 lg:px-8">
      <div class="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <RevealSection>
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-secondary">
            Private &middot; Offline-First &middot; Automatic
          </p>
          <h1 class="mt-4 font-display text-7xl font-extrabold leading-none tracking-tight text-ink sm:text-8xl">
            YM²
          </h1>
          <p class="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">
            {{ BRAND_TAGLINE }}
          </p>
          <p class="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Track. Understand. Grow.
          </p>
          <p class="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Your bank already tells you everything, so YM² just listens. It reads your bank's SMS
            to build a transaction history automatically, then gives you one trustworthy number
            for what's actually safe to spend — all without an account, and without your data
            ever leaving your device.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <AppButton as="a" :href="PLAY_STORE_URL" target="_blank" size="lg">
              <template #icon-left>
                <PlayCircleIcon class="h-6 w-6" />
              </template>
              Download on Google Play
            </AppButton>
            <AppButton as="a" href="#features" variant="secondary" size="lg" @click="scrollToFeatures">
              See features
            </AppButton>
          </div>
        </RevealSection>

        <RevealSection :delay="150" class="relative flex justify-center">
          <PhoneMockup />
          <FloatingCard
            :icon="ShieldCheck"
            label="On-device"
            value="100% Private"
            class="absolute -left-4 top-10 hidden sm:block"
          />
          <FloatingCard
            :icon="Sparkles"
            label="Auto-categorized"
            value="Groceries"
            :delay="1.5"
            class="absolute -right-6 bottom-24 hidden sm:block"
          />
        </RevealSection>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="scroll-mt-28 px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <RevealSection>
        <SectionHeading
          eyebrow="Everything, automated"
          title="One app for every part of your money"
          subtitle="From the moment a transaction happens to the report you read at month-end, YM² handles it."
        />
      </RevealSection>

      <div class="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealSection v-for="(feature, i) in features" :key="feature.title" :delay="i * 60">
          <FeatureCard :feature="feature" />
        </RevealSection>
      </div>
    </section>

    <!-- Why YM² -->
    <section id="why-ym2" class="scroll-mt-28 bg-ink px-4 py-24 sm:px-6 lg:px-8">
      <RevealSection>
        <SectionHeading
          variant="inverted"
          eyebrow="Why YM²"
          title="Built to be trusted with your money"
          subtitle="No shortcuts on privacy — even if that means fewer features than a cloud-first competitor."
        />
      </RevealSection>

      <div class="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
        <RevealSection v-for="(reason, i) in whyReasons" :key="reason.title" :delay="i * 60">
          <WhyCard :reason="reason" />
        </RevealSection>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="px-4 py-24 sm:px-6 lg:px-8">
      <RevealSection
        class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-background px-8 py-16 text-center"
      >
        <h2 class="relative font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Take control of your money, privately.
        </h2>
        <p class="relative mx-auto mt-4 max-w-xl text-muted">
          Download YM² and get your finances organized in minutes — no account required to start.
        </p>
        <div class="relative mt-8 flex justify-center">
          <AppButton as="a" :href="PLAY_STORE_URL" target="_blank" size="lg">
            <template #icon-left>
              <PlayCircleIcon class="h-6 w-6" />
            </template>
            Download on Google Play
          </AppButton>
        </div>
      </RevealSection>
    </section>
  </div>
</template>
