import type { AnchorHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  /** Adds a trailing arrow that nudges forward on hover. */
  arrow?: boolean
  /** Optional leading icon glyph name. */
  icon?: string
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
}

function Button({ variant = 'primary', arrow = false, icon, className, children, ...anchorProps }: ButtonProps) {
  return (
    <a className={cn('btn', variantClasses[variant], className)} {...anchorProps}>
      {icon && <Icon className="text-icon-18" name={icon} />}
      <span>{children}</span>
      {arrow && <Icon className="btn-arrow text-icon-18" name="arrow_forward" />}
    </a>
  )
}

export default Button
