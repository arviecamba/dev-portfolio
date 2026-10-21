<script setup>
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import FileIcon from './FileIcon.vue'
import { files, ui, projectPath } from '../../workspace'
import { projects, skills } from '../../data'

const router = useRouter()
const input = ref(null)
const q = ref('')

const has = (...texts) => texts.join(' ').toLowerCase().includes(q.value.trim().toLowerCase())
const results = computed(() => {
  if (!q.value.trim()) return []
  return [
    ...files.filter(f => has(f.name)).map(f => ({ to: f.path, name: f.name, folder: f.folder, detail: 'File' })),
    ...projects.filter(p => has(p.name, p.slug, p.summary, p.category, p.domain, p.role, p.stack.join(' ')))
      .map(p => ({ to: projectPath(p), name: `${p.slug}.md`, detail: p.name })),
    ...skills.flatMap(g => g.items.filter(i => has(i)).map(i => ({ to: '/skills', name: i, detail: `skills.ts · ${g.label}`, skill: true }))),
  ]
})

function openFirst() { if (results.value[0]) router.push(results.value[0].to) }

const focus = () => nextTick(() => input.value?.focus())
watch(() => ui.searchFocus, focus)
onMounted(focus)
</script>

<template>
  <section aria-label="Search" class="flex min-h-0 flex-col">
    <p class="px-5 py-2.5 font-mono text-[11px] tracking-widest text-muted-foreground">SEARCH</p>
    <form class="px-3 pb-2" role="search" @submit.prevent="openFirst">
      <label for="ws-search" class="sr-only">Search projects, files and skills</label>
      <input id="ws-search" ref="input" v-model="q" type="search" autocomplete="off" placeholder="Search projects, skills…"
             class="h-8 w-full rounded-sm border bg-background px-2.5 text-[13px] placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
    </form>
    <p v-if="q.trim()" class="px-5 pb-1 text-xs text-muted-foreground" aria-live="polite">
      {{ results.length }} result{{ results.length === 1 ? '' : 's' }}
    </p>
    <p v-else class="px-5 text-xs leading-relaxed text-muted-foreground">Try “Laravel”, “Nuxt”, “government” or “payroll”. Press Enter to open the first match.</p>
    <ul class="min-h-0 overflow-y-auto pb-4">
      <li v-for="r in results" :key="r.to + r.name">
        <RouterLink :to="r.to" class="flex items-start gap-2 px-4 py-1.5 text-[13px] hover:bg-accent focus-visible:-outline-offset-2">
          <span v-if="r.skill" class="mt-0.5 font-mono text-[11px] text-syn-fn" aria-hidden="true">ƒ</span>
          <FileIcon v-else :name="r.name" :folder="r.folder" class="mt-0.5" />
          <span class="min-w-0">
            <span class="block truncate">{{ r.name }}</span>
            <span class="block truncate text-xs text-muted-foreground">{{ r.detail }}</span>
          </span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
