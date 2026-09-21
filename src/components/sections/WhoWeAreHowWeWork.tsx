import { useRef } from 'react'
import type { CSSProperties } from 'react'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import ScrollText from '../ui/ScrollText'
import SectionHeader from '../ui/SectionHeader'
import { processSteps } from '../../data/processSteps'
import type { ProcessStep } from '../../data/processSteps'
import { useInView } from '../../hooks/useInView'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cn } from '../../lib/cn'

function TimelineStep({ step }: { step: ProcessStep }) {
  const ref = useRef<HTMLLIElement>(null)
  const reached = useInView(ref, { threshold: 0, rootMargin: '0px 0px -55% 0px' })
  const number = step.phase.replace(/\D/g, '')

  return (
    <li className="group relative border-b border-line py-10 pl-8 sm:pl-14 lg:py-12 lg:pl-20" ref={ref}>
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-[3.35rem] size-3 -translate-x-1/2 rounded-pill border transition-slow lg:top-[3.85rem]',
          reached ? 'border-signal bg-signal' : 'border-line-strong bg-ground',
        )}
      />
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 font-mono text-label uppercase text-signal">
            <Icon className="text-icon-20" name={step.icon} />
            {step.phase}
          </p>
          <h3 className="mt-5 text-display-sm text-fg transition-base group-hover:translate-x-1.5">{step.title}</h3>
          <p className="mt-4 text-body text-fg-soft">{step.description}</p>
        </div>
        <span
          aria-hidden="true"
          className="select-none font-display text-display-lg leading-none text-transparent transition-slow [-webkit-text-stroke:1px_var(--tone-line-strong)] group-hover:[-webkit-text-stroke-color:var(--tone-signal)]"
        >
          {number}
        </span>
      </div>
    </li>
  )
}

function WhoWeAreHowWeWork() {
  const timelineRef = useRef<HTMLDivElement>(null)
  useScrollProgress(timelineRef, { start: 0.7, end: 0.5 })

  return (
    <section className="tone-night relative scroll-mt-header overflow-hidden bg-ground py-section text-fg" id="about">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18rem] -top-[18rem] size-[46rem] rounded-pill border border-line"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10rem] -top-[10rem] size-[30rem] rounded-pill border border-dashed border-line"
      />

      <div className="relative mx-auto max-w-site px-page">
        <div className="grid gap-y-20 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <article className="lg:col-span-5">
            <SectionHeader className="mb-10" eyebrow="Core Identity" title="Who We Are" />
            <ScrollText
              className="text-statement text-fg"
              text="We are WXT. We love people. We love technology. We design newer ways to seamlessly connect the two, to create advancement for both."
            />
          </article>
          <article className="lg:col-span-6 lg:col-start-7">
            <SectionHeader className="mb-10" eyebrow="Capabilities" title="What We Do" />
            <ScrollText
              className="text-statement text-fg"
              text="We design and develop niche products powered with AI; on cloud, using cutting-edge technologies for business. Today our focus is on AI, to reimagine recommendation-engines as human intelligence never could."
            />
          </article>
        </div>

        <Reveal className="mt-20 grid items-center gap-6 border-y border-line py-8 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <div className="flex items-center gap-4 lg:col-span-5">
            <Icon className="text-icon-32 text-signal" name="verified_user" />
            <h3 className="text-title text-fg">Cloud Native &amp; Scalable</h3>
          </div>
          <p className="text-body text-fg-soft lg:col-span-6 lg:col-start-7">
            Operating enterprise grade infrastructure ensuring{' '}
            <span className="font-mono font-medium text-fg">99.99%</span> availability for customer advocacy and
            real-time loyalty orchestration.
          </p>
        </Reveal>

        <div className="mt-section grid gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader eyebrow="Methodology & Lifecycle" title="How We Work" />
            </div>
          </div>

          <div className="relative lg:col-span-8" ref={timelineRef}>
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-line" />
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px origin-top bg-signal"
              style={{ transform: 'scaleY(var(--progress, 0))' } as CSSProperties}
            />
            <ol className="border-t border-line">
              {processSteps.map((step) => (
                <TimelineStep key={step.title} step={step} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAreHowWeWork
