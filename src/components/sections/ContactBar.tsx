import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionEyebrow from '../ui/SectionEyebrow'
import SplitText from '../ui/SplitText'

const contactLinks = [
  { icon: 'call', label: '+91 9884021323', href: 'tel:+919884021323' },
  { icon: 'mail', label: 'info@wxt.global', href: 'mailto:info@wxt.global' },
]

function ContactBar() {
  return (
    <section
      aria-labelledby="contact-title"
      className="tone-night relative scroll-mt-header overflow-hidden bg-ground pt-section text-fg"
      id="contact"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20rem] top-1/2 size-[52rem] -translate-y-1/2 rounded-pill border border-line"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12rem] top-1/2 size-[36rem] -translate-y-1/2 rounded-pill border border-dashed border-line"
      />

      <div className="relative mx-auto max-w-site px-page">
        <Reveal>
          <SectionEyebrow>Ready to Transform Your Reach?</SectionEyebrow>
        </Reveal>
        <SplitText
          as="h2"
          className="mt-8 max-w-4xl text-display-xl text-fg"
          id="contact-title"
          text="Let's Connect People and Technology"
        />

        <div className="mt-16 grid gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <Reveal as="p" className="text-lede text-fg-soft lg:col-span-4" delay={150}>
            Reach out to our Chennai headquarters to deploy RewardForPromo across your brand's distribution networks.
          </Reveal>

          <ul className="border-t border-line-strong lg:col-span-7 lg:col-start-6">
            {contactLinks.map((link, index) => (
              <Reveal as="li" className="border-b border-line" delay={index * 100} key={link.href}>
                <a className="group flex items-center justify-between gap-6 py-7 sm:py-9" href={link.href}>
                  <span className="flex items-center gap-5">
                    <Icon
                      className="text-icon-28 text-signal transition-base group-hover:scale-110"
                      name={link.icon}
                    />
                    <span className="link-underline font-display text-display-sm text-fg group-hover:bg-[size:100%_1px]">
                      {link.label}
                    </span>
                  </span>
                  <Icon
                    className="text-icon-28 text-fg-mute transition-base group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal"
                    name="arrow_outward"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ContactBar
