<script setup>
import { ref } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { gsap, reduced } from '../motion'

const dark = ref(document.documentElement.classList.contains('dark'))
const icon = ref(null)

function toggle() {
  const root = document.documentElement
  dark.value = !dark.value
  // Fade colors for the switch only, so normal hovers keep their own timing.
  root.classList.add('theme-fade')
  root.classList.toggle('dark', dark.value)
  setTimeout(() => root.classList.remove('theme-fade'), 400)
  try { localStorage.setItem('theme', dark.value ? 'dark' : 'light') } catch {}
  gsap.fromTo(icon.value, reduced() ? { autoAlpha: 0 } : { rotate: -120, scale: 0.4, autoAlpha: 0 },
    { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' })
}
</script>

<template>
  <button type="button" @click="toggle" aria-label="Dark theme" :aria-pressed="dark" :title="dark ? 'Switch to Light+' : 'Switch to Dark+'"
          class="grid size-8 shrink-0 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
    <span ref="icon" class="grid">
      <Sun v-if="dark" class="size-4" aria-hidden="true" />
      <Moon v-else class="size-4" aria-hidden="true" />
    </span>
  </button>
</template>
