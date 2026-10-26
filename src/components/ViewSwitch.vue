<script setup>
// Segmented control for the two portfolio views, plus a one-time hint for first visits.
import { X } from '@lucide/vue'
import { view, hintSeen, dismissHint } from '../view'

defineProps({ compact: Boolean })
const options = [
  { value: 'developer', label: 'Developer', title: 'VS Code-style workspace' },
  { value: 'professional', label: 'Professional', title: 'Simple, classic layout' },
]
</script>

<template>
  <div class="relative shrink-0">
    <div role="group" aria-label="Portfolio view" class="flex rounded-md border bg-muted/60 p-0.5">
      <button v-for="o in options" :key="o.value" type="button" :aria-pressed="view === o.value" :title="o.title"
              @click="view = o.value"
              :class="['rounded-[5px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                       compact ? 'h-6 px-2 text-[11px]' : 'h-7 px-2.5 text-xs',
                       view === o.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground']">
        {{ o.label }}<span :class="compact && 'max-sm:sr-only'"> view</span>
      </button>
    </div>

    <div v-if="!hintSeen" role="note"
         class="absolute top-full right-0 z-30 mt-2 flex w-64 items-start gap-2 rounded-lg border bg-popover p-3 text-left text-xs leading-relaxed text-popover-foreground shadow-lg">
      <p class="flex-1">
        <template v-if="view === 'developer'">New here? <b>Professional view</b> shows this portfolio as a simple, classic website.</template>
        <template v-else>You can switch back to the <b>Developer view</b>, a VS Code-style workspace, at any time.</template>
      </p>
      <button type="button" class="grid size-6 shrink-0 place-items-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Dismiss hint" @click="dismissHint">
        <X class="size-3.5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
