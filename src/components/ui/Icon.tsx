interface IconProps {
  name: string
  className?: string
}

function Icon({ name, className = '' }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  )
}

export default Icon
