<script setup lang="ts">
import { computed } from 'vue'
// Soft-glow wordmark, transparent outside the mark so it sits directly on
// the site's dark surfaces with no visible edge — see
// scripts/generate-brand-assets.mjs for the equal-padding crop. Pre-resized
// to 200px wide since this only ever renders at navbar/footer/masthead
// sizes; the ~1.76:1 aspect ratio (source is 1607x912) is preserved by
// deriving width from `size` (the mark's height).
import iconUrl from '@/assets/brand/icon-wide-200.png'
import { BRAND_NAME, BRAND_TAGLINE } from '@/constants/brand'

const ICON_ASPECT_RATIO = 1607 / 912
// The mark's overall bounding box (used by flexbox to center the icon
// against sibling text) is pulled upward by the superscript "2", which
// extends higher than the "YM" letters without a matching extension
// below them. Measured directly from the source artwork: the "YM"
// letters' own vertical center sits 7.03% of the icon's rendered height
// below the full-mark box center. Shifting the text column down by that
// same fraction aligns it with "YM" specifically, not the "2"-inflated
// box. See scripts/generate-brand-assets.mjs for the crop this is
// measured against — re-derive this if that crop ever changes.
const ICON_TEXT_OFFSET_RATIO = 0.0703

interface Props {
  /** Text color to use for the "YM²" wordmark: 'light' for dark surfaces, 'dark' for light surfaces. */
  variant?: 'light' | 'dark'
  /** Pixel height of the icon mark; width is derived from its aspect ratio. */
  size?: number
  showWordmark?: boolean
  /** Show "Your Money Matters" as a small line under the wordmark. */
  showTagline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  size: 42,
  showWordmark: true,
  showTagline: false,
})

const iconWidth = computed(() => Math.round(props.size * ICON_ASPECT_RATIO))
const textOffsetPx = computed(() => Math.round(props.size * ICON_TEXT_OFFSET_RATIO))
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img
      :src="iconUrl"
      alt="YM² logo"
      :width="iconWidth"
      :height="size"
      class="rounded-lg"
      loading="eager"
      decoding="async"
    />
    <span
      v-if="showWordmark || showTagline"
      class="inline-flex flex-col items-center leading-none"
      :style="{ transform: `translateY(${textOffsetPx}px)` }"
    >
      <span
        v-if="showWordmark"
        class="font-display text-lg font-bold tracking-tight"
        :class="variant === 'light' ? 'text-white' : 'text-slate-900'"
      >
        {{ BRAND_NAME }}
      </span>
      <span
        v-if="showTagline"
        class="text-[10px] font-semibold uppercase tracking-wider"
        :class="[variant === 'light' ? 'text-slate-400' : 'text-slate-500', showWordmark && 'mt-1']"
      >
        {{ BRAND_TAGLINE }}
      </span>
    </span>
  </span>
</template>
