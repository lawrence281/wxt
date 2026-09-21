import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { observeInView } from '../lib/inView'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const stop = observeInView(
      element,
      (entry) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) stop()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    return stop
  }, [ref, threshold, rootMargin, once])

  return inView
}
