import { Fragment } from 'react'
import type { ReactNode } from 'react'
import LegalText from './LegalText'
import type { LegalBlock, LegalListItem } from '../../data/legal/types'

interface LegalContentProps {
  blocks: LegalBlock[]
  /** Anchor ids for level-2 headings, keyed by block index. */
  headingIds: Map<number, string>
}

function Item({ item }: { item: LegalListItem }) {
  const rest = item.lead ? item.text.slice(item.lead.length) : item.text
  return (
    <>
      {item.lead && <strong className="font-semibold text-fg">{item.lead}</strong>}
      <LegalText text={rest} />
    </>
  )
}

/** Numbered section titles ("1. OUR SERVICES") keep their text; the number just gets an accent color. */
function HeadingText({ text }: { text: string }) {
  const match = text.match(/^(\d+\.)\s+(.+)$/)
  if (!match) return <>{text}</>
  return (
    <>
      <span className="text-signal">{match[1]}</span> {match[2]}
    </>
  )
}

function renderBlock(block: LegalBlock, index: number, headingIds: Map<number, string>): ReactNode {
  switch (block.type) {
    case 'heading': {
      const text = <HeadingText text={block.text} />
      if (block.level === 2) {
        return (
          <h2
            className="mt-16 scroll-mt-28 border-t border-line-strong pt-8 text-display-sm text-fg first:mt-0 first:border-t-0 first:pt-0"
            id={headingIds.get(index)}
          >
            {text}
          </h2>
        )
      }
      if (block.level === 3) return <h3 className="mt-10 text-title text-fg first:mt-0">{text}</h3>
      if (block.level === 4) return <h4 className="mt-8 font-display text-lede font-semibold text-fg">{text}</h4>
      return <h5 className="mt-8 font-mono text-label uppercase text-signal">{text}</h5>
    }

    case 'paragraph':
      return (
        <p className="mt-5 text-body text-fg-soft first:mt-0">
          {block.lead && <strong className="font-semibold text-fg">{block.lead}</strong>}
          <LegalText text={block.lead ? block.text.slice(block.lead.length) : block.text} />
        </p>
      )

    case 'list': {
      if (block.variant === 'definitions') {
        return (
          <ul className="mt-6 border-t border-line-strong">
            {block.items.map((item) => (
              <li className="border-b border-line py-4 text-body text-fg-soft" key={item.text}>
                <Item item={item} />
              </li>
            ))}
          </ul>
        )
      }
      if (block.variant === 'facts') {
        return (
          <ul className="mt-4 space-y-1.5 border-l-2 border-line-strong pl-5">
            {block.items.map((item) => (
              <li className="text-body text-fg-soft" key={item.text}>
                <Item item={item} />
              </li>
            ))}
          </ul>
        )
      }
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li className="relative pl-6 text-body text-fg-soft" key={item.text}>
              <span aria-hidden="true" className="absolute left-0 top-[0.72em] size-1.5 bg-signal" />
              <Item item={item} />
            </li>
          ))}
        </ul>
      )
    }

    case 'address':
      return (
        <address className="mt-5 border-l-2 border-signal pl-5 text-body not-italic text-fg">
          {block.lines.map((line, lineIndex) => (
            <Fragment key={line}>
              {lineIndex > 0 && <br />}
              <LegalText text={line} />
            </Fragment>
          ))}
        </address>
      )
  }
}

function LegalContent({ blocks, headingIds }: LegalContentProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block, index, headingIds)}</Fragment>
      ))}
    </>
  )
}

export default LegalContent
