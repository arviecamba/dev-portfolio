<script setup>
import { RouterLink } from 'vue-router'
import { FileText, Download } from '@lucide/vue'
import CopyEmail from '../components/CopyEmail.vue'
import { profile, downloads } from '../data'

const parts = [
  { to: '/experience', file: 'experience.md', text: 'Role, milestones and responsibilities' },
  { to: '/projects', file: 'projects/', text: 'The systems I worked on' },
  { to: '/skills', file: 'skills.ts', text: 'Technologies by area' },
]
</script>

<template>
  <article class="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-10 sm:px-10 sm:py-14">
    <header class="flex flex-col gap-3">
      <p class="font-mono text-[13px] text-muted-foreground">resume.pdf</p>
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Resume</h1>
    </header>

    <section v-reveal class="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-10 text-center">
      <FileText class="size-10 text-syn-string" aria-hidden="true" />
      <div class="flex flex-col gap-1">
        <p class="text-lg font-medium">Download my resume or CV.</p>
        <p class="text-muted-foreground">The resume is the short version; the CV has every project in detail.</p>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <a v-for="d in downloads" :key="d.file" :href="`/${d.file}`" download
           class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download class="size-4" aria-hidden="true" />{{ d.label }} <span class="sr-only">(PDF)</span>
        </a>
      </div>
      <p class="text-sm text-muted-foreground">Questions? Email me.</p>
      <CopyEmail class="justify-center" />
    </section>

    <section v-reveal class="flex flex-col gap-3">
      <h2 class="font-mono text-sm"><span class="text-syn-keyword">##</span> The same details on this site</h2>
      <p class="text-sm text-muted-foreground">{{ profile.title }}</p>
      <ul class="flex flex-col">
        <li v-for="p in parts" :key="p.to">
          <RouterLink :to="p.to" class="flex items-baseline justify-between gap-3 border-b py-3 hover:text-link">
            <span class="font-mono text-sm">{{ p.file }}</span><span class="text-sm text-muted-foreground">{{ p.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </article>
</template>
