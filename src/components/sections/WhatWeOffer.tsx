import SectionEyebrow from '../ui/SectionEyebrow'
import ProductCard from './ProductCard'
import { productOffers } from '../../data/products'

function WhatWeOffer() {
  return (
    <section className="w-full py-24 bg-surface-container-low/70">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow className="mb-2 mx-auto">Comprehensive Software Suite</SectionEyebrow>
          <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mb-3">What We Offer</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            RewardForPromo connects Business Vendors and Social Media Influencers for mutual benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productOffers.map((offer) => (
            <ProductCard key={offer.title} {...offer} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeOffer
