<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { Files, Search, LayoutGrid, Mail } from '@lucide/vue'
import { ui, openSearch } from '../../workspace'

const route = useRoute()

// Clicking the open view again collapses the sidebar, like VS Code.
function show(view) {
  if (ui.sidebar === view) ui.sidebar = null
  else if (view === 'search') openSearch(true)
  else ui.sidebar = view
}

const item = active => ['relative grid h-12 w-full place-items-center hover:text-foreground',
  active ? 'text-foreground' : 'text-muted-foreground']
</script>

<template>
  <nav aria-label="Activity bar" class="flex w-12 shrink-0 flex-col border-r bg-activity">
    <button type="button" :class="item(ui.sidebar === 'explorer')" aria-label="Explorer" :aria-pressed="ui.sidebar === 'explorer'"
            title="Explorer (Ctrl+B)" @click="show('explorer')">
      <span v-if="ui.sidebar === 'explorer'" class="absolute inset-y-0 left-0 w-0.5 bg-primary" aria-hidden="true"></span>
      <Files class="size-5" aria-hidden="true" />
    </button>
    <button type="button" :class="item(ui.sidebar === 'search')" aria-label="Search" :aria-pressed="ui.sidebar === 'search'"
            title="Search (Ctrl+P)" @click="show('search')">
      <span v-if="ui.sidebar === 'search'" class="absolute inset-y-0 left-0 w-0.5 bg-primary" aria-hidden="true"></span>
      <Search class="size-5" aria-hidden="true" />
    </button>
    <RouterLink to="/projects" :class="item(route.path.startsWith('/projects'))" aria-label="Projects" title="Projects">
      <LayoutGrid class="size-5" aria-hidden="true" />
    </RouterLink>
    <RouterLink to="/contact" :class="item(route.path === '/contact')" aria-label="Contact" title="Contact">
      <Mail class="size-5" aria-hidden="true" />
    </RouterLink>
  </nav>
</template>
