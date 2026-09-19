import Icon from '../ui/Icon'
import { businessVerticals } from '../../data/verticals'

function TrustedVerticals() {
  return (
    <section className="w-full bg-secondary-container text-on-secondary-container py-16">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg font-semibold text-white">Trusted Among Business Verticals</h2>
          <p className="font-body-sm text-body-sm text-on-secondary-container/80 mt-1">
            Accelerating social brand velocity across essential consumer and non-commercial sectors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {businessVerticals.map((vertical) => (
            <div
              key={vertical.title}
              className={`${vertical.wide ? 'col-span-2 md:col-span-1' : ''} bg-surface-container-lowest rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:scale-105 transition-all duration-200 group`}
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-3 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <Icon name={vertical.icon} className="text-icon-30" />
              </div>
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">{vertical.title}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">{vertical.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedVerticals
