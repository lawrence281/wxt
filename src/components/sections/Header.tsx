import { useState } from 'react'
import type { MouseEvent } from 'react'
import Icon from '../ui/Icon'
import { moreNavLinks, primaryNavLinks } from '../../data/navigation'
import { scrollToHash } from '../../utils/scrollToHash'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToHash(event, href)
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-bar">
      <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between">
        <a className="flex items-center gap-3 group focus:outline-none" href="#">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
            <img src="/favicon.svg" alt="WX Technologies" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none group-hover:text-secondary transition-colors duration-150">
              WX Technologies
            </span>
            <span className="font-eyebrow text-eyebrow text-on-surface-variant uppercase tracking-widest mt-1">
              People &amp; Technology
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryNavLinks.map((link) => (
            <a
              key={link.label}
              aria-current={link.label === 'Home' ? 'page' : undefined}
              className={
                link.label === 'Home'
                  ? 'px-3 py-2 transition-all duration-150 bg-surface-container text-secondary font-label-lg rounded-lg'
                  : 'px-3 py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-150'
              }
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-150 focus:outline-none"
              type="button"
            >
              <span>More</span>
              <Icon name="expand_more" className="text-icon-18 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 top-full mt-1.5 w-44 p-1.5 bg-surface-container-lowest rounded-xl shadow-popover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {moreNavLinks.map((link) => (
                <a
                  key={link.label}
                  className="flex items-center px-3 py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-all duration-150"
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-on-secondary-fixed-variant transition-all duration-200 shadow-cta hover:shadow-none"
            href="#contact"
            onClick={(event) => scrollToHash(event, '#contact')}
          >
            Quick Inquiry
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <Icon name="person" className="text-on-primary text-icon-18" />
          </div>
          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="text-icon-22" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-margin py-3 flex flex-col gap-1">
          {[...primaryNavLinks, ...moreNavLinks].map((link) => (
            <a
              key={link.label}
              className="px-3 py-2.5 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-all duration-150"
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
