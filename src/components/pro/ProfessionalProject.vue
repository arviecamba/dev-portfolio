<script setup>
// Professional view project page: the same case-study data as the developer view, in plain sections.
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import Shot from '../Shot.vue'
import { projects, images } from '../../data'

const props = defineProps({ project: Object })
const shots = computed(() => images(props.project))
const next = computed(() => projects[(projects.indexOf(props.project) + 1) % projects.length])
const h2 = 'text-xl font-semibold tracking-tight'
</script>

<template>
  <article class="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
    <header class="flex flex-col gap-4">
      <RouterLink to="/projects" class="inline-flex items-center gap-1.5 self-start rounded-md text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft class="size-4" aria-hidden="true" />All projects
      </RouterLink>
      <p class="text-sm font-semibold tracking-wide text-primary uppercase">
        {{ project.category }}<template v-if="project.domain !== project.category"> · {{ project.domain }}</template>
      </p>
      <h1 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{{ project.name }}</h1>
      <p class="max-w-[65ch] text-lg leading-relaxed text-muted-foreground">{{ project.summary }}</p>
      <p><span class="text-muted-foreground">My role:</span> <span class="font-medium">{{ project.role }}</span></p>
    </header>

    <Shot v-if="shots.length" :src="shots[0].src" :alt="`${project.name}: ${shots[0].caption}`" :mobile="shots[0].mobile" />

    <section v-if="project.need" class="flex flex-col gap-3">
      <h2 :class="h2">The problem</h2>
      <p class="max-w-[65ch] leading-relaxed text-muted-foreground">{{ project.need }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 :class="h2">What I did</h2>
      <ul class="flex max-w-[65ch] flex-col gap-2">
        <li v-for="b in project.built" :key="b" class="flex gap-3 leading-relaxed">
          <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>{{ b }}
        </li>
      </ul>
    </section>

    <section v-if="project.implementation" class="flex flex-col gap-3">
      <h2 :class="h2">How it works</h2>
      <p class="max-w-[65ch] leading-relaxed text-muted-foreground">{{ project.implementation }}</p>
    </section>

    <section v-if="project.challenges?.length" class="flex flex-col gap-3">
      <h2 :class="h2">Challenges</h2>
      <ul class="flex max-w-[65ch] flex-col gap-2">
        <li v-for="c in project.challenges" :key="c" class="flex gap-3 leading-relaxed text-muted-foreground">
          <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>{{ c }}
        </li>
      </ul>
    </section>

    <section v-if="project.outcome" class="flex flex-col gap-3 rounded-xl border bg-muted/40 p-6">
      <h2 :class="h2">Outcome</h2>
      <p class="max-w-[65ch] leading-relaxed">{{ project.outcome }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 :class="h2">Technologies</h2>
      <ul class="flex flex-wrap gap-2">
        <li v-for="s in project.stack" :key="s"><Badge variant="secondary">{{ s }}</Badge></li>
      </ul>
    </section>

    <section v-if="shots.length > 1" class="flex flex-col gap-4">
      <h2 :class="h2">Screens</h2>
      <ul class="grid gap-6 sm:grid-cols-2">
        <li v-for="s in shots.slice(1)" :key="s.src">
          <figure class="flex flex-col gap-2">
            <Shot :src="s.src" :alt="`${project.name}: ${s.caption}`" :mobile="s.mobile" />
            <figcaption class="text-sm text-muted-foreground">{{ s.caption }}</figcaption>
          </figure>
        </li>
      </ul>
    </section>

    <RouterLink :to="`/projects/${next.slug}`" class="group flex items-center justify-between gap-4 rounded-xl border bg-card p-5 hover:shadow-md">
      <span class="flex flex-col"><span class="text-sm text-muted-foreground">Next project</span><span class="font-medium">{{ next.name }}</span></span>
      <ArrowRight class="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </RouterLink>
  </article>
</template>
