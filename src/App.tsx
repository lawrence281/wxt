import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import WhoWeAreHowWeWork from './components/sections/WhoWeAreHowWeWork'
import ProductsEcosystem from './components/sections/ProductsEcosystem'
import WhatWeOffer from './components/sections/WhatWeOffer'
import TrustedVerticals from './components/sections/TrustedVerticals'
import PricingTeaser from './components/sections/PricingTeaser'
import TeamSection from './components/sections/TeamSection'
import ContactBar from './components/sections/ContactBar'
import Footer from './components/sections/Footer'
import ChatButton from './components/sections/ChatButton'

function App() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Header />
      <main className="w-full pt-20 bg-background">
        <Hero />
        <WhoWeAreHowWeWork />
        <ProductsEcosystem />
        <WhatWeOffer />
        <TrustedVerticals />
        <PricingTeaser />
        <TeamSection />
        <ContactBar />
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}

export default App
