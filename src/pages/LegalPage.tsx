import { useEffect, useMemo, useState } from 'react'
import LegalContent from '../components/legal/LegalContent'
import LegalToc from '../components/legal/LegalToc'
import type { TocItem } from '../components/legal/LegalToc'
import Link from '../components/ui/Link'
import Reveal from '../components/ui/Reveal'
import SplitText from '../components/ui/SplitText'
import type { LegalDocument } from '../data/legal/types'
import { subscribeScroll } from '../lib/scrollEngine'
import { ROUTES } from '../lib/routes'

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Level-2 headings become the table of contents; each gets a unique anchor id. */
function buildHeadings(doc: LegalDocument) {
  const toc: TocItem[] = []
  const ids = new Map<number, string>()
  const seen = new Set<string>()

  doc.blocks.forEach((block, index) => {
    if (block.type !== 'heading' || block.level !== 2) return
    const base = slugify(block.text) || 'section'
    let id = base
    for (let suffix = 2; seen.has(id); suffix++) id = `${base}-${suffix}`
    seen.add(id)
    ids.set(index, id)
    toc.push({ id, text: block.text })
  })

  return { toc, ids }
}

function LegalPage({ doc }: { doc: LegalDocument }) {
  const { toc, ids } = useMemo(() => buildHeadings(doc), [doc])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const previous = document.title
    document.title = `${doc.title} | WX Technologies`
    return () => {
      document.title = previous
    }
  }, [doc.title])

  // Highlight the section whose heading most recently crossed 30% of the viewport height.
  useEffect(() => {
    const headings = toc.flatMap((item) => {
      const element = document.getElementById(item.id)
      return element ? [element] : []
    })
    let current = ''

    return subscribeScroll({
      read() {
        const line = window.innerHeight * 0.3
        current = ''
        for (const heading of headings) {
          if (heading.getBoundingClientRect().top > line) break
          current = heading.id
        }
      },
      write() {
        setActiveId((previous) => (previous === current ? previous : current))
      },
    })
  }, [toc])

  return (
    <main id="main">
      <section className="relative isolate overflow-hidden bg-ground pb-14 pt-[calc(var(--spacing-header)+clamp(2rem,5vw,4.5rem))] lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_90%_at_82%_0%,black,transparent)]" />
        </div>

        <div className="mx-auto max-w-site px-page">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-3 font-mono text-label uppercase text-fg-mute">
                <li>
                  <Link className="link-underline transition-fast hover:text-fg" href={ROUTES.home}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-fg">
                  {doc.title}
                </li>
              </ol>
            </nav>
          </Reveal>
          <SplitText as="h1" className="mt-8 text-display-lg text-fg" delay={80} text={doc.title} />
          <Reveal as="p" className="mt-6 font-mono text-label uppercase text-fg-soft" delay={240}>
            {doc.updated}
          </Reveal>
        </div>
      </section>

      <div className="border-t border-line bg-ground">
        <div className="mx-auto grid max-w-site gap-y-10 px-page py-14 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)] lg:py-20">
          <div className="hidden lg:col-span-3 lg:block">
            <LegalToc activeId={activeId} items={toc} />
          </div>
          <article className="min-w-0 lg:col-span-8 lg:col-start-4 xl:col-span-7 xl:col-start-5">
            <div className="max-w-2xl">
              <LegalContent blocks={doc.blocks} headingIds={ids} />
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}

export default LegalPage
