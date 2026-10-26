// Which portfolio layout the visitor sees: the VS Code workspace (default) or the plain site.
import { ref, watch } from 'vue'

const read = key => { try { return localStorage.getItem(key) } catch { return null } }
const write = (key, value) => { try { localStorage.setItem(key, value) } catch {} }

export const view = ref(read('view') === 'professional' ? 'professional' : 'developer')

// The "you can switch views" hint shows until the visitor closes it or switches once.
export const hintSeen = ref(read('view-hint') === '1')
export function dismissHint() { hintSeen.value = true; write('view-hint', '1') }

watch(view, v => {
  write('view', v)
  dismissHint()
  // Visitors who never picked a theme get each view's default: Dark+ for Developer, light for Professional.
  if (!read('theme')) document.documentElement.classList.toggle('dark', v === 'developer')
})
