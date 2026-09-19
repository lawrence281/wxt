import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'dark'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-secondary text-on-secondary shadow-button hover:bg-on-secondary-fixed-variant hover:shadow-none',
  secondary:
    'bg-surface-container-lowest text-on-surface shadow-sm hover:shadow hover:bg-surface-container',
  dark: 'bg-primary text-on-primary hover:bg-secondary shadow-sm',
}

function Button({ variant = 'primary', className = '', children, ...anchorProps }: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-label-lg text-label-lg transition-all duration-200 ${variantClasses[variant]} ${className}`}
      {...anchorProps}
    >
      {children}
    </a>
  )
}

export default Button
