import Link from '../ui/Link'

// Emails and http(s) URLs (trailing sentence punctuation is not part of the link).
const LINKABLE = /(https?:\/\/[^\s]+?(?=[.,;:)]*(?:\s|$))|[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*[A-Za-z0-9])/
const SITE_HOST = 'wxt.global'

export const legalLinkClass =
  'text-signal underline decoration-signal/40 underline-offset-4 transition-fast hover:decoration-signal'

function AutoLink({ value }: { value: string }) {
  if (!value.startsWith('http')) {
    return (
      <a className={legalLinkClass} href={`mailto:${value}`}>
        {value}
      </a>
    )
  }

  const url = new URL(value)
  // Links to this very site stay inside the app (client-side navigation).
  if (url.hostname === SITE_HOST) {
    return (
      <Link className={legalLinkClass} href={url.pathname + url.search + url.hash}>
        {value}
      </Link>
    )
  }

  return (
    <a className={legalLinkClass} href={value} rel="noopener noreferrer" target="_blank">
      {value}
    </a>
  )
}

/** Renders legal copy verbatim, turning emails and URLs inside it into links. */
function LegalText({ text }: { text: string }) {
  const parts = text.split(LINKABLE)
  return (
    <>
      {parts.map((part, index) => (index % 2 === 1 ? <AutoLink key={index} value={part} /> : part))}
    </>
  )
}

export default LegalText
