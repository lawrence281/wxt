import Icon from '../ui/Icon'
import type { ProductOffer } from '../../data/products'

function ProductCard({ icon, image, imageAlt, title, description, linkLabel }: ProductOffer) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
          <Icon name={icon} className="text-icon-28" />
        </div>
        <div className="h-32 w-full rounded-xl overflow-hidden bg-surface-container-low">
          <img
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={image}
          />
        </div>
        <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface leading-snug">{title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
      <div className="pt-6 flex items-center text-secondary font-label-sm text-label-sm">
        <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          {linkLabel} <Icon name="arrow_forward" className="text-icon-16" />
        </span>
      </div>
    </div>
  )
}

export default ProductCard
