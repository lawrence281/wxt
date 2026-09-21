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

/** Section index: a sticky sidebar on desktop only; hidden on tablet and mobile. */
function LegalToc({ items, activeId }: LegalTocProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop) return null

  return (
    <nav
      aria-label="Contents"
      className="no-scrollbar sticky top-28 max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain pr-2"
    >
      <p className="mb-4 font-mono text-label uppercase text-fg-mute">Contents</p>
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
                title={item.text}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default LegalToc
