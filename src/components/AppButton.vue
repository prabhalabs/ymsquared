<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  as?: 'button' | 'a' | 'router-link'
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'soft'
  size?: 'md' | 'lg'
  target?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const rippleActive = ref(false)

function triggerRipple(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement
  const rippleEl = el.querySelector<HTMLElement>('.ripple')
  if (!rippleEl) return

  const rect = el.getBoundingClientRect()
  rippleEl.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
  rippleEl.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)

  rippleActive.value = false
  // Force reflow so re-triggering the class restarts the CSS animation.
  void rippleEl.offsetWidth
  rippleActive.value = true
}
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :to="as === 'router-link' ? to : undefined"
    :target="as === 'a' ? target : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    class="group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold transition-colors duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    :class="[
      size === 'lg' ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm',
      disabled
        ? 'pointer-events-none bg-disabled text-disabled-ink'
        : [
            variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover',
            variant === 'secondary' && 'border border-primary text-primary hover:bg-secondary-soft',
            variant === 'soft' && 'bg-secondary-soft text-primary hover:brightness-95',
          ],
    ]"
    @mousedown="triggerRipple"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
    <span class="ripple" :class="{ 'is-active': rippleActive }" @animationend="rippleActive = false" />
  </component>
</template>
