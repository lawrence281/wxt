import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import type { ProductOffer } from '../../data/products'
import { cn } from '../../lib/cn'

interface OfferItemProps {
  offer: ProductOffer
  index: number
  active: boolean
  /** Desktop: an accordion row that drives the image stage. Below `lg`: a plain, fully-open article. */
  interactive: boolean
  onSelect: () => void
}

function OfferItem({ offer, index, active, interactive, onSelect }: OfferItemProps) {
  const open = !interactive || active
  const triggerId = `offer-trigger-${index}`
  const panelId = `offer-panel-${index}`

  const heading = (
    <>
      <Icon
        className={cn('mt-0.5 text-icon-24 transition-base', open ? 'text-signal' : 'text-fg-mute')}
        name={offer.icon}
      />
      <span className={cn('flex-1 text-title transition-base group-hover:text-fg', open ? 'text-fg' : 'text-fg-mute')}>
        {offer.title}
      </span>
    </>
  )

  return (
    <Reveal as="li" className="border-b border-line" delay={index * 80}>
      <h3>
        {interactive ? (
          <button
            aria-controls={panelId}
            aria-expanded={active}
            className="group flex w-full items-start gap-4 py-6 text-left"
            id={triggerId}
            onClick={onSelect}
            type="button"
          >
            {heading}
            <Icon className="mt-1 text-icon-20 text-fg-mute" name={active ? 'remove' : 'add'} />
          </button>
        ) : (
          <div className="flex items-start gap-4 pb-5 pt-8">{heading}</div>
        )}
      </h3>

      <div
        aria-labelledby={interactive ? triggerId : undefined}
        className={cn(
          'grid transition-[grid-template-rows] duration-(--duration-slow) ease-out-expo',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        id={panelId}
        role={interactive ? 'region' : undefined}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="space-y-5 pb-8 lg:pl-10">
            <Reveal className="lg:hidden" variant="clip">
              <img
                alt={offer.imageAlt}
                className="aspect-video w-full object-cover"
                decoding="async"
                height={279}
                loading="lazy"
                src={offer.image}
                width={512}
              />
            </Reveal>
            <p className="text-body text-fg-soft">{offer.description}</p>
            <p className="inline-flex items-center gap-2 font-mono text-label uppercase text-signal">
              {offer.linkLabel}
              <Icon className="text-icon-16" name="arrow_forward" />
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default OfferItem
