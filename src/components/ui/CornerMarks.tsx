import { cn } from '../../lib/cn'

interface CornerMarksProps {
  className?: string
}

/** Four crop-mark ticks hugging a frame's corners: the site's recurring "precision" motif. */
function CornerMarks({ className }: CornerMarksProps) {
  const tick = 'absolute size-3.5 border-fg/60'

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute -inset-2.5', className)}>
      <span className={cn(tick, 'left-0 top-0 border-l border-t')} />
      <span className={cn(tick, 'right-0 top-0 border-r border-t')} />
      <span className={cn(tick, 'bottom-0 left-0 border-b border-l')} />
      <span className={cn(tick, 'bottom-0 right-0 border-b border-r')} />
    </div>
  )
}

export default CornerMarks
