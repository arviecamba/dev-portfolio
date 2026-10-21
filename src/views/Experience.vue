<script setup>
import { RouterLink } from 'vue-router'
import GitHubActivity from '../components/GitHubActivity.vue'
import { profile, experience, timeline, projects } from '../data'

// Systems grouped by my role on them, straight from the project list.
const order = ['Main developer', 'Feature development', 'Maintenance', 'Contributor']
const byRole = order.map(role => ({ role, items: projects.filter(p => p.role.startsWith(role)) })).filter(g => g.items.length)
</script>

<template>
  <article class="mx-auto flex max-w-4xl flex-col gap-12 px-5 py-10 sm:px-10 sm:py-14">
    <header class="flex flex-col gap-3">
      <p class="font-mono text-[13px] text-muted-foreground">experience.md</p>
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Experience</h1>
    </header>

    <section v-reveal class="grid gap-6 rounded-lg border bg-card p-5 sm:p-7 md:grid-cols-[12rem_minmax(0,1fr)]">
      <div class="flex flex-col gap-1">
        <p class="font-mono text-sm text-brand">Mar 2023 – Present</p>
        <p class="text-sm text-muted-foreground">{{ profile.location }}</p>
      </div>
      <div class="flex min-w-0 flex-col gap-5">
        <div>
          <h2 class="text-xl font-semibold tracking-tight">Software Developer</h2>
          <p class="text-muted-foreground">{{ profile.company }}</p>
        </div>
        <ol class="relative flex flex-col gap-4 border-l pl-5" aria-label="Milestones">
          <li v-for="t in timeline" :key="t.date" class="relative">
            <span class="absolute top-1.5 -left-[25px] size-2.5 rounded-full border-2 border-card bg-primary" aria-hidden="true"></span>
            <p class="font-mono text-xs text-muted-foreground">{{ t.date }}</p>
            <p class="font-medium">{{ t.title }}</p>
            <p v-if="t.note" class="text-sm text-muted-foreground">{{ t.note }}</p>
          </li>
        </ol>
        <div class="flex flex-col gap-2">
          <h3 class="font-mono text-sm"><span class="text-syn-keyword">###</span> What I do</h3>
          <ul class="flex flex-col gap-2">
            <li v-for="e in experience" :key="e" class="flex gap-3 leading-relaxed">
              <span class="font-mono text-syn-comment" aria-hidden="true">-</span><span>{{ e }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <GitHubActivity v-reveal />

    <section v-reveal class="flex flex-col gap-5">
      <h2 class="font-mono text-sm"><span class="text-syn-keyword">##</span> Systems by role <span class="text-muted-foreground">({{ projects.length }})</span></h2>
      <div class="grid gap-5 sm:grid-cols-2">
        <div v-for="g in byRole" :key="g.role" class="flex flex-col gap-2">
          <h3 class="text-sm font-medium">{{ g.role }} <span class="text-muted-foreground">· {{ g.items.length }}</span></h3>
          <ul class="flex flex-col">
            <li v-for="p in g.items" :key="p.slug">
              <RouterLink :to="`/projects/${p.slug}`" class="flex items-baseline justify-between gap-3 border-b py-2 text-sm hover:text-link">
                <span>{{ p.name }}</span><span class="shrink-0 font-mono text-xs text-muted-foreground">{{ p.category }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </article>
</template>
