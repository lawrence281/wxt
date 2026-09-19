import type { ReactNode } from 'react'

interface SectionEyebrowProps {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

function SectionEyebrow({ children, tone = 'light', className = '' }: SectionEyebrowProps) {
  if (tone === 'dark') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-tertiary-fixed font-eyebrow text-eyebrow uppercase tracking-widest ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <span className={`font-eyebrow text-eyebrow uppercase tracking-widest text-secondary block ${className}`}>
      {children}
    </span>
  )
}

export default SectionEyebrow
