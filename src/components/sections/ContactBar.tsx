import Icon from '../ui/Icon'

function ContactBar() {
  return (
    <section className="w-full py-16 bg-surface-container-lowest scroll-mt-24" id="contact">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="p-8 lg:p-12 rounded-3xl bg-surface-container-low flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="font-eyebrow text-eyebrow uppercase tracking-widest text-secondary">
              Ready to Transform Your Reach?
            </span>
            <h3 className="font-headline-lg text-headline-lg font-semibold text-on-surface">
              Let&apos;s Connect People and Technology
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Reach out to our Chennai headquarters to deploy RewardForPromo across your brand&apos;s distribution
              networks.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              className="px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:shadow inline-flex items-center gap-2 transition-all"
              href="tel:+919884021323"
            >
              <Icon name="call" className="text-icon-20 text-secondary" />
              <span>+91 9884021323</span>
            </a>
            <a
              className="px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg shadow-cta hover:bg-on-secondary-fixed-variant transition-all inline-flex items-center gap-2"
              href="mailto:info@wxt.global"
            >
              <Icon name="mail" className="text-icon-20" />
              <span>info@wxt.global</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactBar
