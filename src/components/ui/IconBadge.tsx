import Icon from './Icon'

interface IconBadgeProps {
  icon: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses: Record<NonNullable<IconBadgeProps['size']>, { box: string; icon: string }> = {
  sm: { box: 'w-9 h-9 rounded-lg', icon: 'text-icon-20' },
  md: { box: 'w-12 h-12 rounded-xl', icon: 'text-icon-26' },
  lg: { box: 'w-14 h-14 rounded-xl', icon: 'text-icon-28' },
}

function IconBadge({ icon, size = 'md', className = '' }: IconBadgeProps) {
  const { box, icon: iconSize } = sizeClasses[size]
  return (
    <div
      className={`${box} bg-surface-container-low flex items-center justify-center text-secondary shrink-0 ${className}`}
    >
      <Icon name={icon} className={iconSize} />
    </div>
  )
}

export default IconBadge
