import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import TeamMemberCard from './TeamMemberCard'
import { teamMembers } from '../../data/team'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

/** Three copies of the roster let the strip loop seamlessly in either direction. */
const COPIES = [0, 1, 2]
const DRIFT_PX_PER_MS = 0.03
const DRAG_THRESHOLD_PX = 4
const EXTERNAL_SCROLL_PX = 2
const RESUME_DELAY_MS = 1200

const controlClass =
  'grid size-11 place-items-center rounded-sm border border-line-strong text-fg transition-base hover:bg-fg hover:text-ground'

const setWidth = (track: HTMLDivElement) => track.scrollWidth / COPIES.length

// Keep the viewport inside the middle copy so there is always content on both sides.
function normalize(track: HTMLDivElement) {
  const width = setWidth(track)
  if (track.scrollLeft < width * 0.5) track.scrollLeft += width
  else if (track.scrollLeft >= width * 1.5) track.scrollLeft -= width
}

function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [userPaused, setUserPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  // Interaction flags read by the animation loop (refs: changing them must not re-render).
  const hovering = useRef(false)
  const focusWithin = useRef(false)
  const dragging = useRef(false)
  const dragMoved = useRef(false)
  const dragOrigin = useRef({ x: 0, scrollLeft: 0 })
  const holdUntil = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.scrollLeft = setWidth(track)

    let settleTimer = 0
    const onScroll = () => {
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => normalize(track), 140)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(settleTimer)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track || reducedMotion || userPaused) return

    let frame = 0
    let last = performance.now()
    let position = track.scrollLeft
    let lastWritten = position

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 64)
      last = now

      // If something other than this loop moved the strip (touch, trackpad, keyboard), yield to it.
      if (Math.abs(track.scrollLeft - lastWritten) > EXTERNAL_SCROLL_PX) holdUntil.current = now + RESUME_DELAY_MS

      const suspended =
        hovering.current ||
        focusWithin.current ||
        dragging.current ||
        document.hidden ||
        now < holdUntil.current

      if (suspended) {
        position = track.scrollLeft
      } else {
        position += DRIFT_PX_PER_MS * elapsed
        const width = setWidth(track)
        if (position >= width * 1.5) position -= width
        track.scrollLeft = position
      }
      lastWritten = position
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reducedMotion, userPaused])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    normalize(track)
    const cards = track.querySelectorAll<HTMLElement>('[data-card]')
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 344
    holdUntil.current = performance.now() + 900
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !trackRef.current) return
    dragging.current = true
    dragMoved.current = false
    dragOrigin.current = { x: event.clientX, scrollLeft: trackRef.current.scrollLeft }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!dragging.current || !track) return

    const distance = event.clientX - dragOrigin.current.x
    if (!dragMoved.current && Math.abs(distance) > DRAG_THRESHOLD_PX) {
      dragMoved.current = true
      // Capture only once it is a real drag, so plain clicks on the social links still work.
      track.setPointerCapture(event.pointerId)
    }
    if (dragMoved.current) track.scrollLeft = dragOrigin.current.scrollLeft - distance
  }

  const endDrag = () => {
    dragging.current = false
  }

  return (
    <section
      aria-labelledby="team-title"
      className="tone-deep relative scroll-mt-header overflow-hidden bg-ground py-section"
      id="team"
    >
      <div className="relative mx-auto max-w-site px-page">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--spacing-gutter)]">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Leadership & Governance" title="Meet the Team" titleId="team-title" />
          </div>
          <Reveal
            as="p"
            className="border-l-2 border-signal pl-6 font-display text-display-sm text-fg lg:col-span-5"
            delay={200}
          >
            Talent wins games, but teamwork and intelligence win championships.
          </Reveal>
        </div>

        <div className="mt-14 flex items-center justify-end gap-3">
          <span className="mr-2 hidden font-mono text-label uppercase text-fg-mute sm:inline-block">
            Hover to pause
          </span>
          <button
            aria-label={userPaused ? 'Resume automatic scrolling' : 'Pause automatic scrolling'}
            aria-pressed={userPaused}
            className={cn(controlClass, userPaused && 'bg-fg text-ground')}
            onClick={() => setUserPaused((paused) => !paused)}
            type="button"
          >
            <Icon className="text-icon-20" name={userPaused ? 'play_arrow' : 'pause'} />
          </button>
          <button aria-label="Previous team member" className={controlClass} onClick={() => scrollByCard(-1)} type="button">
            <Icon className="text-icon-20" name="chevron_left" />
          </button>
          <button aria-label="Next team member" className={controlClass} onClick={() => scrollByCard(1)} type="button">
            <Icon className="text-icon-20" name="chevron_right" />
          </button>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-ground to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-ground to-transparent sm:w-24" />

        <div
          aria-label="Team members"
          className="no-scrollbar flex cursor-grab select-none items-stretch gap-6 overflow-x-auto px-page py-4 active:cursor-grabbing"
          onBlur={() => {
            focusWithin.current = false
          }}
          onClickCapture={(event) => {
            if (dragMoved.current) {
              event.preventDefault()
              event.stopPropagation()
              dragMoved.current = false
            }
          }}
          onFocus={() => {
            focusWithin.current = true
          }}
          onPointerCancel={endDrag}
          onPointerDown={handlePointerDown}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') hovering.current = true
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') hovering.current = false
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          ref={trackRef}
          role="region"
          tabIndex={0}
        >
          {COPIES.flatMap((copy) =>
            teamMembers.map((member) => (
              <TeamMemberCard duplicate={copy > 0} key={`${copy}-${member.name}`} member={member} />
            )),
          )}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
