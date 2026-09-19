import { useRef } from 'react'
import Icon from '../ui/Icon'
import SectionEyebrow from '../ui/SectionEyebrow'
import TeamMemberCard from './TeamMemberCard'
import { teamMembers } from '../../data/team'

function TeamSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    scrollContainerRef.current?.scrollBy({ left: direction * 364, behavior: 'smooth' })
  }

  return (
    <section
      className="w-full py-24 bg-surface-container-low/40 relative overflow-hidden scroll-mt-24"
      id="team"
    >
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <SectionEyebrow>Leadership &amp; Governance</SectionEyebrow>
            <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">Meet the Team</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-medium">
              Talent wins games, but teamwork and intelligence win championships.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-label-sm text-on-surface-variant hidden sm:inline-block mr-1">
              Hover to pause
            </span>
            <button
              aria-label="Previous team member"
              className="w-11 h-11 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm hover:bg-secondary hover:text-on-secondary hover:shadow transition-all duration-200 flex items-center justify-center focus:outline-none"
              onClick={() => scrollByCard(-1)}
              type="button"
            >
              <Icon name="chevron_left" className="text-icon-20" />
            </button>
            <button
              aria-label="Next team member"
              className="w-11 h-11 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm hover:bg-secondary hover:text-on-secondary hover:shadow transition-all duration-200 flex items-center justify-center focus:outline-none"
              onClick={() => scrollByCard(1)}
              type="button"
            >
              <Icon name="chevron_right" className="text-icon-20" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

        <div
          className="w-full overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing py-4"
          ref={scrollContainerRef}
        >
          <div className="animate-team-marquee flex items-stretch gap-6 pl-6 pr-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
            {teamMembers.map((member) => (
              <TeamMemberCard key={`${member.name}-repeat`} member={member} ariaHidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
