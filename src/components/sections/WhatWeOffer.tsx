import { useState } from 'react'
import CornerMarks from '../ui/CornerMarks'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import OfferItem from './OfferItem'
import { productOffers } from '../../data/products'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

function WhatWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const activeOffer = productOffers[activeIndex]

  return (
    <section aria-labelledby="offer-title" className="tone-deep relative bg-ground py-section">
      <div className="relative mx-auto max-w-site px-page">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Comprehensive Software Suite"
              lede="RewardForPromo connects Business Vendors and Social Media Influencers for mutual benefits."
              title="What We Offer"
              titleId="offer-title"
            />
            <ul className="mt-14 border-t border-line-strong">
              {productOffers.map((offer, index) => (
                <OfferItem
                  active={index === activeIndex}
                  index={index}
                  interactive={isDesktop}
                  key={offer.title}
                  offer={offer}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </ul>
          </div>

          <div className="hidden lg:col-span-7 lg:block">
            <Reveal className="sticky top-28" variant="fade">
              <div className="relative mx-auto max-w-2xl">
                <CornerMarks />
                <div className="relative aspect-[16/11] overflow-hidden bg-paper">
                  {productOffers.map((offer, index) => (
                    <img
                      alt={offer.imageAlt}
                      aria-hidden={index !== activeIndex}
                      className={cn(
                        'absolute inset-0 size-full object-cover transition-slow',
                        index === activeIndex ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
                      )}
                      decoding="async"
                      height={279}
                      key={offer.title}
                      loading="lazy"
                      src={offer.image}
                      width={512}
                    />
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 left-4 flex items-center gap-3 border border-line bg-raised px-4 py-3 shadow-lift"
                >
                  <Icon className="text-icon-20 text-signal" name={activeOffer.icon} />
                  <span className="font-mono text-label uppercase text-fg">{activeOffer.linkLabel}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeOffer
