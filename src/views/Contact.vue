<script setup>
import { RouterLink } from 'vue-router'
import { MapPin } from '@lucide/vue'
import CopyEmail from '../components/CopyEmail.vue'
import { profile } from '../data'

// Brand marks from Simple Icons (lucide has no brand icons).
const links = [
  { label: 'LinkedIn', href: profile.linkedin, path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'GitHub', href: profile.github, path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
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

    <section v-reveal class="flex gap-3">
      <a v-for="l in links" :key="l.label" :href="l.href" target="_blank" rel="noopener"
         :aria-label="`${l.label} (opens in a new tab)`" :title="l.label"
         class="grid size-12 place-items-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground">
        <svg viewBox="0 0 24 24" class="size-6" fill="currentColor" aria-hidden="true"><path :d="l.path" /></svg>
      </a>
    </section>

    <section v-reveal class="flex flex-col gap-2 text-sm text-muted-foreground">
      <p class="flex items-center gap-1.5"><MapPin class="size-4" aria-hidden="true" />{{ profile.location }}</p>
      <p>Resume: <RouterLink to="/resume" class="text-link hover:underline">resume.pdf</RouterLink></p>
      <p class="pt-6">© {{ new Date().getFullYear() }} {{ profile.fullName }}.</p>
    </section>
  </article>
</template>
