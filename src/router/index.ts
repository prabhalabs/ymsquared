import { createRouter, createWebHistory } from 'vue-router'
import { scrollToHash } from '@/composables/useSmoothScroll'
import { routes } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      scrollToHash(to.hash)
      return false
    }
    return { top: 0 }
  },
})

export default router
