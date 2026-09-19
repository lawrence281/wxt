import Icon from '../ui/Icon'
import Button from '../ui/Button'
import { coreDisciplines } from '../../data/coreDisciplines'
import heroImage from '../../assets/Images/unnamed-removebg-preview.png'

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-surface to-surface-container-low/60 pb-20 lg:pb-32 pt-10 scroll-mt-24"
      id="home"
    >
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-container/10 blur-3xl pointer-events-none" />

      {/* Mobile only: the card image, reused as a soft ambient background behind the content */}
      <img
        alt=""
        aria-hidden="true"
        className="hero-mobile-bg absolute inset-0 z-0 block h-full w-full object-contain blur-sm sm:hidden"
        src={heroImage}
      />

      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-highest/60 text-secondary font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Enterprise Social Loyalty Intelligence
            </div>

            <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight leading-tight">
              WXT : A Social Loyalty Reward Platform Company
            </h1>

            <div className="space-y-4 text-on-surface-variant font-body-lg text-body-lg">
              <p>
                WX Technologies Pvt Ltd., is an Indian technology company based in Chennai, Tamilnadu. The company
                owns RewardForPromo (Social Loyalty Reward Platform) among other products and services.
              </p>
              <p>
                We aim to help businesses turn customers into brand advocates using our Social Loyalty Reward
                Platform. We do that by innovatively integrating decision sciences, advanced math, and ML.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4">
              {coreDisciplines.map((discipline) => (
                <div
                  key={discipline.title}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
                    <Icon name={discipline.icon} className="text-icon-22" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface leading-tight">
                      {discipline.title}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {discipline.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="#products-section">
                <span>Explore RewardForPromo</span>
                <Icon name="arrow_forward" className="text-icon-18" />
              </Button>
              <Button variant="secondary" href="#about">
                Our Methodology
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative hidden sm:flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto hero-3d-perspective py-6">
              <div className="hero-ambient-glow absolute -inset-6 bg-gradient-to-tr from-secondary/25 via-secondary-container/20 to-tertiary-fixed-dim/30 rounded-[2.5rem] blur-2xl pointer-events-none" />
              <div className="hero-3d-card relative rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-3 sm:p-4 shadow-card-float border border-white/70 overflow-hidden group cursor-pointer preserve-3d">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center translate-z-img">
                  <img
                    alt="Abstract 3D graphic representing AI-driven orchestration for the social loyalty platform"
                    className="w-full h-full object-cover rounded-xl transform transition-transform duration-700 ease-out group-hover:scale-105"
                    src={heroImage}
                  />
                </div>

                <div className="pt-4 pb-2 px-3 flex items-center justify-between translate-z-badge">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface tracking-tight">
                      Autonomous AI Orchestration
                    </span>
                  </div>
                  <span className="font-eyebrow text-eyebrow uppercase tracking-wider text-secondary px-2.5 py-1 rounded-full bg-secondary/10 shadow-xs">
                    RewardForPromo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
