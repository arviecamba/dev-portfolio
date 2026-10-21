<script setup>
import { ref, watch, nextTick } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useMediaQuery, useEventListener } from '@vueuse/core'
import { X, Files, Search } from '@lucide/vue'
import TitleBar from './components/layout/TitleBar.vue'
import ActivityBar from './components/layout/ActivityBar.vue'
import ExplorerPanel from './components/layout/ExplorerPanel.vue'
import SearchPanel from './components/layout/SearchPanel.vue'
import EditorTabs from './components/layout/EditorTabs.vue'
import TerminalPanel from './components/layout/TerminalPanel.vue'
import StatusBar from './components/layout/StatusBar.vue'
import { gsap, ScrollTrigger, lift, reduced } from './motion'
import { ui, openTab, fileFor, openSearch } from './workspace'

const route = useRoute()
const desktop = useMediaQuery('(min-width: 768px)')
const editor = ref(null)
const drawerClose = ref(null)
const file = () => fileFor(route.path)

// Every visited file gets a tab; the page title follows the open file.
watch(() => route.path, path => {
  openTab(path)
  ui.drawer = false
  const f = fileFor(path)
  document.title = path === '/' || !f ? 'Arvie Jay Camba · Software Developer' : `${f.title ?? f.name} · Arvie Jay Camba`
}, { immediate: true })

// Phone drawer: focus moves in when it opens and back to the menu button when it closes.
let opener = null
watch(() => ui.drawer, open => {
  if (open) { opener = document.activeElement; nextTick(() => drawerClose.value?.focus()) }
  else opener?.focus?.()
})
watch(desktop, d => { if (d) ui.drawer = false })

useEventListener(window, 'keydown', e => {
  const mod = e.ctrlKey || e.metaKey
  if (e.key === 'Escape' && ui.drawer) ui.drawer = false
  if (!mod) return
  if (e.key.toLowerCase() === 'p' || (e.shiftKey && e.key.toLowerCase() === 'f')) { e.preventDefault(); openSearch(desktop.value) }
  else if (e.key.toLowerCase() === 'b') { e.preventDefault(); desktop.value ? (ui.sidebar = ui.sidebar ? null : 'explorer') : (ui.drawer = !ui.drawer) }
  else if (e.code === 'Backquote') { e.preventDefault(); ui.terminal = !ui.terminal }
})

// Tab switches: the old file fades out, the new one rises in from the top of the editor.
// done must run from onComplete; calling it inside leave blanks the page in out-in mode.
function leave(el, done) {
  gsap.to(el, { autoAlpha: 0, y: lift(-6), duration: 0.15, ease: 'power1.in', onComplete: done })
}
function enter(el, done) {
  editor.value.scrollTop = 0
  gsap.fromTo(el, { autoAlpha: 0, y: lift(10) }, {
    autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform',
    onComplete: () => { done(); ScrollTrigger.refresh() },
  })
}

// Terminal and drawer slide; with reduce motion on they only fade. Opacity, not autoAlpha,
// so their controls can take focus while they fade in.
const panelIn = (el, done) => gsap.from(el, reduced() ? { opacity: 0, duration: 0.2, onComplete: done } : { height: 0, duration: 0.25, ease: 'power2.out', onComplete: done })
const panelOut = (el, done) => gsap.to(el, reduced() ? { opacity: 0, duration: 0.15, onComplete: done } : { height: 0, duration: 0.2, ease: 'power2.in', onComplete: done })
const drawerIn = (el, done) => {
  gsap.from(el.firstElementChild, { opacity: 0, duration: 0.2 })
  gsap.from(el.lastElementChild, reduced() ? { opacity: 0, duration: 0.2, onComplete: done } : { xPercent: -100, duration: 0.28, ease: 'power3.out', onComplete: done })
}
const drawerOut = (el, done) => gsap.to(el, { autoAlpha: 0, duration: 0.15, onComplete: done })
</script>

<template>
  <a href="#editor" class="sr-only z-50 bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Skip to content</a>

  <div class="flex h-dvh flex-col" :inert="ui.drawer || undefined">
    <TitleBar :desktop="desktop" />

    <div class="flex min-h-0 flex-1">
      <template v-if="desktop">
        <ActivityBar />
        <aside v-if="ui.sidebar" class="flex w-52 shrink-0 flex-col border-r bg-sidebar lg:w-64">
          <ExplorerPanel v-if="ui.sidebar === 'explorer'" />
          <SearchPanel v-else />
        </aside>
      </template>

      <div class="flex min-w-0 flex-1 flex-col">
        <EditorTabs />
        <div class="flex h-6 shrink-0 items-center gap-1 overflow-hidden px-4 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-foreground">portfolio</RouterLink>
          <template v-if="file()?.parent"><span aria-hidden="true">›</span><RouterLink to="/projects" class="hover:text-foreground">projects</RouterLink></template>
          <span aria-hidden="true">›</span><span class="truncate text-foreground/80">{{ file()?.name }}</span>
        </div>

        <main id="editor" ref="editor" tabindex="-1" class="min-h-0 flex-1 overflow-y-auto outline-none">
          <RouterView v-slot="{ Component, route: r }">
            <Transition mode="out-in" :css="false" @leave="leave" @enter="enter">
              <div :key="r.path"><component :is="Component" /></div>
            </Transition>
          </RouterView>
        </main>

        <Transition :css="false" @enter="panelIn" @leave="panelOut">
          <div v-if="ui.terminal" class="h-56 shrink-0 overflow-hidden md:h-64"><TerminalPanel /></div>
        </Transition>
      </div>
    </div>

    <StatusBar />
  </div>

  <Transition :css="false" @enter="drawerIn" @leave="drawerOut">
    <div v-if="ui.drawer && !desktop" class="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Menu" @keydown.esc="ui.drawer = false">
      <div class="absolute inset-0 bg-black/50" @click="ui.drawer = false"></div>
      <aside class="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r bg-sidebar">
        <div class="flex h-10 shrink-0 items-center gap-1 border-b px-2">
          <button type="button" :aria-pressed="ui.sidebar !== 'search'" @click="ui.sidebar = 'explorer'"
                  :class="['flex h-8 items-center gap-1.5 rounded-sm px-2 text-[13px]', ui.sidebar !== 'search' ? 'bg-accent' : 'text-muted-foreground']">
            <Files class="size-4" aria-hidden="true" />Explorer
          </button>
          <button type="button" :aria-pressed="ui.sidebar === 'search'" @click="openSearch(false)"
                  :class="['flex h-8 items-center gap-1.5 rounded-sm px-2 text-[13px]', ui.sidebar === 'search' ? 'bg-accent' : 'text-muted-foreground']">
            <Search class="size-4" aria-hidden="true" />Search
          </button>
          <button ref="drawerClose" type="button" class="ml-auto grid size-8 place-items-center rounded-sm hover:bg-accent" aria-label="Close menu" @click="ui.drawer = false">
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>
        <SearchPanel v-if="ui.sidebar === 'search'" />
        <ExplorerPanel v-else />
      </aside>
    </div>
  </Transition>
</template>
