import SocialIcon from '../ui/SocialIcon'
import type { TeamMember } from '../../data/team'
import { teamSocialLinks } from '../../data/team'

interface TeamMemberCardProps {
  member: TeamMember
  ariaHidden?: boolean
}

function TeamMemberCard({ member, ariaHidden = false }: TeamMemberCardProps) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="w-[340px] flex-shrink-0 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-outline-variant/30"
    >
      <div className="h-64 w-full bg-surface-container relative overflow-hidden">
        <img
          alt={member.imageAlt}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          src={member.image}
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm shadow-xs">
          {member.role}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">{member.name}</h3>
          <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">{member.role}</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 leading-relaxed">{member.bio}</p>
        </div>
        <div className="pt-4 flex items-center gap-3 border-t border-outline-variant/20">
          {teamSocialLinks.map((social) => (
            <a
              key={social.label}
              aria-label={`${member.name} on ${social.label}`}
              className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant transition-all duration-200 hover:bg-secondary hover:text-on-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-95"
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
              title={social.label}
            >
              <SocialIcon className="w-4 h-4" name={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamMemberCard
