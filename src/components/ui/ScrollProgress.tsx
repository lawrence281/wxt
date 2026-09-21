import { useEffect, useRef } from 'react'
import { subscribeScroll } from '../../lib/scrollEngine'

/** Thin page-progress line, meant to sit on the bottom edge of the header. */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let progress = 0
    return subscribeScroll({
      read() {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      },
      write() {
        bar.style.transform = `scaleX(${progress.toFixed(4)})`
      },
    })
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5">
      <div
        className="h-full origin-left bg-signal will-change-transform"
        ref={barRef}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

export default ScrollProgress
