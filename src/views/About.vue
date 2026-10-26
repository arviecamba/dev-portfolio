<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, FileText, Mail } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import ProjectCarousel from '../components/ProjectCarousel.vue'
import { gsap, SplitText, reduced } from '../motion'
import { profile, projects, intro, orderedProjects } from '../data'

const mainDev = projects.filter(p => p.role.startsWith('Main developer')).length

const focus = [
  { label: 'Backend', value: 'Laravel REST APIs, MySQL schema design' },
  { label: 'Frontend', value: 'Vue.js and Nuxt.js with TypeScript' },
  { label: 'Work', value: `${projects.length} systems, ${mainDev} as main developer` },
]

// Terminal-style intro: "whoami" types out, then the answer appears.
const command = 'whoami'
const typed = ref(reduced() ? command : '')
const answered = ref(reduced())
let timer = null

const hero = ref(null)
const title = ref(null)
let split = null

onMounted(() => {
  if (!reduced()) {
    let i = 0
    timer = setInterval(() => {
      typed.value = command.slice(0, ++i)
      if (i >= command.length) { clearInterval(timer); setTimeout(() => (answered.value = true), 250) }
    }, 70)
  }
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  if (reduced()) return tl.from(hero.value.children, { autoAlpha: 0, duration: 0.6, stagger: 0.08 })
  split = SplitText.create(title.value, {
    type: 'words', mask: 'words', autoSplit: true,
    onSplit: self => tl.from(self.words, { yPercent: 110, duration: 0.9, stagger: 0.05 }, 0.55),
  })
  tl.from([...hero.value.children].filter(el => el !== title.value && !el.dataset.static), { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.8)
})
onBeforeUnmount(() => { clearInterval(timer); split?.revert() })
</script>

<template>
  <article class="mx-auto flex max-w-5xl flex-col gap-14 px-5 py-10 sm:px-10 sm:py-14">
    <section ref="hero" class="flex flex-col gap-6">
      <div data-static class="flex flex-row-reverse items-center justify-end gap-4">
      <p class="min-w-0 font-mono text-[13px] text-muted-foreground" aria-label="whoami: Arvie Jay Camba, Software Developer">
        <span aria-hidden="true">
          <span class="text-syn-type">arvie@portfolio</span>:<span class="text-syn-keyword">~</span>$ {{ typed }}<span v-if="!answered" class="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary"></span>
          <span :class="['block pt-1 text-foreground/90 transition-opacity duration-300', answered ? 'opacity-100' : 'opacity-0']">{{ profile.fullName }} · {{ profile.title.split(' | ')[0] }}</span>
        </span>
      </p>
      <img src="/profile.jpg" alt="Portrait of Arvie Jay Mariano Camba" width="418" height="627"
           class="size-16 shrink-0 rounded-full border-2 border-primary/60 object-cover object-top sm:size-20" />
      </div>
      <h1 ref="title" class="max-w-[17ch] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Full-stack developer building Laravel and Vue systems.</h1>
      <p v-for="(line, i) in intro" :key="i" class="max-w-[62ch] text-lg leading-relaxed text-muted-foreground">{{ line }}</p>
      <dl class="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
        <div v-for="f in focus" :key="f.label" class="flex flex-col gap-1 bg-card px-4 py-3">
          <dt class="font-mono text-[11px] tracking-widest text-brand uppercase">{{ f.label }}</dt>
          <dd class="text-sm">{{ f.value }}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-3">
        <Button as-child><RouterLink to="/projects">Open projects <ArrowRight class="size-4" aria-hidden="true" /></RouterLink></Button>
        <Button as-child variant="outline"><RouterLink to="/resume"><FileText class="size-4" aria-hidden="true" />resume.pdf</RouterLink></Button>
        <Button as-child variant="ghost"><RouterLink to="/contact"><Mail class="size-4" aria-hidden="true" />contact.md</RouterLink></Button>
      </div>
    </section>

    <section v-reveal class="flex flex-col gap-6">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="font-mono text-sm"><span class="text-syn-keyword">##</span> Featured work</h2>
        <RouterLink to="/projects" class="text-sm text-link hover:underline">All {{ projects.length }} projects →</RouterLink>
      </div>
      <ProjectCarousel :projects="orderedProjects" />
    </section>
  </article>
</template>
