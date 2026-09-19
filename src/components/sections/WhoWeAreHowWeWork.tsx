import Icon from '../ui/Icon'
import SectionEyebrow from '../ui/SectionEyebrow'
import { processSteps } from '../../data/processSteps'

function WhoWeAreHowWeWork() {
  return (
    <section
      className="w-full bg-primary-container text-on-primary-container py-24 relative overflow-hidden scroll-mt-24"
      id="about"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col space-y-12">
            <div className="space-y-4">
              <SectionEyebrow tone="dark">Core Identity</SectionEyebrow>
              <h2 className="font-headline-xl text-headline-xl font-bold text-white tracking-tight">Who We Are</h2>
              <p className="font-body-lg text-body-lg text-slate-300 leading-relaxed">
                We are WXT. We love people. We love technology. We design newer ways to seamlessly connect the two,
                to create advancement for both.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <SectionEyebrow tone="dark">Capabilities</SectionEyebrow>
              <h2 className="font-headline-xl text-headline-xl font-bold text-white tracking-tight">What We Do</h2>
              <p className="font-body-lg text-body-lg text-slate-300 leading-relaxed">
                We design and develop niche products powered with AI; on cloud, using cutting-edge technologies for
                business. Today our focus is on AI, to reimagine recommendation-engines as human intelligence never
                could.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="verified_user" className="text-secondary text-icon-26" />
                <span className="font-headline-sm text-headline-sm text-white">Cloud Native &amp; Scalable</span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-300">
                Operating enterprise grade infrastructure ensuring 99.99% availability for customer advocacy and
                real-time loyalty orchestration.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-8">
              <SectionEyebrow tone="dark" className="mb-3">
                Methodology &amp; Lifecycle
              </SectionEyebrow>
              <h2 className="font-headline-xl text-headline-xl font-bold text-white tracking-tight">How We Work</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processSteps.map((step) => (
                <div
                  key={step.title}
                  className="p-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-all duration-200 flex flex-col space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                    <Icon name={step.icon} className="text-icon-26" />
                  </div>
                  <span className="font-eyebrow text-eyebrow uppercase tracking-wider text-tertiary-fixed">
                    {step.phase}
                  </span>
                  <h3 className="font-headline-md text-headline-md font-semibold text-white">{step.title}</h3>
                  <p className="font-body-md text-body-md text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAreHowWeWork
