import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'
import { businessVerticals } from '../../data/verticals'

function TrustedVerticals() {
  return (
    <section
      aria-labelledby="verticals-title"
      className="tone-accent relative overflow-hidden bg-ground py-section text-fg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[24rem] -right-[18rem] size-[48rem] rounded-pill border border-line"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[16rem] -right-[10rem] size-[32rem] rounded-pill border border-dashed border-line"
      />

      <div className="relative mx-auto max-w-site px-page">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--spacing-gutter)]">
          <SplitText
            as="h2"
            className="text-display-lg text-fg lg:col-span-7"
            id="verticals-title"
            text="Trusted Among Business Verticals"
          />
          <Reveal as="p" className="text-lede text-fg-soft lg:col-span-4 lg:col-start-9" delay={200}>
            Accelerating social brand velocity across essential consumer and non-commercial sectors
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line-strong lg:mt-24">
          {businessVerticals.map((vertical, index) => (
            <Reveal as="li" className="group relative border-b border-line-strong" delay={index * 80} key={vertical.title}>
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-night transition-base group-hover:scale-y-100"
              />
              <div className="relative flex items-center justify-between gap-6 py-6 transition-base group-hover:translate-x-4 sm:py-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-10">
                  <span className="font-display text-display-md text-fg">{vertical.title}</span>
                  <span className="font-mono text-label uppercase text-fg-soft">{vertical.subtitle}</span>
                </div>
                <Icon className="text-icon-32 text-fg-soft transition-base group-hover:text-fg" name={vertical.icon} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TrustedVerticals
