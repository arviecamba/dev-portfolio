<script setup>
// Professional view home: one page, written for visitors who are not developers.
// All content comes from data.js, the same source as the developer view.
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Download, MapPin, Database, Server, MonitorSmartphone, BookOpen } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Shot from '../Shot.vue'
import CopyEmail from '../CopyEmail.vue'
import BrandIcon from '../BrandIcon.vue'
import { gsap, ScrollTrigger, reduced } from '../../motion'
import { profile, intro, experience, timeline, skills, projects, images, downloads, orderedProjects, featuredOrder } from '../../data'

// What each part of my work does, in plain words.
const work = [
  { icon: Database, title: 'Databases', text: 'I design how an application stores its information in MySQL, so records stay accurate and easy to find.' },
  { icon: Server, title: 'Business logic and APIs', text: 'I build the services behind each screen in Laravel: the rules, calculations and secure sign-in that make a system work.' },
  { icon: MonitorSmartphone, title: 'Screens people use', text: 'I connect those services to web and mobile interfaces built with Vue.js, Nuxt.js and React.js.' },
  { icon: BookOpen, title: 'Learning on the job', text: 'I learn new tools from official documentation and source code, and adapt to the stack each project needs.' },
]

const domains = [...new Set(projects.map(p => p.category))]

const featured = orderedProjects.filter(p => p.featured || featuredOrder.includes(p.slug))
const others = orderedProjects.filter(p => !featured.includes(p))
const showAll = ref(false)
const cover = p => images(p)[0]

const group = keys => skills.filter(s => keys.includes(s.key)).flatMap(s => s.items)
const skillGroups = [
  { title: 'Backend Development', text: 'The server side: business rules, data processing and secure access.', items: group(['backend', 'practices']) },
  { title: 'Frontend Development', text: 'The screens people use in the browser.', items: group(['frontend']) },
  { title: 'Databases', text: 'How information is stored, organized and kept consistent.', items: group(['databases']) },
  { title: 'Tools and Workflow', text: 'How I build, review and ship work with a team.', items: group(['tools', 'other']) },
]

// Motion: one hero timeline on load, then each [data-reveal] block plays once as it scrolls in.
// Everything lives in one gsap.context scoped to this page and is reverted on unmount, so switching
// views or opening a project leaves no tweens or ScrollTriggers behind. With reduce motion on,
// nothing is animated. Opacity, not autoAlpha, so links not yet revealed can still take focus.
const root = ref(null)
let ctx
onMounted(() => {
  if (reduced()) return
  // The shell's scroll container. An element, not a selector: selectors resolve inside the context scope.
  const scroller = document.getElementById('pro-page')
  ctx = gsap.context(() => {
    const ease = 'power3.out'
    gsap.timeline({ defaults: { ease, duration: 0.6 } })
      .from('[data-hero]', { y: 16, opacity: 0, stagger: 0.07 })
      .from('[data-hero-line]', { scaleX: 0, duration: 0.5 }, 0.3)
      .from('[data-hero-photo]', { scale: 0.96, opacity: 0, duration: 0.8 }, 0.25)

    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.from(el.dataset.reveal === 'children' ? el.children : el, {
        y: 20, opacity: 0, duration: 0.6, ease, stagger: 0.07,
        scrollTrigger: { trigger: el, scroller, start: 'top 88%', once: true },
      })
    })

    // Experience: the timeline line draws down, then each milestone follows.
    gsap.timeline({ scrollTrigger: { trigger: '[data-line]', scroller, start: 'top 85%', once: true } })
      .from('[data-line]', { scaleY: 0, duration: 0.8, ease: 'power2.out' })
      .from('[data-milestone]', { x: -8, opacity: 0, duration: 0.5, ease, stagger: 0.15 }, 0.2)
  }, root.value)
  // Web fonts change line heights, so trigger positions are measured again once they load.
  document.fonts?.ready.then(() => ctx && ScrollTrigger.refresh())
})
onBeforeUnmount(() => { ctx?.revert(); ctx = null })
// Showing more projects pushes the sections below down.
watch(showAll, () => ctx && nextTick(() => ScrollTrigger.refresh()))

const section = 'scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20'
const eyebrow = 'text-sm font-semibold tracking-wide text-primary uppercase'
const heading = 'mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'
</script>

