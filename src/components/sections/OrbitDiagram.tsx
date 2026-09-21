import { useRef } from 'react'
import type { CSSProperties } from 'react'
import Icon from '../ui/Icon'
import SocialIcon from '../ui/SocialIcon'
import { orbitNodes, orbitSocialLinks } from '../../data/ecosystem'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

const PAUSE_ON_HOVER = 'group-hover/orbit:[animation-play-state:paused]'

function OrbitDiagram() {
  const outerRingRef = useRef<HTMLDivElement>(null)
  const outerRingVisible = useInView(outerRingRef, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' })

  return (
    <div className="@container group/orbit relative mx-auto flex aspect-square w-full max-w-[34rem] select-none items-center justify-center">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" fill="none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="115" stroke="var(--tone-line-strong)" />
        <circle cx="200" cy="200" r="70" stroke="var(--tone-line)" />
      </svg>

      <div className="relative z-20 flex size-[44%] flex-col items-center justify-center rounded-pill bg-accent p-2 text-center @sm:size-[37%] @sm:p-3 text-on-accent shadow-float ring-8 ring-ground transition-slow hover:scale-105">
        <span
          aria-hidden="true"
          className="absolute -inset-3 animate-ping-soft rounded-pill border border-accent/50"
        />
        <Icon className="mb-0.5 text-icon-20 @sm:mb-1 @sm:text-icon-28" name="supervised_user_circle" />
        <span className="font-display text-small font-semibold leading-tight @sm:text-title">Brand Advocacy</span>
        <span className="mt-1 font-mono text-[0.6875rem] uppercase leading-tight tracking-normal text-on-accent-soft @sm:text-label @sm:tracking-widest">Social Media Users</span>
      </div>

      {/* Outer ring: category nodes. Flies out from the center once scrolled into view, then holds still. */}
      <div
        className="orbit-ring pointer-events-none absolute inset-0 size-full"
        data-revealed={outerRingVisible}
        ref={outerRingRef}
      >
        <svg aria-hidden="true" className="absolute inset-0 size-full" fill="none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="160" stroke="var(--tone-line-strong)" strokeDasharray="3 7" />
        </svg>
        {orbitNodes.map((node) => (
          <div className={cn('pointer-events-auto absolute', node.position)} key={node.label}>
            <div className="group flex cursor-default flex-col items-center gap-1.5">
              <span className="grid size-10 place-items-center rounded-pill border border-line-strong bg-raised text-fg shadow-lift transition-base group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent sm:size-12">
                <Icon className="text-icon-20" name={node.icon} />
              </span>
              <span className="whitespace-nowrap font-mono text-label uppercase text-fg-soft transition-fast group-hover:text-signal">
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/*
        Inner ring: social icons rotating along the r=115 guide circle. The rotating anchor has zero size and each
        icon is placed with rotate() + translateY(radius), so no large box ever rotates (large nested rotating
        boxes inflate the page's scrollable overflow in Blink and widen the mobile layout viewport).
      */}
      <div
        className={cn('pointer-events-none absolute left-1/2 top-1/2 size-0 animate-orbit', PAUSE_ON_HOVER)}
        style={{ '--orbit-radius': '28.75cqw' } as CSSProperties}
      >
        {orbitSocialLinks.map((social, index) => {
          const angle = (360 / orbitSocialLinks.length) * index
          return (
            <div
              className="absolute left-0 top-0"
              key={social.label}
              style={{ transform: `rotate(${angle}deg) translateY(calc(var(--orbit-radius) * -1))` } as CSSProperties}
            >
              <div style={{ transform: `rotate(${-angle}deg)` } as CSSProperties}>
                <div
                  className={cn(
                    'pointer-events-auto -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse',
                    PAUSE_ON_HOVER,
                  )}
                >
                  <a
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-pill border border-line-strong bg-raised text-fg shadow-lift transition-base hover:scale-110 hover:border-accent hover:bg-accent hover:text-on-accent"
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={social.label}
                  >
                    <SocialIcon className="size-4" name={social.icon} />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrbitDiagram
