// Workspace state: which files exist, which tabs are open, and which panels are showing.
import { reactive } from 'vue'
import { projects } from './data'

// Explorer entries. Each file is a real route.
export const files = [
  { path: '/', name: 'about.md', lang: 'Markdown' },
  { path: '/projects', name: 'projects', folder: true, lang: 'Folder' },
  { path: '/experience', name: 'experience.md', lang: 'Markdown' },
  { path: '/skills', name: 'skills.ts', lang: 'TypeScript' },
  { path: '/resume', name: 'resume.pdf', lang: 'PDF' },
  { path: '/contact', name: 'contact.md', lang: 'Markdown' },
]

export const projectPath = p => `/projects/${p.slug}`

// The file shown for a route, or undefined for unknown paths.
export function fileFor(path) {
  const slug = path.match(/^\/projects\/([^/]+)$/)?.[1]
  if (slug) {
    const p = projects.find(x => x.slug === slug)
    return p && { path, name: `${slug}.md`, parent: 'projects', title: p.name, lang: 'Markdown' }
  }
  return files.find(f => f.path === path)
}

const KEY = 'open-tabs'
function loadTabs() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved)) return saved.filter(p => typeof p === 'string' && fileFor(p))
  } catch {}
  return ['/']
}
function saveTabs() {
  try { localStorage.setItem(KEY, JSON.stringify(tabs)) } catch {}
}

export const tabs = reactive(loadTabs())

export function openTab(path) {
  if (fileFor(path) && !tabs.includes(path)) { tabs.push(path); saveTabs() }
}

// Closes a tab. Returns the path to show next when the closed tab was the active one.
export function closeTab(path, active) {
  const i = tabs.indexOf(path)
  if (i < 0) return null
  tabs.splice(i, 1)
  saveTabs()
  if (path !== active) return null
  return tabs[Math.min(i, tabs.length - 1)] ?? '/'
}

// sidebar: 'explorer' | 'search' | null (collapsed). drawer: the phone menu.
export const ui = reactive({ sidebar: 'explorer', drawer: false, terminal: false, searchFocus: 0 })

// Opens the search panel and asks it to focus its input.
export function openSearch(isDesktop) {
  ui.sidebar = 'search'
  if (!isDesktop) ui.drawer = true
  ui.searchFocus++
}