<template>
  <div ref="root">
  <!-- Hero: a faint accent glow behind the portrait; the content animates in on load. -->
  <section class="relative overflow-hidden border-b bg-muted/40">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_85%_10%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]" aria-hidden="true"></div>
    <div class="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div class="flex min-w-0 flex-col gap-6">
        <p data-hero class="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin class="size-4" aria-hidden="true" />{{ profile.location }}</p>
        <div>
          <h1 data-hero class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{{ profile.fullName }}</h1>
          <p data-hero class="mt-3 text-xl font-medium text-primary sm:text-2xl">Software Developer · Full-Stack Web Developer</p>
          <span data-hero-line class="mt-5 block h-1 w-16 origin-left rounded-full bg-primary" aria-hidden="true"></span>
        </div>
        <p data-hero class="max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{{ intro[0] }}</p>
        <div data-hero class="flex flex-wrap gap-3">
          <Button as-child size="lg" class="group"><RouterLink to="/projects">View my projects <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></RouterLink></Button>
          <Button as-child size="lg" variant="outline"><RouterLink to="/experience">Explore my experience</RouterLink></Button>
          <Button as-child size="lg" variant="ghost"><RouterLink to="/contact">Contact me</RouterLink></Button>
        </div>
      </div>
      <img data-hero-photo src="/profile.jpg" alt="Portrait of Arvie Jay Mariano Camba" width="418" height="627"
           class="order-first aspect-[4/5] w-28 rounded-2xl border object-cover object-top shadow-sm sm:w-36 md:order-none md:w-full" />
    </div>
  </section>

  <!-- About -->
  <section id="about" :class="section">
    <div data-reveal="children">
    <p :class="eyebrow">About me</p>
    <h2 :class="heading">Software that supports real-world business operations.</h2>
    <p class="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">{{ intro[1] }}</p>
    </div>
    <ul data-reveal="children" class="mt-10 grid gap-4 sm:grid-cols-2">
      <li v-for="w in work" :key="w.title" class="flex gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
        <span class="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><component :is="w.icon" class="size-5" aria-hidden="true" /></span>
        <div>
          <h3 class="font-semibold">{{ w.title }}</h3>
          <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ w.text }}</p>
        </div>
      </li>
    </ul>
  </section>

  <!-- Experience -->
  <section id="experience" class="scroll-mt-16 border-y bg-muted/40">
    <div :class="section">
      <div data-reveal="children">
      <p :class="eyebrow">Experience</p>
      <h2 :class="heading">Professional experience</h2>
      </div>
      <article data-reveal class="mt-10 grid gap-8 rounded-xl border bg-card p-6 sm:p-8 md:grid-cols-[14rem_minmax(0,1fr)]">
        <div class="flex flex-col gap-1">
          <p class="font-semibold">Mar 2023 – Present</p>
          <p class="text-sm text-muted-foreground">{{ profile.location }}</p>
          <ol class="relative mt-4 flex flex-col gap-3 pl-4">
            <span data-line class="absolute inset-y-0 left-0 w-px origin-top bg-border" aria-hidden="true"></span>
            <li v-for="t in timeline" :key="t.date" data-milestone class="relative text-sm">
              <span class="absolute top-1.5 -left-[21px] size-2.5 rounded-full border-2 border-primary bg-card" aria-hidden="true"></span>
              <span class="font-medium">{{ t.date }}</span>
              <span class="block text-muted-foreground">{{ t.title }}</span>
            </li>
          </ol>
        </div>
        <div class="flex min-w-0 flex-col gap-5">
          <div>
            <h3 class="text-xl font-semibold">Software Developer</h3>
            <p class="text-muted-foreground">{{ profile.company }} · Mid-level since 2025</p>
          </div>
          <ul data-reveal="children" class="flex flex-col gap-2.5">
            <li v-for="e in experience" :key="e" class="flex gap-3 leading-relaxed">
              <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>{{ e }}
            </li>
          </ul>
          <div>
            <h4 class="text-sm font-medium text-muted-foreground">Industries I have built for</h4>
            <ul class="mt-2 flex flex-wrap gap-2">
              <li v-for="d in domains" :key="d"><Badge variant="secondary">{{ d }}</Badge></li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- Projects -->
  <section id="projects" :class="section">
    <div data-reveal="children">
    <p :class="eyebrow">Projects</p>
    <h2 :class="heading">Featured projects</h2>
    <p class="mt-4 max-w-[65ch] text-muted-foreground">
      Production systems for government and private clients. Client code and data are private, so screenshots come from
      test environments with personal details and company marks blurred.
    </p>
    </div>
    <ul data-reveal="children" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="p in featured" :key="p.slug">
        <RouterLink :to="`/projects/${p.slug}`"
                    class="group flex h-full flex-col overflow-hidden rounded-xl border bg-card outline-none transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0">
          <Shot :src="cover(p)?.src" :alt="`${p.name} screenshot`" :mobile="cover(p)?.mobile" :framed="false" class="border-b" />
          <div class="flex flex-1 flex-col gap-3 p-5">
            <p class="text-xs font-semibold tracking-wide text-primary uppercase">{{ p.category }}</p>
            <h3 class="text-lg leading-snug font-semibold">{{ p.name }}</h3>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ p.summary }}</p>
            <p class="text-sm"><span class="text-muted-foreground">My role:</span> {{ p.role }}</p>
            <ul class="mt-auto flex flex-wrap gap-1.5 pt-2">
              <li v-for="s in p.stack" :key="s"><Badge variant="outline">{{ s }}</Badge></li>
            </ul>
            <span class="inline-flex items-center gap-1 text-sm font-medium text-primary">View project <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
          </div>
        </RouterLink>
      </li>
    </ul>

    <div class="mt-10">
      <Button variant="outline" :aria-expanded="showAll" aria-controls="more-projects" @click="showAll = !showAll">
        {{ showAll ? 'Hide other projects' : `Show ${others.length} more projects` }}
      </Button>
      <ul v-if="showAll" id="more-projects" class="mt-6 grid gap-x-8 sm:grid-cols-2">
        <li v-for="p in others" :key="p.slug" class="border-b">
          <RouterLink :to="`/projects/${p.slug}`" class="flex flex-col gap-1 py-4 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
            <span class="font-medium">{{ p.name }}</span>
            <span class="text-sm text-muted-foreground">{{ p.category }} · {{ p.role }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- Skills -->
  <section id="skills" class="scroll-mt-16 border-y bg-muted/40">
    <div :class="section">
      <div data-reveal="children">
      <p :class="eyebrow">Skills</p>
      <h2 :class="heading">Skills and technologies</h2>
      </div>
      <div data-reveal="children" class="mt-10 grid gap-6 md:grid-cols-2">
        <article v-for="g in skillGroups" :key="g.title" class="rounded-xl border bg-card p-6 transition-colors hover:border-primary/40">
          <h3 class="font-semibold">{{ g.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ g.text }}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="s in g.items" :key="s"><Badge variant="secondary">{{ s }}</Badge></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" :class="section">
    <div data-reveal class="rounded-2xl border bg-card p-6 sm:p-10">
      <p :class="eyebrow">Contact</p>
      <h2 :class="heading">Let's work together.</h2>
      <p class="mt-4 max-w-[60ch] text-lg text-muted-foreground">I'm open to Software Developer roles, local and international, full-stack or backend.</p>
      <CopyEmail class="mt-6" />
      <div class="mt-6 flex flex-wrap gap-3">
        <Button as-child variant="outline"><a :href="profile.linkedin" target="_blank" rel="noopener noreferrer"><BrandIcon name="linkedin" class="size-4" />Connect on LinkedIn<span class="sr-only"> (opens in a new tab)</span></a></Button>
        <Button as-child variant="outline"><a :href="profile.github" target="_blank" rel="noopener noreferrer"><BrandIcon name="github" class="size-4" />Visit GitHub<span class="sr-only"> (opens in a new tab)</span></a></Button>
      </div>
      <div class="mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
        <span class="text-sm text-muted-foreground">Download:</span>
        <Button v-for="d in downloads" :key="d.file" as-child variant="secondary" size="sm">
          <a :href="`/${d.file}`" download><Download class="size-4" aria-hidden="true" />{{ d.label }} (PDF)</a>
        </Button>
      </div>
    </div>
  </section>
  </div>
</template>
