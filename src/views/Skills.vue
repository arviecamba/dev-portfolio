<script setup>
import { skills, strongest, projects } from '../data'

// How many listed projects name this technology in their stack (0 when it is not a stack entry).
const uses = item => projects.filter(p => p.stack.includes(item)).length
</script>

<template>
  <article class="mx-auto flex max-w-5xl flex-col gap-10 px-5 py-10 sm:px-10 sm:py-14">
    <header class="flex flex-col gap-3">
      <p class="font-mono text-[13px] text-muted-foreground">skills.ts</p>
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Skills</h1>
      <p class="max-w-[62ch] text-lg text-muted-foreground">
        What I use at work, grouped by area. Strongest in {{ strongest.join(', ') }}. The number shows how many of the listed projects use it.
      </p>
    </header>

    <pre class="overflow-x-auto rounded-lg border bg-card px-4 py-3 font-mono text-[13px] leading-relaxed" aria-hidden="true"><span class="text-syn-keyword">export const</span> <span class="text-syn-var">skills</span>: <span class="text-syn-type">Record</span>&lt;<span class="text-syn-type">Area</span>, <span class="text-syn-type">string</span>[]&gt; = { <span v-for="(g, i) in skills" :key="g.key"><span class="text-syn-var">{{ g.key }}</span>{{ i < skills.length - 1 ? ', ' : '' }}</span> }</pre>

    <div class="grid gap-5 md:grid-cols-2">
      <section v-for="g in skills" :key="g.key" v-reveal class="flex flex-col gap-3 rounded-lg border bg-card p-5">
        <h2 class="flex items-baseline justify-between gap-2">
          <span class="font-semibold">{{ g.label }}</span>
          <span class="font-mono text-xs text-syn-var">{{ g.key }}</span>
        </h2>
        <ul class="flex flex-wrap gap-2">
          <li v-for="s in g.items" :key="s"
              :class="['flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm', strongest.includes(s) ? 'border-primary/70 bg-primary/10' : 'bg-background']">
            {{ s }}
            <span v-if="uses(s)" class="font-mono text-[11px] text-muted-foreground" :aria-label="`used in ${uses(s)} projects`">{{ uses(s) }}</span>
            <span v-if="strongest.includes(s)" class="font-mono text-[10px] tracking-wider text-link uppercase">strongest</span>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>
