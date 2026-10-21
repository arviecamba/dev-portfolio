<script setup>
import { watch, nextTick, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { X } from '@lucide/vue'
import FileIcon from './FileIcon.vue'
import { tabs, fileFor, closeTab } from '../../workspace'

const route = useRoute()
const router = useRouter()
const bar = ref(null)

function close(path) {
  const next = closeTab(path, route.path)
  if (next) router.push(next)
}

// Keep the active tab in view when there are more tabs than fit.
watch(() => route.path, () => nextTick(() => bar.value?.querySelector('[aria-current=page]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })))
</script>

<template>
  <nav aria-label="Open editors" class="flex h-9 shrink-0 bg-tabbar">
    <ul ref="bar" class="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
      <li v-for="path in tabs" :key="path" class="flex shrink-0">
        <div :class="['group relative flex items-center border-r text-[13px]',
                      route.path === path ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground']">
          <span v-if="route.path === path" class="absolute inset-x-0 top-0 h-px bg-primary" aria-hidden="true"></span>
          <RouterLink :to="path" :aria-current="route.path === path ? 'page' : undefined"
                      class="flex h-full items-center gap-1.5 pr-1 pl-3 focus-visible:-outline-offset-2"
                      @auxclick.middle.prevent="close(path)">
            <FileIcon :name="fileFor(path).name" :folder="fileFor(path).folder" />
            <span class="max-w-44 truncate">{{ fileFor(path).name }}</span>
          </RouterLink>
          <button type="button" :aria-label="`Close ${fileFor(path).name}`" @click="close(path)"
                  :class="['mr-1.5 grid size-5 place-items-center rounded-sm hover:bg-accent focus-visible:opacity-100',
                           route.path === path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100']">
            <X class="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>
