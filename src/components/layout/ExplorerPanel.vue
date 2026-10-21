<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import FileIcon from './FileIcon.vue'
import { files, projectPath } from '../../workspace'
import { projects } from '../../data'

const route = useRoute()
const router = useRouter()
const expanded = ref(route.path.startsWith('/projects'))

const row = 'flex h-7 w-full items-center gap-1.5 pr-3 text-left text-[13px] hover:bg-accent focus-visible:-outline-offset-2'
const activeRow = path => route.path === path ? 'bg-selection text-accent-foreground' : 'text-foreground/85'

// The folder row opens the projects overview and expands the folder; the chevron only toggles.
function openFolder() {
  expanded.value = true
  router.push('/projects')
}
</script>

<template>
  <nav aria-label="Explorer" class="flex min-h-0 flex-col">
    <p class="px-5 py-2.5 font-mono text-[11px] tracking-widest text-muted-foreground">EXPLORER</p>
    <p class="px-3 pb-1 font-mono text-[11px] font-semibold tracking-wider text-foreground/80">ARVIE-CAMBA-PORTFOLIO</p>
    <ul class="min-h-0 overflow-y-auto pb-4">
      <li v-for="f in files" :key="f.path">
        <div v-if="f.folder" :class="[row, activeRow(f.path), 'pl-1']">
          <button type="button" class="grid size-5 place-items-center rounded-sm hover:bg-accent"
                  :aria-label="expanded ? 'Collapse projects folder' : 'Expand projects folder'" :aria-expanded="expanded"
                  @click="expanded = !expanded">
            <ChevronRight :class="['size-3.5 transition-transform', expanded && 'rotate-90']" aria-hidden="true" />
          </button>
          <button type="button" class="flex min-w-0 flex-1 items-center gap-1.5 self-stretch" @click="openFolder">
            <FileIcon folder :open="expanded" /><span class="truncate">{{ f.name }}</span>
            <span class="ml-auto font-mono text-[11px] text-muted-foreground">{{ projects.length }}</span>
          </button>
        </div>
        <RouterLink v-else :to="f.path" :class="[row, activeRow(f.path), 'pl-7']">
          <FileIcon :name="f.name" /><span class="truncate">{{ f.name }}</span>
        </RouterLink>

        <ul v-if="f.folder && expanded">
          <li v-for="p in projects" :key="p.slug">
            <RouterLink :to="projectPath(p)" :class="[row, activeRow(projectPath(p)), 'pl-12']" :title="p.name">
              <FileIcon :name="`${p.slug}.md`" /><span class="truncate">{{ p.slug }}.md</span>
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
