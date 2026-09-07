<script setup lang="ts">
import type { WhyReason } from '@/types/feature'

defineProps<{ reason: WhyReason }>()
</script>

<template>
  <div
    class="flex h-full items-start gap-4 rounded-2xl border border-ivory/10 bg-ivory/5 p-5 transition-colors duration-300 hover:border-secondary/40 hover:bg-secondary/10"
  >
    <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
      <component :is="reason.icon" class="h-5 w-5" />
    </span>
    <div>
      <h3 class="font-display text-base font-bold text-ivory">{{ reason.title }}</h3>
      <p class="mt-1 text-sm leading-relaxed text-ivory/70">{{ reason.description }}</p>
    </div>
  </div>
</template>
