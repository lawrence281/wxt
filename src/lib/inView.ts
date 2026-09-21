type InViewCallback = (entry: IntersectionObserverEntry) => void

interface InViewOptions {
  threshold?: number
  rootMargin?: string
}

interface ObserverGroup {
  observer: IntersectionObserver
  callbacks: Map<Element, InViewCallback>
}

// One IntersectionObserver per (threshold, rootMargin) pair, shared by every element that uses it.
const groups = new Map<string, ObserverGroup>()

export function observeInView(
  element: Element,
  callback: InViewCallback,
  { threshold = 0, rootMargin = '0px' }: InViewOptions = {},
): () => void {
  const key = `${threshold}|${rootMargin}`
  let group = groups.get(key)

  if (!group) {
    const callbacks = new Map<Element, InViewCallback>()
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => callbacks.get(entry.target)?.(entry)),
      { threshold, rootMargin },
    )
    group = { observer, callbacks }
    groups.set(key, group)
  }

  const active = group
  active.callbacks.set(element, callback)
  active.observer.observe(element)

  return () => {
    active.callbacks.delete(element)
    active.observer.unobserve(element)
  }
}
