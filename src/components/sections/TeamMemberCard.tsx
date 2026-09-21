import SocialIcon from '../ui/SocialIcon'
import type { TeamMember } from '../../data/team'
import { teamSocialLinks } from '../../data/team'

interface TeamMemberCardProps {
  member: TeamMember
  /** Looping copies are inert so they never trap focus or repeat content for assistive tech. */
  duplicate?: boolean
}

function TeamMemberCard({ member, duplicate = false }: TeamMemberCardProps) {
  return (
    <article className="group/card flex w-72 shrink-0 flex-col sm:w-80" data-card inert={duplicate}>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <img
          alt={member.imageAlt}
          className="size-full object-cover object-top transition-slow group-hover/card:scale-105"
          decoding="async"
          draggable={false}
          loading="lazy"
          src={member.image}
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col border-t border-line-strong pt-5">
        <h3 className="text-title text-fg">{member.name}</h3>
        <p className="mt-1.5 font-mono text-label uppercase text-signal">{member.role}</p>
        <p className="mt-4 text-small text-fg-soft">{member.bio}</p>
        <ul className="mt-auto flex items-center gap-2 pt-6">
          {teamSocialLinks.map((social) => (
            <li key={social.label}>
              <a
                aria-label={`${member.name} on ${social.label}`}
                className="grid size-10 place-items-center rounded-sm border border-line-strong text-fg transition-base hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-on-accent"
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
                title={social.label}
              >
                <SocialIcon className="size-4" name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default TeamMemberCard
