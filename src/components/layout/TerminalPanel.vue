<script setup>
// A pretend terminal for moving around the portfolio. It only knows the commands below
// and never runs anything real.
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { X, Trash2 } from '@lucide/vue'
import { ui } from '../../workspace'
import { profile, projects } from '../../data'

const router = useRouter()
const input = ref(null)
const body = ref(null)
const cmd = ref('')
const lines = ref([{ kind: 'out', text: 'Type "help" to list commands. Use ↑ ↓ for history and Tab to complete.' }])
const history = []
let back = 0

const go = (path, text) => { router.push(path); return text }
const commands = {
  help: () => [
    'help                 list commands',
    'whoami               who I am',
    'about                open about.md',
    'projects             list projects and open projects/',
    'open <project>       open a project, e.g. open pet-booking',
    'experience           open experience.md',
    'skills               open skills.ts',
    'contact              open contact.md',
    'resume               open resume.pdf',
    'clear                clear the terminal',
  ].join('\n'),
  whoami: () => `${profile.fullName}\n${profile.title.split(' | ')[0]} at ${profile.company} since ${profile.since}. Laravel, Vue.js and Nuxt.js.`,
  about: () => go('/', 'Opened about.md'),
  projects: () => go('/projects', projects.map(p => `  ${p.slug.padEnd(18)}${p.name}`).join('\n') + '\n\nOpen one with: open <project>'),
  open: arg => {
    if (!arg) return { err: 'Usage: open <project>. Type "projects" to list them.' }
    const p = projects.find(x => x.slug === arg)
    return p ? go(`/projects/${p.slug}`, `Opened ${p.slug}.md`) : { err: `No project named "${arg}". Type "projects" to list them.` }
  },
  experience: () => go('/experience', 'Opened experience.md'),
  skills: () => go('/skills', 'Opened skills.ts'),
  contact: () => go('/contact', `Opened contact.md\n${profile.email}`),
  resume: () => go('/resume', 'Opened resume.pdf'),
}

async function run() {
  const raw = cmd.value.trim()
  cmd.value = ''
  back = 0
  if (!raw) return
  history.push(raw)
  const [name, ...rest] = raw.split(/\s+/)
  if (name === 'clear') { lines.value = []; return }
  lines.value.push({ kind: 'in', text: raw })
  const fn = commands[name.toLowerCase()]
  const res = fn ? fn(rest.join(' ')) : { err: `command not found: ${name}. Type "help".` }
  lines.value.push(typeof res === 'string' ? { kind: 'out', text: res } : { kind: 'err', text: res.err })
  await nextTick()
  body.value.scrollTop = body.value.scrollHeight
}

function recall(step) {
  if (!history.length) return
  back = Math.min(history.length, Math.max(0, back + step))
  cmd.value = back ? history[history.length - back] : ''
}

// Tab completes only when there is something typed, so Tab still moves focus out of an empty prompt.
function complete(e) {
  if (e.shiftKey || !cmd.value.trim()) return
  e.preventDefault()
  const [name, arg] = cmd.value.trimStart().split(/\s+/, 2)
  const pool = arg !== undefined ? projects.map(p => p.slug) : [...Object.keys(commands), 'clear']
  const word = arg ?? name
  const hits = pool.filter(w => w.startsWith(word))
  if (hits.length === 1) cmd.value = arg !== undefined ? `${name} ${hits[0]}` : hits[0] + (hits[0] === 'open' ? ' ' : '')
  else if (hits.length > 1) lines.value.push({ kind: 'out', text: hits.join('  ') })
}

onMounted(() => input.value?.focus({ preventScroll: true }))
</script>

<template>
  <section aria-label="Terminal" class="flex h-full flex-col border-t bg-background">
    <div class="flex h-8 shrink-0 items-center gap-4 px-4 text-[11px] tracking-wider">
      <span class="border-b border-foreground pb-0.5 font-mono">TERMINAL</span>
      <span class="font-mono text-muted-foreground">portfolio</span>
      <div class="ml-auto flex gap-0.5">
        <button type="button" class="grid size-6 place-items-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Clear terminal" @click="lines = []"><Trash2 class="size-3.5" aria-hidden="true" /></button>
        <button type="button" class="grid size-6 place-items-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close terminal" @click="ui.terminal = false"><X class="size-3.5" aria-hidden="true" /></button>
      </div>
    </div>
    <div ref="body" class="min-h-0 flex-1 overflow-y-auto px-4 pb-2 font-mono text-[12.5px] leading-relaxed" @click="input.focus()">
      <div role="log" aria-live="polite">
        <pre v-for="(l, i) in lines" :key="i"
             :class="['whitespace-pre-wrap', l.kind === 'err' ? 'text-destructive' : l.kind === 'in' ? 'text-foreground' : 'text-muted-foreground']"><template v-if="l.kind === 'in'"><span class="text-syn-type">arvie@portfolio</span>:<span class="text-syn-keyword">~</span>$ </template>{{ l.text }}</pre>
      </div>
      <form class="flex items-center" @submit.prevent="run">
        <label for="term-input" class="shrink-0"><span class="text-syn-type">arvie@portfolio</span>:<span class="text-syn-keyword">~</span>$&nbsp;</label>
        <input id="term-input" ref="input" v-model="cmd" autocomplete="off" autocapitalize="off" spellcheck="false"
               class="min-w-0 flex-1 bg-transparent caret-primary outline-none"
               @keydown.up.prevent="recall(1)" @keydown.down.prevent="recall(-1)" @keydown.tab="complete"
               @keydown.esc="ui.terminal = false" />
      </form>
    </div>
  </section>
</template>
