<script setup>
import { ref } from 'vue'
import { Copy, Check, Mail } from '@lucide/vue'
import { profile } from '../data'

const copied = ref(false)
const text = ref(null)

async function copy() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard blocked: select the address so it can be copied by hand.
    getSelection().selectAllChildren(text.value)
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <span ref="text" class="font-mono text-base select-all sm:text-lg">{{ profile.email }}</span>
    <button type="button" @click="copy" class="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-sm hover:border-foreground/30">
      <Check v-if="copied" class="size-4 text-brand" aria-hidden="true" /><Copy v-else class="size-4" aria-hidden="true" />
      <span aria-live="polite">{{ copied ? 'Copied' : 'Copy' }}</span>
    </button>
    <a :href="`mailto:${profile.email}`" class="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-sm hover:border-foreground/30">
      <Mail class="size-4" aria-hidden="true" />Email me
    </a>
  </div>
</template>
