import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import ScrollProgress from '../ui/ScrollProgress'
import { moreNavLinks, primaryNavLinks } from '../../data/navigation'
import { observeInView } from '../../lib/inView'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../utils/scrollToHash'

const SECTION_IDS = ['home', 'about', 'products-section', 'team', 'contact']
const mobileLinks = [...primaryNavLinks, ...moreNavLinks]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const moreRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToHash(event, href)
    setMobileOpen(false)
    setMoreOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: whichever section crosses a thin band at mid-viewport becomes the active link.
  useEffect(() => {
    const stops = SECTION_IDS.flatMap((id) => {
      const section = document.getElementById(id)
      if (!section) return []
      return [
        observeInView(
          section,
          (entry) => {
            if (entry.isIntersecting) setActiveId(id)
          },
          { rootMargin: '-45% 0px -54% 0px' },
        ),
      ]
    })
    return () => stops.forEach((stop) => stop())
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  // Close the mobile menu if the viewport grows into the desktop layout while it is open.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!mobileOpen && !moreOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      setMoreOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (moreOpen && !moreRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [mobileOpen, moreOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-base',
          scrolled ? 'border-line bg-ground/85 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto grid max-w-site grid-cols-[1fr_auto] items-center px-page transition-[height] duration-(--duration-base) ease-out-expo lg:grid-cols-[1fr_auto_1fr]',
            scrolled ? 'h-16' : 'h-header',
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNavLinks.map((link) => {
              const isActive = link.href === `#${activeId}`
              return (
                <a
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'group relative px-4 py-2 text-small font-medium transition-fast',
                    isActive ? 'text-fg' : 'text-fg-soft hover:text-fg',
                  )}
                  href={link.href}
                  key={link.label}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-4 bottom-1 h-px origin-left bg-signal transition-base',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </a>
              )
            })}

            <div
              className="relative"
              onPointerEnter={(event) => event.pointerType === 'mouse' && setMoreOpen(true)}
              onPointerLeave={(event) => event.pointerType === 'mouse' && setMoreOpen(false)}
              ref={moreRef}
            >
              <button
                aria-controls="more-menu"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 px-4 py-2 text-small font-medium text-fg-soft transition-fast hover:text-fg"
                onClick={() => setMoreOpen((open) => !open)}
                type="button"
              >
                <span>More</span>
                <Icon
                  className={cn('text-icon-18 transition-base', moreOpen && 'rotate-180')}
                  name="expand_more"
                />
              </button>
              <div
                className={cn(
                  'absolute right-0 top-full w-52 pt-2 transition-base',
                  moreOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                )}
                id="more-menu"
              >
                <ul className="border border-line bg-raised p-1.5 shadow-lift">
                  {moreNavLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        className="flex items-center justify-between rounded-xs px-3 py-2.5 text-small font-medium text-fg-soft transition-fast hover:bg-ground hover:text-fg"
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                      >
                        {link.label}
                        <Icon className="text-icon-16" name="arrow_outward" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Button
              className="hidden min-h-10 px-5 sm:inline-flex"
              href="#contact"
              onClick={(event) => scrollToHash(event, '#contact')}
            >
              Quick Inquiry
            </Button>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-pill border border-line-strong text-fg"
            >
              <Icon className="text-icon-20" name="person" />
            </span>
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="relative grid size-10 place-items-center lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-px w-6 bg-fg transition-base',
                  mobileOpen ? 'translate-y-0 rotate-45' : '-translate-y-[0.3rem]',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-px w-6 bg-fg transition-base',
                  mobileOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[0.3rem]',
                )}
              />
            </button>
          </div>
        </div>

        <ScrollProgress />
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ground px-page pb-10 pt-[calc(var(--spacing-header)+1rem)] transition-[opacity,visibility] duration-(--duration-base) lg:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        id="mobile-menu"
        inert={!mobileOpen}
      >
        <nav aria-label="Mobile">
          <ul className="border-t border-line">
            {mobileLinks.map((link, index) => (
              <li className="overflow-hidden border-b border-line" key={link.label}>
                <a
                  className={cn(
                    'flex items-center justify-between py-5 font-display text-display-md text-fg transition-slow',
                    mobileOpen ? 'translate-y-0' : 'translate-y-full',
                  )}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  style={{ transitionDelay: mobileOpen ? `${120 + index * 60}ms` : '0ms' } as CSSProperties}
                >
                  {link.label}
                  <Icon className="text-icon-24 text-signal" name="arrow_outward" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          arrow
          className="mt-10 w-full sm:hidden"
          href="#contact"
          onClick={(event) => handleNavClick(event, '#contact')}
        >
          Quick Inquiry
        </Button>
      </div>
    </>
  )
}

export default Header
