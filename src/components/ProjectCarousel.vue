<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { useResizeObserver } from '@vueuse/core'
import ProjectCard from './ProjectCard.vue'
import { gsap, Draggable, reduced } from '../motion'

defineProps({ projects: Array })

const viewport = ref(null)
const track = ref(null)
const bar = ref(null)
const index = ref(0)
const last = ref(0) // last index that can sit at the left edge
let drag = null
let minX = 0

const cards = () => [...track.value.children]
const offset = i => Math.max(minX, -cards()[i].offsetLeft)

function measure() {
  minX = Math.min(0, viewport.value.clientWidth - track.value.scrollWidth)
  const i = cards().findIndex(el => -el.offsetLeft <= minX)
  last.value = i < 0 ? cards().length - 1 : i
  drag?.applyBounds({ minX, maxX: 0 })
}

function go(i, instant = false) {  index.value = gsap.utils.clamp(0, last.value, i)
  const duration = instant || reduced() ? 0 : 0.7
  gsap.to(track.value, { x: offset(index.value), duration, ease: 'power3.out', onUpdate: () => drag?.update() })
  gsap.to(bar.value, { scaleX: (index.value + 1) / (last.value + 1), duration, ease: 'power3.out' })
}

// Bring a card into view when it gets keyboard focus.
function onFocus(e) {
  const i = cards().findIndex(el => el.contains(e.target))
  if (i >= 0 && (i < index.value || i > index.value + 1)) go(i)
}

// The editor width changes with the window and when the sidebar opens or closes.
useResizeObserver(viewport, () => { measure(); go(index.value, true) })

onMounted(() => {
  measure()
  drag = Draggable.create(track.value, {
    type: 'x', bounds: { minX, maxX: 0 }, edgeResistance: 0.85,
    dragClickables: true, minimumMovement: 6, zIndexBoost: false,
    onPress() { gsap.killTweensOf(track.value) },
    onDragEnd() {
      // Snap to the nearest card; a short flick still moves one card.
      let best = 0
      for (let i = 1; i <= last.value; i++) if (Math.abs(offset(i) - this.x) < Math.abs(offset(best) - this.x)) best = i
      if (best === index.value && Math.abs(this.x - this.startX) > 40) best += this.getDirection('start') === 'left' ? 1 : -1
      go(best)
    },
  })[0]
  go(0, true)
})

onBeforeUnmount(() => drag?.kill())
</script>

<template>
  <div class="flex flex-col gap-6">
    <div ref="viewport" role="region" aria-roledescription="carousel" aria-label="Projects" tabindex="0"
         class="-mx-1 overflow-x-clip px-1 py-1 outline-none"
         @keydown.left.prevent="go(index - 1)" @keydown.right.prevent="go(index + 1)">
      <ul ref="track" class="relative flex cursor-grab gap-6 active:cursor-grabbing" @focusin="onFocus" @dragstart.prevent>
        <li v-for="(p, i) in projects" :key="p.slug" class="w-[85%] shrink-0 select-none sm:w-[46%] xl:w-[31.5%]"
            :aria-label="`${i + 1} of ${projects.length}`">
          <ProjectCard :project="p" />
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-4">
      <span class="font-mono text-xs tabular-nums text-muted-foreground">
        {{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
      </span>
      <div class="h-px flex-1 bg-border" aria-hidden="true">
        <div ref="bar" class="h-px origin-left bg-primary"></div>
      </div>
      <div class="flex gap-2">
        <button type="button" aria-label="Previous project" :disabled="index === 0" @click="go(index - 1)"
                class="grid size-10 place-items-center rounded-full border bg-card transition hover:border-foreground/40 disabled:opacity-40">
          <ArrowLeft class="size-4" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next project" :disabled="index >= last" @click="go(index + 1)"
                class="grid size-10 place-items-center rounded-full border bg-card transition hover:border-foreground/40 disabled:opacity-40">
          <ArrowRight class="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>
