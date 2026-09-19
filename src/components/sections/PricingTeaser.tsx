import Icon from '../ui/Icon'

function PricingTeaser() {
  return (
    <section className="w-full py-12 bg-surface">
      <div className="max-w-5xl mx-auto px-margin md:px-margin-tablet">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-surface-container-highest via-surface-container-low to-surface-container-highest shadow-sm text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold tracking-wider">
              ANNOUNCEMENT
            </span>
            <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface tracking-tight">
              !!! Watch Out This Space For Pricing Plans &amp; Promotions !!!
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Get Ready to Maximize Your Growth With Our Social Media Influencer Platform
            </p>
            <div className="pt-3">
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-secondary transition-colors duration-200 shadow-sm"
                href="#contact"
              >
                <Icon name="notifications_active" className="text-icon-18" />
                <span>Register for Early Access</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingTeaser
