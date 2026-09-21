import { useEffect } from 'react'
import type { RefObject } from 'react'
import { clamp01, prefersReducedMotion } from '../lib/motion'
import { subscribeScroll } from '../lib/scrollEngine'

interface ScrollProgressOptions {
  /** Viewport fraction (from the top) at which the element's top edge starts the effect (progress 0). */
  start?: number
  /** Viewport fraction at which the element's bottom edge completes the effect (progress 1). */
  end?: number
}

/**
 * Writes `--progress` (0..1) on the element as it scrolls through the viewport.
 * Styles read it in CSS, so scrolling never triggers a React re-render.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { start = 0.85, end = 0.35 }: ScrollProgressOptions = {},
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion()) {
      element.style.setProperty('--progress', '1')
      return
    }

    let value = 0
    return subscribeScroll({
      read() {
        const rect = element.getBoundingClientRect()
        const viewport = window.innerHeight
        value = clamp01((viewport * start - rect.top) / (viewport * (start - end) + rect.height))
      },
      write() {
        element.style.setProperty('--progress', value.toFixed(3))
      },
    })
  }, [ref, start, end])
}
