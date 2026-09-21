import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { isInternalHref, navigate, resolveHref, usePathname } from '../../lib/router'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

/** Anchor that navigates client-side for internal routes and stays a normal link for everything else. */
function Link({ href, onClick, target, ...anchorProps }: LinkProps) {
  const pathname = usePathname()
  const resolved = resolveHref(href, pathname)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (target && target !== '_self') return
    // In-page hash links keep the browser's native behaviour.
    if (!isInternalHref(resolved)) return

    event.preventDefault()
    navigate(resolved)
  }

  return <a href={resolved} onClick={handleClick} target={target} {...anchorProps} />
}

export default Link
