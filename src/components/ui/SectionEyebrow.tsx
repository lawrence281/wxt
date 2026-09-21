import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionEyebrowProps {
  children: ReactNode
  className?: string
}

/** Small mono label with a leading rule: the quiet "kicker" above section titles. */
function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <span className={cn('inline-flex items-center gap-3 font-mono text-label uppercase text-signal', className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </span>
  )
}

export default SectionEyebrow
