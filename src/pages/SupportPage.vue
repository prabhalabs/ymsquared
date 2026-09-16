<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import { useSeoMeta } from '@/composables/useSeoMeta'
import SectionHeading from '@/components/SectionHeading.vue'
import RevealSection from '@/components/RevealSection.vue'
import AppButton from '@/components/AppButton.vue'
import type { FaqItem } from '@/types/feature'
import { SUPPORT_EMAIL } from '@/constants/brand'

useSeoMeta({
  title: 'Support',
  description:
    'Answers to common YM² questions: permissions, backup and restore, SMS detection, budgets, and Safe to Spend — plus how to reach us directly.',
  path: '/support',
})

const faqs: FaqItem[] = [
  {
    question: 'Why does YM² ask for SMS permission?',
    answer:
      'YM² reads transaction SMS from your bank and card issuers to automatically detect and log transactions. This parsing happens entirely on your device — raw SMS content is never uploaded anywhere.',
  },
  {
    question: 'What happens if I deny SMS permission?',
    answer:
      'YM² degrades gracefully. Without SMS permission you can still track everything manually — every transaction, budget, and report works the same way, you just add entries yourself with the "+" button.',
  },
  {
    question: 'Does YM² support manual transactions?',
    answer:
      'Yes. A "+" button is available from the Activity tab to add an expense, income, transfer, split, or refund at any time. This covers banks that don\'t send transaction SMS, or if you\'d rather not grant SMS permission at all — YM² works fully on manual entry alone.',
  },
  {
    question: 'What is Safe to Spend?',
    answer:
      'It\'s the one number on your Home screen that nets your unallocated Money Pool against bills, goal contributions, and reserve targets due soon — so it reflects what\'s truly free to spend, not just your raw balance.',
  },
  {
    question: 'How do I back up my data?',
    answer:
      'Open Settings → Backup & Restore → Create Backup and set a passphrase. YM² generates an AES-256 encrypted backup file that you save wherever you like (device storage, an SD card, or a cloud drive of your choice) — YM² itself never uploads it automatically.',
  },
  {
    question: 'How do I restore from a backup?',
    answer:
      'On a new device or after a reinstall, open Settings → Backup & Restore → Restore Backup, select your saved backup file, and enter its passphrase. Your transactions, budgets, and categories are restored exactly as they were.',
  },
  {
    question: 'How does automatic SMS detection work?',
    answer:
      'YM² watches for incoming SMS from recognized bank and card-issuer sender IDs across 18 supported Indian banks, parses the amount, merchant, and account on-device, and creates a transaction candidate in your Approvals queue — which you can review and edit at any time.',
  },
  {
    question: "What happens if I don't approve a transaction?",
    answer:
      'You can turn on auto-approve in Settings so detected transactions are approved by themselves after a time period you choose, once they meet your confidence threshold. If you leave auto-approve off, nothing is applied to your budgets or reports automatically — the transaction simply sits in Activity → Pending until you review and approve it yourself.',
  },
  {
    question: 'Does YM² support banks outside India, or iOS?',
    answer:
      "Not yet. SMS parsing is currently tuned for 18 Indian banks, and YM² is Android-only. You can still track any account manually while we expand coverage.",
  },
]

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="px-4 py-16 sm:px-6 lg:px-8">
    <RevealSection>
      <SectionHeading
        eyebrow="Support"
        title="How can we help?"
        subtitle="Answers to the questions we hear most. Can't find what you need? Email us directly."
      />
    </RevealSection>

    <RevealSection :delay="100" class="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
      <div v-for="(faq, index) in faqs" :key="faq.question">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span class="font-display font-semibold text-ink">{{ faq.question }}</span>
          <ChevronDownIcon
            class="h-5 w-5 shrink-0 text-muted transition-transform duration-200"
            :class="{ 'rotate-180': openIndex === index }"
          />
        </button>
        <div v-show="openIndex === index" class="px-6 pb-5">
          <p class="leading-relaxed text-muted">{{ faq.answer }}</p>
        </div>
      </div>
    </RevealSection>

    <RevealSection :delay="200" class="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-gradient-to-br from-card to-background p-8 text-center">
      <EnvelopeIcon class="mx-auto h-8 w-8 text-secondary" />
      <h2 class="mt-4 font-display text-xl font-bold text-ink">Still need help?</h2>
      <p class="mt-2 text-muted">Reach out and a real person will get back to you.</p>
      <div class="mt-6 flex justify-center">
        <AppButton as="a" :href="`mailto:${SUPPORT_EMAIL}`">{{ SUPPORT_EMAIL }}</AppButton>
      </div>
    </RevealSection>
  </div>
</template>
