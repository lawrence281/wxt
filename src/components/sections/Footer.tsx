import { useState } from 'react'
import type { FormEvent } from 'react'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import SocialIcon from '../ui/SocialIcon'
import type { SocialPlatform } from '../ui/SocialIcon'
import { footerLinks } from '../../data/navigation'

const socialLinks: { icon: SocialPlatform; href: string; label: string }[] = [
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
]

const columnTitle = 'font-mono text-label uppercase text-fg-mute'
const footerLink = 'text-fg transition-fast hover:text-signal'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="tone-night relative overflow-hidden bg-ground text-fg">
      <div className="relative mx-auto max-w-site px-page pt-section">
        <div className="grid gap-x-[var(--spacing-gutter)] gap-y-12 border-t border-line-strong pt-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-small text-fg-soft">
              Pioneering high-performance B2B digital infrastructure, combining mathematical precision with
              human-centric social connectivity.
            </p>
            <ul className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    aria-label={`WX Technologies on ${social.label}`}
                    className="grid size-11 place-items-center rounded-sm border border-line-strong text-fg transition-base hover:-translate-y-0.5 hover:border-accent-bright hover:bg-accent-bright hover:text-night"
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={social.label}
                  >
                    <SocialIcon className="size-[1.125rem]" name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h2 className={columnTitle}>Contact Us</h2>
            <ul className="space-y-3.5 text-small text-fg-soft">
              <li className="flex items-start gap-3">
                <Icon className="mt-0.5 text-icon-18 text-signal" name="location_on" />
                <span>No 1C, 94th St, 21st Ave, Ashok Nagar, Chennai 600083</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon className="text-icon-18 text-signal" name="call" />
                <span>
                  Gen:{' '}
                  <a className={footerLink} href="tel:+919884021323">
                    +91 9884021323
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon className="text-icon-18 text-signal" name="mail" />
                <span>
                  Sales:{' '}
                  <a className={footerLink} href="mailto:info@wxt.global">
                    info@wxt.global
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon className="text-icon-18 text-signal" name="support_agent" />
                <span>
                  Support:{' '}
                  <a className={footerLink} href="mailto:info@wxt.global">
                    info@wxt.global
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-2">
            <h2 className={columnTitle}>Quick Links</h2>
            <nav aria-label="Footer">
              <ul className="space-y-3 text-small">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a className={`${footerLink} link-underline`} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-3">
            <h2 className={columnTitle}>Stay Informed</h2>
            <p className="text-small text-fg-soft">
              Sign up to get the latest news on our product and enterprise innovations.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" onSubmit={handleSubscribe}>
              <input
                aria-label="Email address"
                className="min-h-12 w-full min-w-0 border-b border-line-strong bg-transparent px-1 text-small text-fg transition-base placeholder:text-fg-mute focus:border-signal focus:outline-none"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <button className="btn btn-primary min-h-12 shrink-0" type="submit">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-small text-signal" role="status">
                Thanks — you're on the list.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-small text-fg-mute sm:flex-row">
          <p>© 2023 by WX Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-label uppercase">
            <a className="transition-fast hover:text-signal" href="#">
              Privacy
            </a>
            <a className="transition-fast hover:text-signal" href="#">
              Terms
            </a>
            <a className="transition-fast hover:text-signal" href="#contact">
              Support
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-text="WX Technologies"
        className="pointer-events-none select-none overflow-hidden whitespace-nowrap px-page pb-2 text-center font-display text-[clamp(2.5rem,12.6vw,14rem)] font-semibold leading-[0.8] tracking-tighter text-fg/[0.06] before:content-[attr(data-text)]"
      />
    </footer>
  )
}

export default Footer
