export interface ProcessStep {
  icon: string
  phase: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    icon: 'explore',
    phase: 'Phase 01',
    title: 'Discovery',
    description:
      'Our product vision is what inspires us. This is where we get to know where we want to go and brainstorm how we can get there.',
  },
  {
    icon: 'design_services',
    phase: 'Phase 02',
    title: 'Design',
    description:
      'We specialize on Cloud, UI/UX and DevOps. This is where our creatives come up with enjoyable designs',
  },
  {
    icon: 'code_blocks',
    phase: 'Phase 03',
    title: 'Development',
    description:
      'We create software and/or hardware products using the latest advancements in technology.',
  },
  {
    icon: 'handshake',
    phase: 'Phase 04',
    title: 'Partnership',
    description:
      'We want to be part of our customers long term success through our products.',
  },
]
