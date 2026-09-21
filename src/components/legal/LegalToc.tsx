import { useState } from 'react'
import Icon from '../ui/Icon'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

export interface TocItem {
  id: string
  text: string
}

interface LegalTocProps {
  items: TocItem[]
  activeId: string
}

/** Section index: a sticky sidebar on desktop, a collapsible panel on smaller screens. */
function LegalToc({ items, activeId }: LegalTocProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [open, setOpen] = useState(false)

  const list = (
    <ol>
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <li key={item.id}>
            <a
              aria-current={active ? 'location' : undefined}
              className={cn(
                'block line-clamp-2 border-l-2 py-1.5 pl-4 text-small transition-fast',
                active
                  ? 'border-signal font-medium text-fg'
                  : 'border-line text-fg-mute hover:border-line-strong hover:text-fg',
              )}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              title={item.text}
            >
              {item.text}
            </a>
          </li>
        )
      })}
    </ol>
  )

  if (isDesktop) {
    return (
      <nav
        aria-label="Contents"
        className="sticky top-28 max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain pr-2"
      >
        <p className="mb-4 font-mono text-label uppercase text-fg-mute">Contents</p>
        {list}
      </nav>
    )
  }

  return (
    <nav aria-label="Contents" className="border border-line-strong bg-raised">
      <button
        aria-controls="legal-toc"
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between px-4 font-mono text-label uppercase text-fg"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Contents
        <Icon className={cn('text-icon-20 transition-base', open && 'rotate-180')} name="expand_more" />
      </button>
      {open && (
        <div className="max-h-[60vh] overflow-y-auto overscroll-contain border-t border-line px-4 py-3" id="legal-toc">
          {list}
        </div>
      )}
    </nav>
  )
}

export default LegalToc
