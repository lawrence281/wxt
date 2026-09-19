import type { MouseEvent } from 'react'

/**
 * Smooth-scrolls to the element targeted by a `#id` href, relying on each
 * section's `scroll-mt-*` class to keep it clear of the fixed header.
 * Falls back to the browser's native anchor jump for non-hash hrefs (e.g. "#").
 */
export function scrollToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#') || href.length <= 1) return

  const id = href.slice(1)
  const target = document.getElementById(id)
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (history.pushState) {
    history.pushState(null, '', href)
  }
}
