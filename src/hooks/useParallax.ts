import { useEffect } from 'react'
import type { RefObject } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import { subscribeScroll } from '../lib/scrollEngine'

/**
 * Writes `--parallax` (px) on the element: it drifts against the scroll
 * direction by `speed` px per px of distance from the viewport center.
 * Pair with the `parallax` utility class. Only computed while near the viewport.
 */
export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>, speed = 0.08) {
  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    let offset = 0
    let active = false
    return subscribeScroll({
      read() {
        const rect = element.getBoundingClientRect()
        const viewport = window.innerHeight
        active = rect.bottom > -viewport && rect.top < viewport * 2
        if (active) offset = (rect.top + rect.height / 2 - viewport / 2) * -speed
      },
      write() {
        if (active) element.style.setProperty('--parallax', `${offset.toFixed(1)}px`)
      },
    })
  }, [ref, speed])
}
