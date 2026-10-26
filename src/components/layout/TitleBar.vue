<script setup>
import { RouterLink } from 'vue-router'
import { Menu, Search, PanelLeft, PanelBottom } from '@lucide/vue'
import ThemeToggle from '../ThemeToggle.vue'
import ViewSwitch from '../ViewSwitch.vue'
import { ui, openSearch } from '../../workspace'

defineProps({ desktop: Boolean })
const iconBtn = 'grid size-8 place-items-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground'
</script>

<template>
  <header class="flex h-10 shrink-0 items-center gap-2 border-b bg-titlebar px-2">
    <button v-if="!desktop" type="button" :class="iconBtn" aria-label="Open menu" :aria-expanded="ui.drawer" @click="ui.drawer = true">
      <Menu class="size-4" aria-hidden="true" />
    </button>
    <RouterLink to="/" class="flex shrink-0 items-center gap-2 rounded-sm px-1 text-[13px] font-medium">
      <img src="/favicon.svg" alt="" class="size-5" width="20" height="20" />
      <span class="max-sm:sr-only">Arvie Jay Camba</span>
    </RouterLink>

    <button type="button" @click="openSearch(desktop)"
            class="mx-auto hidden h-7 w-full max-w-md items-center gap-2 rounded-md border bg-background/60 px-3 text-[13px] text-muted-foreground hover:border-foreground/30 sm:flex">
      <Search class="size-3.5" aria-hidden="true" />
      <span class="truncate">Search projects, skills, files</span>
      <kbd class="ml-auto font-mono text-[11px]">Ctrl P</kbd>
    </button>

    <div class="ml-auto flex items-center gap-0.5 sm:ml-0">
      <ViewSwitch compact class="mr-1" />
      <button type="button" :class="[iconBtn, 'sm:hidden']" aria-label="Search" @click="openSearch(desktop)">
        <Search class="size-4" aria-hidden="true" />
      </button>
      <button v-if="desktop" type="button" :class="iconBtn" aria-label="Toggle sidebar" :aria-pressed="!!ui.sidebar"
              title="Toggle sidebar (Ctrl+B)" @click="ui.sidebar = ui.sidebar ? null : 'explorer'">
        <PanelLeft class="size-4" aria-hidden="true" />
      </button>
      <button type="button" :class="iconBtn" aria-label="Toggle terminal" :aria-pressed="ui.terminal"
              title="Toggle terminal (Ctrl+`)" @click="ui.terminal = !ui.terminal">
        <PanelBottom class="size-4" aria-hidden="true" />
      </button>
      <ThemeToggle />
    </div>
  </header>
</template>
