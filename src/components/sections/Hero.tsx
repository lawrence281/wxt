import { useRef } from 'react'
import type { PointerEvent } from 'react'
import Button from '../ui/Button'
import CornerMarks from '../ui/CornerMarks'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'
import { coreDisciplines } from '../../data/coreDisciplines'
import { useParallax } from '../../hooks/useParallax'
import heroImage from '../../assets/Images/unnamed-removebg-preview.png'

function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollLayerRef = useRef<HTMLDivElement>(null)
  useParallax(scrollLayerRef, 0.06)

  // Mouse-only pointer parallax: writes normalized --px/--py (-1..1) that layers shift by.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const stage = stageRef.current
    if (!stage || event.pointerType !== 'mouse') return
    const rect = stage.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    stage.style.setProperty('--px', Math.max(-1, Math.min(1, x)).toFixed(3))
    stage.style.setProperty('--py', Math.max(-1, Math.min(1, y)).toFixed(3))
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-header overflow-hidden bg-ground pt-[calc(var(--spacing-header)+clamp(2rem,4vw,4.5rem))]"
      id="home"
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_72%_36%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-site px-page">
        <div className="grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <div className="lg:col-span-7">
            <Reveal className="mb-8 inline-flex items-center gap-3 rounded-pill border border-line-strong px-4 py-2 font-mono text-label uppercase tracking-normal text-fg-soft sm:tracking-widest">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inset-0 animate-ping-soft rounded-pill bg-live" />
                <span className="relative size-2 rounded-pill bg-live" />
              </span>
              Enterprise Social Loyalty Intelligence
            </Reveal>

            <SplitText
              as="h1"
              className="max-w-[16ch] text-display-xl text-fg"
              delay={100}
              id="hero-title"
              text={[
                { text: 'WXT :', className: 'text-signal' },
                { text: 'A Social Loyalty Reward Platform Company' },
              ]}
            />

            <Reveal className="mt-10 max-w-xl space-y-5" delay={380}>
              <p className="text-lede text-fg">
                WX Technologies Pvt Ltd., is an Indian technology company based in Chennai, Tamilnadu. The company
                owns RewardForPromo (Social Loyalty Reward Platform) among other products and services.
              </p>
              <p className="text-body text-fg-soft">
                We aim to help businesses turn customers into brand advocates using our Social Loyalty Reward
                Platform. We do that by innovatively integrating decision sciences, advanced math, and ML.
              </p>
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap items-center gap-4" delay={520}>
              <Button arrow href="#products-section">
                Explore RewardForPromo
              </Button>
              <Button href="#about" variant="outline">
                Our Methodology
              </Button>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={250} variant="scale">
            <div className="relative mx-auto w-full max-w-[34rem] pb-6" ref={stageRef}>
              <div className="relative aspect-[5/4]" ref={scrollLayerRef}>
                <div className="parallax absolute inset-0">
                  <CornerMarks />
                  <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-pill bg-signal/20 blur-3xl" />

                  <div className="pointer-shift absolute inset-0 [--shift:6px]">
                    <svg aria-hidden="true" className="absolute inset-0 size-full" fill="none" viewBox="0 0 500 400">
                      <circle cx="250" cy="200" r="170" stroke="var(--tone-line-strong)" />
                      <circle cx="250" cy="200" r="122" stroke="var(--tone-line-strong)" strokeDasharray="2 7" />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 aspect-square h-[85%] -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 animate-orbit-fast">
                        <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-signal" />
                      </div>
                    </div>
                  </div>

                  <div className="pointer-shift absolute inset-[2%] [--shift:-16px]">
                    <img
                      alt="Abstract 3D graphic representing AI-driven orchestration for the social loyalty platform"
                      className="size-full animate-float object-contain"
                      decoding="async"
                      fetchPriority="high"
                      height={384}
                      src={heroImage}
                      width={512}
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-shift absolute bottom-0 left-0 [--shift:10px] sm:-left-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border border-line bg-raised px-4 py-3 shadow-lift">
                  <span className="flex items-center gap-2.5 text-small font-semibold text-fg">
                    <span className="size-2 animate-pulse rounded-pill bg-signal" />
                    Autonomous AI Orchestration
                  </span>
                  <span className="font-mono text-label uppercase text-signal">RewardForPromo</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-20 grid border-t border-line-strong sm:grid-cols-3 lg:mt-28">
          {coreDisciplines.map((discipline, index) => (
            <Reveal
              as="li"
              className="group relative flex items-center gap-5 py-7 not-first:border-t not-first:border-line sm:px-8 sm:first:pl-0 sm:not-first:border-l sm:not-first:border-t-0"
              delay={index * 90}
              key={discipline.title}
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-slow group-hover:scale-x-100"
              />
              <Icon
                className="text-icon-28 text-fg-mute transition-base group-hover:text-signal"
                name={discipline.icon}
              />
              <span className="flex flex-col">
                <span className="font-display text-title leading-tight text-fg">{discipline.title}</span>
                <span className="mt-1 font-mono text-label uppercase text-fg-mute">{discipline.subtitle}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
