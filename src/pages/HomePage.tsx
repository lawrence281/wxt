import Hero from '../components/sections/Hero'
import WhoWeAreHowWeWork from '../components/sections/WhoWeAreHowWeWork'
import ProductsEcosystem from '../components/sections/ProductsEcosystem'
import WhatWeOffer from '../components/sections/WhatWeOffer'
import TrustedVerticals from '../components/sections/TrustedVerticals'
import PricingTeaser from '../components/sections/PricingTeaser'
import TeamSection from '../components/sections/TeamSection'
import ContactBar from '../components/sections/ContactBar'

function HomePage() {
  return (
    <main id="main">
      <Hero />
      <WhoWeAreHowWeWork />
      <ProductsEcosystem />
      <WhatWeOffer />
      <TrustedVerticals />
      <PricingTeaser />
      <TeamSection />
      <ContactBar />
    </main>
  )
}

export default HomePage
