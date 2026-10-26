<script setup>
import { RouterLink } from 'vue-router'
import { MapPin } from '@lucide/vue'
import CopyEmail from '../components/CopyEmail.vue'
import BrandIcon from '../components/BrandIcon.vue'
import { profile } from '../data'

const links = [
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'GitHub', href: profile.github, icon: 'github' },
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
        <BrandIcon :name="l.icon" class="size-6" />
      </a>
    </section>

    <section v-reveal class="flex flex-col gap-2 text-sm text-muted-foreground">
      <p class="flex items-center gap-1.5"><MapPin class="size-4" aria-hidden="true" />{{ profile.location }}</p>
      <p>Resume: <RouterLink to="/resume" class="text-link hover:underline">resume.pdf</RouterLink></p>
      <p class="pt-6">© {{ new Date().getFullYear() }} {{ profile.fullName }}.</p>
    </section>
  </article>
</template>
