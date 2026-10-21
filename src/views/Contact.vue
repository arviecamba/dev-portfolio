<script setup>
import { RouterLink } from 'vue-router'
import { MapPin } from '@lucide/vue'
import CopyEmail from '../components/CopyEmail.vue'
import { profile } from '../data'

// GitHub is hidden until it has public code; profile.github keeps the address for later.
const links = [
  { label: 'LinkedIn', href: profile.linkedin, handle: 'linkedin.com/in/arvie-jay-camba' },
]
</script>

<template>
  <article class="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-10 sm:px-10 sm:py-14">
    <header class="flex flex-col gap-3">
      <p class="font-mono text-[13px] text-muted-foreground">contact.md</p>
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Open to Software Developer roles.</h1>
      <p class="text-lg text-muted-foreground">Local and international, full-stack or backend.</p>
    </header>

    <section v-reveal class="flex flex-col gap-3 rounded-lg border bg-card p-5 sm:p-6">
      <h2 class="font-mono text-[11px] tracking-widest text-muted-foreground">EMAIL</h2>
      <CopyEmail />
    </section>

    <section v-reveal class="grid gap-4 sm:grid-cols-2">
      <a v-for="l in links" :key="l.label" :href="l.href" target="_blank" rel="noopener"
         class="flex flex-col gap-1 rounded-lg border bg-card p-5 hover:border-primary/60">
        <span class="font-mono text-[11px] tracking-widest text-muted-foreground">{{ l.label.toUpperCase() }}</span>
        <span class="truncate text-link">{{ l.handle }} ↗</span>
      </a>
    </section>

    <section v-reveal class="flex flex-col gap-2 text-sm text-muted-foreground">
      <p class="flex items-center gap-1.5"><MapPin class="size-4" aria-hidden="true" />{{ profile.location }}</p>
      <p>Resume: <RouterLink to="/resume" class="text-link hover:underline">resume.pdf</RouterLink></p>
      <p class="pt-6">© {{ new Date().getFullYear() }} {{ profile.fullName }}.</p>
    </section>
  </article>
</template>
