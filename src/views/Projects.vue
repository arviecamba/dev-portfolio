<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects, categories } from '../data'

const active = ref('All')
const shown = computed(() => active.value === 'All' ? projects : projects.filter(p => p.category === active.value))
</script>

<template>
  <article class="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-10 sm:py-14">
    <header class="flex flex-col gap-3">
      <p class="font-mono text-[13px] text-muted-foreground"><span class="text-folder">projects/</span> · {{ projects.length }} files</p>
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
      <p class="max-w-[62ch] text-lg text-muted-foreground">
        Systems I built, contributed to, or maintained at Ayahtek Inc. Client code and data are private, so screenshots come from
        local test environments with records, names and company marks blurred.
      </p>
    </header>

    <div class="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
      <button v-for="c in categories" :key="c" type="button" @click="active = c" :aria-pressed="active === c"
              :class="['min-h-9 shrink-0 rounded-md border px-3.5 font-mono text-[13px] transition-colors',
                       active === c ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground']">
        {{ c }}
      </button>
    </div>

    <p class="sr-only" aria-live="polite">{{ shown.length }} projects shown</p>
    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <ProjectCard v-for="p in shown" :key="p.slug" v-reveal :project="p" />
    </div>
  </article>
</template>
