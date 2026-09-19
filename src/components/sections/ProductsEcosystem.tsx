import Icon from '../ui/Icon'
import SectionEyebrow from '../ui/SectionEyebrow'
import OrbitDiagram from './OrbitDiagram'
import { architecturalPillars, audiencePillars } from '../../data/ecosystem'

function ProductsEcosystem() {
  return (
    <section className="w-full py-24 bg-surface relative scroll-mt-24" id="products-section">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-3xl mb-16">
          <SectionEyebrow className="mb-2">Enterprise SaaS Architecture</SectionEyebrow>
          <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mb-2">Products</h2>
          <p className="font-headline-lg text-headline-lg font-semibold text-secondary mb-4">RewardForPromo</p>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            RewardForPromo (R4P) is a SaaS platform powered by an AI-based recommendation engine that assists
            businesses in expanding their social media reach and increasing sales by transforming current customers
            (nano-influencers) into brand advocates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-8 shadow-sm relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="font-eyebrow text-eyebrow uppercase tracking-wider text-on-surface-variant">
                  Decentralized Synergy
                </span>
                <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  RewardForPromo Ecosystem
                </h4>
              </div>
              <OrbitDiagram />
              <div className="mt-6 pt-4 text-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Autonomous AI Routing connecting Nano-Influencers with Regional Commerce
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col space-y-6">
            {audiencePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
                    <Icon name={pillar.icon} className="text-icon-26" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      {pillar.title} <span className="font-body-md font-normal text-on-surface-variant">{pillar.description}</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {architecturalPillars.map((pillar) => (
                <div key={pillar.label} className="p-4 rounded-xl bg-surface-container flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary">
                    <Icon name={pillar.icon} className="text-icon-20" />
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface">{pillar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsEcosystem
