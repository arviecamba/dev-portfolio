<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { GitBranch, SquareTerminal, Circle } from '@lucide/vue'
import { ui, fileFor } from '../../workspace'

const route = useRoute()
const lang = computed(() => fileFor(route.path)?.lang ?? '')
const item = 'flex h-full items-center gap-1.5 px-2 hover:bg-white/15'
</script>

<template>
  <footer class="flex h-6 shrink-0 items-center justify-between bg-statusbar text-xs text-statusbar-foreground">
    <div class="flex h-full min-w-0 items-center">
      <span class="flex h-full items-center gap-1.5 px-2.5"><GitBranch class="size-3.5" aria-hidden="true" />main</span>
      <RouterLink to="/contact" :class="item">
        <Circle class="size-2.5 fill-current" aria-hidden="true" /><span class="truncate">Open to Software Developer roles</span>
      </RouterLink>
    </div>
    <div class="flex h-full shrink-0 items-center">
      <span class="hidden px-2 sm:inline">{{ lang }}</span>
      <button type="button" :class="item" :aria-pressed="ui.terminal" title="Toggle terminal (Ctrl+`)" @click="ui.terminal = !ui.terminal">
        <SquareTerminal class="size-3.5" aria-hidden="true" />Terminal
      </button>
    </div>
  </footer>
</template>
