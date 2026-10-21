<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight, Maximize2 } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import Shot from '../components/Shot.vue'
import { projects, images, profile } from '../data'

const props = defineProps({ slug: String })
const index = computed(() => projects.findIndex(p => p.slug === props.slug))
const project = computed(() => projects[index.value])
const shots = computed(() => project.value ? images(project.value) : [])
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(index.value + 1) % projects.length])

// Case-study sections in reading order. A section without verified content is left out.
const sections = computed(() => {
  const p = project.value
  return [
    { id: 'overview', title: 'Overview', show: true },
    { id: 'need', title: 'Problem or need', show: !!p.need },
    { id: 'role', title: 'My role', show: true },
    { id: 'implementation', title: 'Technical implementation', show: !!p.implementation },
    { id: 'challenges', title: 'Engineering challenges', show: !!p.challenges?.length },
    { id: 'stack', title: 'Technologies', show: true },
    { id: 'outcome', title: 'Outcome', show: !!p.outcome },
    { id: 'screens', title: 'Screens', show: shots.value.length > 1 },
  ].filter(s => s.show)
})

const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
const h2 = 'scroll-mt-6 font-mono text-sm text-foreground'
</script>

<template>
  <article v-if="project" class="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-10 sm:py-14 xl:grid-cols-[minmax(0,1fr)_13rem]">
    <div class="flex min-w-0 flex-col gap-10">
      <header v-reveal="'children'" class="flex flex-col gap-4">
        <RouterLink to="/projects" class="inline-flex items-center gap-1.5 self-start text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft class="size-4" aria-hidden="true" />All projects
        </RouterLink>
        <p class="font-mono text-[13px] text-brand uppercase">
          {{ project.category }}<template v-if="project.domain.toLowerCase() !== project.category.toLowerCase()"> · {{ project.domain }}</template>
        </p>
        <h1 class="max-w-[22ch] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{{ project.name }}</h1>
        <dl class="flex flex-wrap gap-x-8 gap-y-3 border-y py-4 text-sm">
          <div><dt class="font-mono text-[11px] tracking-widest text-muted-foreground">ROLE</dt><dd class="mt-0.5 font-medium">{{ project.role }}</dd></div>
          <div><dt class="font-mono text-[11px] tracking-widest text-muted-foreground">COMPANY</dt><dd class="mt-0.5 font-medium">{{ profile.company }}</dd></div>
          <div><dt class="font-mono text-[11px] tracking-widest text-muted-foreground">STACK</dt><dd class="mt-0.5 font-medium">{{ project.stack.join(', ') }}</dd></div>
        </dl>
      </header>

      <a v-if="shots[0]" v-reveal :href="shots[0].src" target="_blank" rel="noopener" class="group relative block"
         :aria-label="`Open ${shots[0].caption} screenshot full size`">
        <Shot :src="shots[0].src" :alt="`${project.name}: ${shots[0].caption}`" :mobile="shots[0].mobile" />
        <span class="absolute top-3 right-3 grid size-8 place-items-center rounded-md bg-background/80 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
          <Maximize2 class="size-4" />
        </span>
      </a>
      <Shot v-else />

      <section id="overview" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Overview</h2>
        <p class="max-w-[65ch] text-lg leading-relaxed text-foreground/90">{{ project.summary }}</p>
      </section>

      <section v-if="project.need" id="need" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Problem or need</h2>
        <p class="max-w-[65ch] leading-relaxed">{{ project.need }}</p>
      </section>

      <section id="role" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> My role</h2>
        <p><Badge variant="secondary">{{ project.role }}</Badge></p>
        <ul class="flex max-w-[65ch] flex-col gap-2">
          <li v-for="b in project.built" :key="b" class="flex gap-3 leading-relaxed">
            <span class="font-mono text-syn-comment" aria-hidden="true">-</span><span>{{ b }}</span>
          </li>
        </ul>
      </section>

      <section v-if="project.implementation" id="implementation" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Technical implementation</h2>
        <p class="max-w-[65ch] leading-relaxed">{{ project.implementation }}</p>
      </section>

      <section v-if="project.challenges?.length" id="challenges" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Engineering challenges</h2>
        <ul class="flex max-w-[65ch] flex-col gap-2">
          <li v-for="c in project.challenges" :key="c" class="flex gap-3 leading-relaxed">
            <span class="font-mono text-syn-comment" aria-hidden="true">-</span><span>{{ c }}</span>
          </li>
        </ul>
      </section>

      <section id="stack" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Technologies</h2>
        <ul class="flex flex-wrap gap-2">
          <li v-for="s in project.stack" :key="s" class="rounded-md border bg-card px-2.5 py-1 font-mono text-[13px] text-syn-var">{{ s }}</li>
        </ul>
      </section>

      <section v-if="project.outcome" id="outcome" v-reveal class="flex flex-col gap-3">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Outcome</h2>
        <p class="max-w-[65ch] leading-relaxed">{{ project.outcome }}</p>
      </section>

      <section v-if="shots.length > 1" id="screens" class="flex flex-col gap-4">
        <h2 :class="h2"><span class="text-syn-keyword">##</span> Screens</h2>
        <div class="grid gap-5 sm:grid-cols-2">
          <figure v-for="s in shots.slice(1)" :key="s.src" v-reveal class="group flex flex-col gap-2">
            <a :href="s.src" target="_blank" rel="noopener" :aria-label="`Open ${s.caption} screenshot full size`">
              <Shot :src="s.src" :alt="`${project.name}: ${s.caption}`" :mobile="s.mobile" />
            </a>
            <figcaption class="font-mono text-xs text-muted-foreground">{{ s.caption }}</figcaption>
          </figure>
        </div>
        <p class="text-xs text-muted-foreground">Screens come from local test environments. Records, names and company marks are blurred.</p>
      </section>

      <nav aria-label="More projects" class="grid gap-3 border-t pt-6 sm:grid-cols-2">
        <RouterLink :to="`/projects/${prev.slug}`" class="group flex flex-col gap-1 rounded-lg border bg-card p-4 hover:border-primary/60">
          <span class="flex items-center gap-1 text-xs text-muted-foreground"><ArrowLeft class="size-3.5" aria-hidden="true" />Previous</span>
          <span class="font-medium group-hover:text-link">{{ prev.name }}</span>
        </RouterLink>
        <RouterLink :to="`/projects/${next.slug}`" class="group flex flex-col items-end gap-1 rounded-lg border bg-card p-4 text-right hover:border-primary/60">
          <span class="flex items-center gap-1 text-xs text-muted-foreground">Next<ArrowRight class="size-3.5" aria-hidden="true" /></span>
          <span class="font-medium group-hover:text-link">{{ next.name }}</span>
        </RouterLink>
      </nav>
    </div>

    <!-- Outline, like VS Code's outline view -->
    <aside class="hidden xl:block">
      <nav aria-label="On this page" class="sticky top-6 flex flex-col gap-1 border-l pl-4 text-sm">
        <p class="pb-1 font-mono text-[11px] tracking-widest text-muted-foreground">OUTLINE</p>
        <button v-for="s in sections" :key="s.id" type="button" class="text-left text-muted-foreground hover:text-foreground" @click="jump(s.id)">
          {{ s.title }}
        </button>
      </nav>
    </aside>
  </article>

  <div v-else class="px-10 py-24">
    <h1 class="text-3xl font-semibold">Project not found</h1>
    <RouterLink to="/projects" class="mt-4 inline-block text-link underline">See all projects</RouterLink>
  </div>
</template>
