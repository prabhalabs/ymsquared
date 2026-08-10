<script setup lang="ts">
// Use the pre-resized 128px copy, not the ~1MB source-of-truth icon.png,
// since this only ever renders at navbar/footer icon sizes.
import iconUrl from '@/assets/brand/icon-128.png'
import { BRAND_NAME, BRAND_TAGLINE } from '@/constants/brand'

interface Props {
  /** Text color to use for the "YM²" wordmark: 'light' for dark surfaces, 'dark' for light surfaces. */
  variant?: 'light' | 'dark'
  /** Pixel size of the icon mark. */
  size?: number
  showWordmark?: boolean
  /** Show "Your Money Matters" as a small line under the wordmark. */
  showTagline?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'light',
  size: 36,
  showWordmark: true,
  showTagline: false,
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img
      :src="iconUrl"
      alt="YM² logo"
      :width="size"
      :height="size"
      class="rounded-[22%]"
      loading="eager"
      decoding="async"
    />
    <span v-if="showWordmark" class="inline-flex flex-col leading-none">
      <span
        class="font-display text-lg font-bold tracking-tight"
        :class="variant === 'light' ? 'text-white' : 'text-slate-900'"
      >
        {{ BRAND_NAME }}
      </span>
      <span
        v-if="showTagline"
        class="mt-1 text-[10px] font-semibold uppercase tracking-wider"
        :class="variant === 'light' ? 'text-slate-400' : 'text-slate-500'"
      >
        {{ BRAND_TAGLINE }}
      </span>
    </span>
  </span>
</template>
