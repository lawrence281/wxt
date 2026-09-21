import { cn } from '../../lib/cn'

interface LogoProps {
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <a className={cn('group inline-flex items-center gap-3', className)} href="#">
      <img
        alt="WX Technologies"
        className="size-9 transition-slow group-hover:rotate-90"
        height={36}
        src="/favicon.svg"
        width={36}
      />
      <span className="flex flex-col">
        <span className="font-display text-title leading-none text-fg">WX Technologies</span>
        <span className="mt-1.5 font-mono text-label uppercase text-fg-mute">People &amp; Technology</span>
      </span>
    </a>
  )
}

export default Logo
