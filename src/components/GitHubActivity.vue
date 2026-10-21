<script setup>
// Contribution graph from src/github-contributions.json (refresh with npm run github:refresh).
import { ref, onMounted } from 'vue'
import data from '../github-contributions.json'

const fmt = n => n.toLocaleString('en-US')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// The first week can start mid-week; pad it so rows line up with weekdays.
const lead = new Date(data.weeks[0][0][0] + 'T00:00:00').getDay()
const weeks = data.weeks.map((w, i) => (i === 0 ? [...Array(lead).fill(null), ...w] : w))
// A month label sits over the first week that starts in that month,
// unless the next label is too close to fit (the partial first month).
const labels = weeks.map((w, i) => {
  const m = new Date(w.at(-1)[0] + 'T00:00:00').getMonth()
  const prev = i && new Date(weeks[i - 1].at(-1)[0] + 'T00:00:00').getMonth()
  return i === 0 || m !== prev ? months[m] : ''
}).map((l, i, all) => (l && (all[i + 1] || all[i + 2]) ? '' : l))

// On narrow screens the graph scrolls sideways; start at the most recent weeks.
const box = ref(null)
onMounted(() => { box.value.scrollLeft = box.value.scrollWidth })
const peak = Math.max(...data.years.map(y => y.total))
const shade = ['bg-muted', 'bg-primary/30', 'bg-primary/55', 'bg-primary/80', 'bg-primary']
</script>

<template>
  <section class="flex flex-col gap-5">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="font-mono text-sm"><span class="text-syn-keyword">##</span> GitHub activity</h2>
      <p class="font-mono text-xs text-muted-foreground">updated {{ data.fetchedAt }}</p>
    </div>
    <p class="max-w-[65ch] text-muted-foreground">
      <span class="font-semibold text-foreground">{{ fmt(data.total) }}</span> contributions in the last year.
      {{ fmt(data.private) }} of them are in private company repositories, so GitHub shows the counts but not the code.
    </p>

    <div ref="box" class="overflow-x-auto rounded-lg border bg-card p-4">
      <div class="flex w-max flex-col gap-1" role="img"
           :aria-label="`GitHub contribution graph: ${fmt(data.total)} contributions in the last year`">
        <div class="flex gap-[3px] pl-0 font-mono text-[10px] text-muted-foreground" aria-hidden="true">
          <span v-for="(l, i) in labels" :key="i" class="w-[11px] overflow-visible whitespace-nowrap">{{ l }}</span>
        </div>
        <div class="flex gap-[3px]" aria-hidden="true">
          <div v-for="(w, i) in weeks" :key="i" class="flex flex-col gap-[3px]">
            <span v-for="(d, j) in w" :key="j" :title="d ? `${d[1]} contributions on ${d[0]}` : undefined"
                  :class="['size-[11px] rounded-[2px]', d ? shade[d[2]] : 'bg-transparent']"></span>
          </div>
        </div>
        <div class="flex items-center justify-end gap-1 pt-1 font-mono text-[10px] text-muted-foreground" aria-hidden="true">
          Less <span v-for="s in shade" :key="s" :class="['size-[11px] rounded-[2px]', s]"></span> More
        </div>
      </div>
    </div>

    <dl class="grid gap-2">
      <div v-for="y in data.years" :key="y.year" class="grid grid-cols-[3rem_minmax(0,1fr)_4rem] items-center gap-3 text-sm">
        <dt class="font-mono text-muted-foreground">{{ y.year }}</dt>
        <dd class="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div class="h-full rounded-full bg-primary" :style="{ width: `${(y.total / peak) * 100}%` }"></div>
        </dd>
        <dd class="text-right font-mono tabular-nums">{{ fmt(y.total) }}</dd>
      </div>
    </dl>
    <p class="text-xs text-muted-foreground">
      Contributions per calendar year. {{ data.years[0].year }} starts in March, when I joined Ayahtek;
      {{ data.years.at(-1).year }} runs to {{ data.fetchedAt }}.
    </p>
  </section>
</template>
