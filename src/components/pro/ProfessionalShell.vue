<script setup>
// Professional view: a plain one-page site over the same routes. Each route scrolls to its section,
// and /projects/:slug opens a project page.
import { ref, watch, nextTick, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { Menu, X } from '@lucide/vue'
import ThemeToggle from '../ThemeToggle.vue'
import ViewSwitch from '../ViewSwitch.vue'
import ProfessionalHome from './ProfessionalHome.vue'
import ProfessionalProject from './ProfessionalProject.vue'
import { profile, projects } from '../../data'

const route = useRoute()
const page = ref(null)
const menu = ref(false)

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
]
const sections = { '/experience': 'experience', '/projects': 'projects', '/skills': 'skills', '/contact': 'contact', '/resume': 'contact' }
const project = computed(() => projects.find(p => route.path === `/projects/${p.slug}`))
const active = item => item.to === route.path + (route.hash || '') || (item.to === '/projects' && !!project.value)

const titles = { '/experience': 'Experience', '/projects': 'Projects', '/skills': 'Skills', '/contact': 'Contact', '/resume': 'Resume' }
let first = true
watch(() => route.fullPath, async () => {
  // The router's blank start location fires first; wait for the real route so the first scroll is instant.
  if (!route.matched.length) return
  menu.value = false
  const name = project.value?.name ?? titles[route.path]
  document.title = name ? `${name} · ${profile.name}` : `${profile.name} · Software Developer`
  await nextTick()
  const id = route.hash.slice(1) || sections[route.path]
  const target = id && document.getElementById(id)
  const smooth = !first && !matchMedia('(prefers-reduced-motion: reduce)').matches
  if (target) target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  else page.value?.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  first = false
}, { immediate: true })

useEventListener(window, 'keydown', e => { if (e.key === 'Escape') menu.value = false })
const link = 'rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring'
</script>

<template>
  <a href="#content" class="sr-only z-50 bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Skip to content</a>

  <div ref="page" id="pro-page" class="h-dvh overflow-y-auto bg-background text-foreground">
    <header class="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <RouterLink to="/" class="flex shrink-0 items-center gap-2.5 rounded-md font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img src="/profile.jpg" alt="" width="32" height="32" class="size-8 rounded-full object-cover object-top" />
          <span class="max-[420px]:sr-only">{{ profile.name }}</span>
        </RouterLink>

        <nav aria-label="Main" class="mx-auto hidden lg:block">
          <ul class="flex gap-1">
            <li v-for="item in nav" :key="item.to">
              <RouterLink :to="item.to" :aria-current="active(item) ? 'page' : undefined"
                          :class="[link, active(item) ? 'text-primary' : 'text-muted-foreground hover:text-foreground']">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex items-center gap-1 lg:ml-0">
          <ViewSwitch compact />
          <ThemeToggle />
          <button type="button" class="grid size-9 place-items-center rounded-md hover:bg-accent lg:hidden"
                  :aria-expanded="menu" aria-controls="pro-menu" :aria-label="menu ? 'Close menu' : 'Open menu'" @click="menu = !menu">
            <X v-if="menu" class="size-5" aria-hidden="true" />
            <Menu v-else class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav v-if="menu" id="pro-menu" aria-label="Main" class="border-t lg:hidden">
        <ul class="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
          <li v-for="item in nav" :key="item.to">
            <RouterLink :to="item.to" :aria-current="active(item) ? 'page' : undefined"
                        :class="[link, 'block', active(item) ? 'text-primary' : 'text-foreground hover:bg-accent']">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </header>

    <main id="content" tabindex="-1" class="outline-none">
      <ProfessionalProject v-if="project" :project="project" />
      <ProfessionalHome v-else />
    </main>

    <footer class="border-t">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:px-6">
        <p>© {{ new Date().getFullYear() }} {{ profile.fullName }}</p>
        <p>{{ profile.location }}</p>
      </div>
    </footer>
  </div>
</template>
