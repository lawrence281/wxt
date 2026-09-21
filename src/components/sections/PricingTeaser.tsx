import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

function PricingTeaser() {
  return (
    <section aria-labelledby="announcement-title" className="bg-ground py-section">
      <div className="mx-auto max-w-site px-page">
        <Reveal
          className="tone-night relative isolate overflow-hidden bg-ground px-6 py-16 text-fg sm:px-12 sm:py-24"
          variant="scale"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black,transparent)]" />
            <div className="absolute left-1/2 top-full aspect-square w-full max-w-xl -translate-x-1/2 -translate-y-1/2 animate-drift rounded-pill bg-signal/25 blur-3xl" />
          </div>

          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 border border-line-strong px-3.5 py-1.5 font-mono text-label uppercase text-signal">
              <span className="size-2 animate-pulse rounded-pill bg-signal" />
              ANNOUNCEMENT
            </span>

            <SplitText
              as="h2"
              className="mt-8 text-display-md text-fg"
              id="announcement-title"
              text={[
                { text: '!!!', className: 'text-signal' },
                { text: 'Watch Out This Space For Pricing Plans & Promotions' },
                { text: '!!!', className: 'text-signal' },
              ]}
            />
            <Reveal as="p" className="mt-6 max-w-xl text-lede text-fg-soft" delay={200}>
              Get Ready to Maximize Your Growth With Our Social Media Influencer Platform
            </Reveal>
            <Reveal className="mt-10" delay={320}>
              <Button href="#contact" icon="notifications_active">
                Register for Early Access
              </Button>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PricingTeaser
