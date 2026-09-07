<script setup lang="ts">
import { useSeoMeta } from '@/composables/useSeoMeta'
import AppButton from '@/components/AppButton.vue'

useSeoMeta({
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist.',
  path: '/404',
})
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
    <p class="font-display text-7xl font-extrabold text-ink sm:text-8xl">404</p>
    <h1 class="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
    <p class="mt-3 max-w-md text-muted">
      The page you're looking for doesn't exist or may have moved.
    </p>
    <div class="mt-8">
      <AppButton as="router-link" to="/">Back to home</AppButton>
    </div>
  </div>
</template>
