import { Fragment, useRef } from 'react'
import type { CSSProperties } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

interface ScrollTextProps {
  text: string
  className?: string
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  useScrollProgress(ref, { start: 0.88, end: 0.42 })

  const words = text.split(' ')

  return (
    <p className={className} ref={ref} style={{ '--n': words.length, '--progress': 0 } as CSSProperties}>
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 && ' '}
          <span className="scroll-word" style={{ '--i': index } as CSSProperties}>
            {word}
          </span>
        </Fragment>
      ))}
    </p>
  )
}

export default ScrollText
