<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import Shot from './Shot.vue'
import { images } from '../data'

const props = defineProps({ project: Object })
const cover = computed(() => images(props.project).find(i => !i.mobile) ?? images(props.project)[0])
</script>

<template>
  <RouterLink :to="`/projects/${project.slug}`"
              class="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary/60 focus-visible:border-primary">
    <Shot :src="cover?.src" :alt="`${project.name} screenshot`" :mobile="cover?.mobile" :framed="false" class="border-b" />
    <div class="flex flex-1 flex-col gap-2.5 p-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{{ project.category }}</p>
        <Badge variant="outline" class="font-normal">{{ project.role }}</Badge>
      </div>
      <h3 class="font-semibold leading-snug">{{ project.name }}</h3>
      <p class="line-clamp-2 text-sm text-muted-foreground">{{ project.summary }}</p>
      <ul class="flex flex-wrap gap-1.5" aria-label="Stack">
        <li v-for="s in project.stack" :key="s" class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-syn-var">{{ s }}</li>
      </ul>
      <span class="mt-auto pt-1 text-sm text-link group-hover:underline">Open case study →</span>
    </div>
  </RouterLink>
</template>
