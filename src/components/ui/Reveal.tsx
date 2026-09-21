import { useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealTag = 'div' | 'p' | 'li' | 'article' | 'header' | 'span' | 'section' | 'ul' | 'figure'
type RevealVariant = 'up' | 'fade' | 'scale' | 'clip'

interface RevealProps {
  as?: RevealTag
  variant?: RevealVariant
  /** Delay in ms, for staggering siblings. */
  delay?: number
  threshold?: number
  className?: string
  children: ReactNode
}

/** Fades/slides its children in once they scroll into view. All motion lives in index.css. */
function Reveal({ as = 'div', variant = 'up', delay = 0, threshold, className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold })
  const Tag = as as ElementType

  return (
    <Tag
      className={className}
      data-reveal={variant}
      data-revealed={inView}
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export default Reveal
