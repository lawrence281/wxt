import type { ReactNode } from 'react'
import Reveal from './Reveal'
import SectionEyebrow from './SectionEyebrow'
import SplitText from './SplitText'
import { cn } from '../../lib/cn'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  titleId?: string
  as?: 'h2' | 'h3'
  size?: 'lg' | 'md'
  lede?: ReactNode
  className?: string
}

/** Eyebrow + masked title + optional lede: the shared opening of a section. */
function SectionHeader({ eyebrow, title, titleId, as = 'h2', size = 'lg', lede, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col items-start gap-6', className)}>
      <Reveal>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
      </Reveal>
      <SplitText
        as={as}
        className={cn('text-fg', size === 'lg' ? 'text-display-lg' : 'text-display-md')}
        id={titleId}
        text={title}
      />
      {lede && (
        <Reveal as="p" className="max-w-xl text-lede text-fg-soft" delay={180}>
          {lede}
        </Reveal>
      )}
    </div>
  )
}

export default SectionHeader
