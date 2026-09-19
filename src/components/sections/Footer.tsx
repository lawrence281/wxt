import { useState } from 'react'
import Icon from '../ui/Icon'
import SocialIcon from '../ui/SocialIcon'
import type { SocialPlatform } from '../ui/SocialIcon'
import { footerLinks } from '../../data/navigation'

const socialLinks: { icon: SocialPlatform; href: string; label: string }[] = [
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="w-full bg-surface-container-lowest shadow-bar">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-desktop">
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <a className="flex items-center gap-3 focus:outline-none" href="#">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                <Icon name="hub" className="text-icon-20" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
                  WX Technologies
                </span>
                <span className="font-eyebrow text-eyebrow text-on-surface-variant uppercase tracking-widest mt-1">
                  People &amp; Technology
                </span>
              </div>
            </a>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Pioneering high-performance B2B digital infrastructure, combining mathematical precision with
              human-centric social connectivity.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  aria-label={`WX Technologies on ${social.label}`}
                  className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-all duration-200 hover:bg-secondary hover:text-on-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95"
                  href={social.href}
                  key={social.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={social.label}
                >
                  <SocialIcon className="w-[18px] h-[18px]" name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-eyebrow text-eyebrow uppercase tracking-wider text-on-surface">Contact Us</h4>
            <div className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-2">
                <Icon name="location_on" className="text-icon-18 text-secondary shrink-0 mt-0.5" />
                <span>No 1C, 94th St, 21st Ave, Ashok Nagar, Chennai 600083</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="call" className="text-icon-18 text-secondary shrink-0" />
                <span>
                  Gen:{' '}
                  <a className="text-on-surface hover:text-secondary transition-colors" href="tel:+919884021323">
                    +91 9884021323
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="mail" className="text-icon-18 text-secondary shrink-0" />
                <span>
                  Sales:{' '}
                  <a className="text-on-surface hover:text-secondary transition-colors" href="mailto:info@wxt.global">
                    info@wxt.global
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="support_agent" className="text-icon-18 text-secondary shrink-0" />
                <span>
                  Support:{' '}
                  <a className="text-on-surface hover:text-secondary transition-colors" href="mailto:info@wxt.global">
                    info@wxt.global
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col space-y-3">
            <h4 className="font-eyebrow text-eyebrow uppercase tracking-wider text-on-surface">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h4 className="font-eyebrow text-eyebrow uppercase tracking-wider text-on-surface">Stay Informed</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sign up to get the latest news on our product and enterprise innovations.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 pt-1" onSubmit={handleSubscribe}>
              <input
                className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all duration-200"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <button
                className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-secondary transition-colors duration-150 whitespace-nowrap"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="font-body-sm text-body-sm text-secondary">Thanks — you&apos;re on the list.</p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2023 by WX Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm">
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Privacy
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Terms
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#contact">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
