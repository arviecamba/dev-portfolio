import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, Draggable, SplitText)
// Pages scroll inside the editor panel, not the window.
ScrollTrigger.defaults({ scroller: '#editor' })

// With "reduce motion" on (also set by Windows when animation effects are off),
// things fade instead of moving.
export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const lift = y => (reduced() ? 0 : y)

// v-reveal fades an element up when it scrolls into view. v-reveal="'children'" staggers its children instead.
export const reveal = {
  mounted(el, { value }) {
    el._reveal = gsap.from(value === 'children' ? el.children : el, {
      y: lift(28), autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  },
  unmounted(el) {
    el._reveal?.scrollTrigger?.kill()
    el._reveal?.kill()
  },
}

export { gsap, ScrollTrigger, Draggable, SplitText }
