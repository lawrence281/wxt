import { Fragment, useRef } from 'react'
import type { CSSProperties, ElementType } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

interface TextSegment {
  text: string
  className?: string
}

interface SplitTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** A plain string, or styled segments (text is preserved exactly, only wrapped for animation). */
  text: string | TextSegment[]
  id?: string
  className?: string
  delay?: number
}

/** Headline that rises word-by-word out of a mask once scrolled into view. */
function SplitText({ as = 'span', text, id, className, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold: 0.3 })
  const Tag = as as ElementType

  const segments = typeof text === 'string' ? [{ text }] : text
  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  )

  return (
    <Tag
      className={className}
      data-revealed={inView}
      id={id}
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {words.map(({ word, className: wordClass }, index) => (
        <Fragment key={index}>
          {index > 0 && ' '}
          <span className="split-word">
            <span className={cn('split-inner', wordClass)} style={{ '--i': index } as CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}

export default SplitText
