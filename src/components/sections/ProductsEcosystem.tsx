import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionEyebrow from '../ui/SectionEyebrow'
import SplitText from '../ui/SplitText'
import OrbitDiagram from './OrbitDiagram'
import { architecturalPillars, audiencePillars } from '../../data/ecosystem'

function ProductsEcosystem() {
  return (
    <section
      aria-labelledby="products-title"
      className="relative scroll-mt-header bg-ground py-section"
      id="products-section"
    >
      <div className="relative mx-auto max-w-site px-page">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--spacing-gutter)]">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionEyebrow>Enterprise SaaS Architecture</SectionEyebrow>
            </Reveal>
            <SplitText as="h2" className="mt-6 text-display-md text-fg-soft" id="products-title" text="Products" />
            <SplitText as="p" className="mt-2 font-display text-display-lg text-signal" delay={150} text="RewardForPromo" />
          </div>
          <Reveal as="p" className="text-lede text-fg-soft lg:col-span-5" delay={250}>
            RewardForPromo (R4P) is a SaaS platform powered by an AI-based recommendation engine that assists
            businesses in expanding their social media reach and increasing sales by transforming current customers
            (nano-influencers) into brand advocates.
          </Reveal>
        </div>

        <div className="mt-20 grid gap-y-16 lg:mt-28 lg:grid-cols-12 lg:items-start lg:gap-x-[var(--spacing-gutter)]">
          <Reveal className="lg:col-span-6" variant="fade">
            <div className="mb-8 text-center">
              <span className="font-mono text-label uppercase text-fg-mute">Decentralized Synergy</span>
              <h3 className="mt-2 text-title text-fg">RewardForPromo Ecosystem</h3>
            </div>
            <OrbitDiagram />
            <p className="mx-auto mt-8 max-w-sm text-center text-small text-fg-mute">
              Autonomous AI Routing connecting Nano-Influencers with Regional Commerce
            </p>
          </Reveal>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <ul className="border-t border-line-strong">
              {audiencePillars.map((pillar, index) => (
                <Reveal as="li" className="group border-b border-line py-9" delay={index * 90} key={pillar.title}>
                  <div className="flex items-start gap-5">
                    <Icon
                      className="mt-0.5 text-icon-28 text-fg-mute transition-base group-hover:text-signal"
                      name={pillar.icon}
                    />
                    <div>
                      <h3 className="text-title text-fg transition-base group-hover:translate-x-1">{pillar.title}</h3>
                      <p className="mt-2 text-body text-fg-soft">{pillar.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal as="ul" className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3" delay={200}>
              {architecturalPillars.map((pillar) => (
                <li className="group flex items-center gap-3 bg-ground p-4" key={pillar.label}>
                  <Icon
                    className="text-icon-20 text-signal transition-base group-hover:scale-110"
                    name={pillar.icon}
                  />
                  <span className="text-small font-medium text-fg">{pillar.label}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsEcosystem
