import { useLayoutEffect, useRef, useSyncExternalStore } from 'react'

/**
 * Minimal History-API router: the site only has a handful of static routes,
 * so a dependency-free implementation keeps the bundle small.
 */
type NavigationKind = 'push' | 'pop' | 'replace'

const NAVIGATE_EVENT = 'wxt:navigate'
const INITIAL_KEY = 'initial'

let lastKind: NavigationKind = 'push'
let currentKey: string = window.history.state?.key ?? INITIAL_KEY
let keyCounter = 0
const scrollPositions = new Map<string, number>()

// Remember the scroll offset of every history entry so back/forward can restore it.
window.addEventListener(
  'scroll',
  () => {
    scrollPositions.set(currentKey, window.scrollY)
  },
  { passive: true },
)
window.addEventListener('popstate', () => {
  lastKind = 'pop'
  currentKey = window.history.state?.key ?? INITIAL_KEY
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
})

export function normalizePath(pathname: string): string {
  const lowered = pathname.toLowerCase()
  return lowered.length > 1 ? lowered.replace(/\/+$/, '') : lowered
}

export function navigate(to: string, { replace = false }: { replace?: boolean } = {}) {
  const url = new URL(to, window.location.href)
  const target = url.pathname + url.search + url.hash

  lastKind = replace ? 'replace' : 'push'
  currentKey = `${INITIAL_KEY}-${++keyCounter}`
  const state = { key: currentKey }
  if (replace) window.history.replaceState(state, '', target)
  else window.history.pushState(state, '', target)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function usePathname(): string {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener(NAVIGATE_EVENT, onChange)
      return () => window.removeEventListener(NAVIGATE_EVENT, onChange)
    },
    () => normalizePath(window.location.pathname),
    () => '/',
  )
}

/** Hash-only links (e.g. "#contact") point at the home page sections, so off the home page they become "/#contact". */
export function resolveHref(href: string, pathname: string): string {
  return href.startsWith('#') && href.length > 1 && pathname !== '/' ? `/${href}` : href
}

export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

function scrollToHashTarget(): boolean {
  const hash = window.location.hash
  if (hash.length <= 1) return false
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return false
  target.scrollIntoView({ behavior: 'instant', block: 'start' })
  return true
}

/**
 * After a route change: restore the saved offset on back/forward, jump to the
 * hash target when there is one, otherwise start the new page at the top.
 */
export function useRouteScroll(pathname: string) {
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      scrollToHashTarget()
      return
    }
    if (lastKind === 'replace') return
    if (lastKind === 'pop') {
      window.scrollTo({ top: scrollPositions.get(currentKey) ?? 0, behavior: 'instant' })
      return
    }
    if (!scrollToHashTarget()) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}
