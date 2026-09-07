<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** 'inverted' for use on dark-band sections (e.g. the teal "Why YM²" band). */
  variant?: 'default' | 'inverted'
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  variant: 'default',
})
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p
      v-if="eyebrow"
      class="font-display text-sm font-semibold uppercase tracking-widest text-secondary"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
      :class="variant === 'inverted' ? 'text-ivory' : 'text-ink'"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 text-base leading-relaxed sm:text-lg"
      :class="variant === 'inverted' ? 'text-ivory/70' : 'text-muted'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
