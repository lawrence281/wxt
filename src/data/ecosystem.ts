import type { SocialPlatform } from '../components/ui/SocialIcon'

export interface OrbitNode {
  icon: string
  label: string
  /** Position on the orbit ring, as CSS inset anchor classes. */
  position: string
}

export const orbitNodes: OrbitNode[] = [
  { icon: 'checkroom', label: 'Fashion', position: 'top-[4%] left-1/2 -translate-x-1/2 -translate-y-1/2' },
  { icon: 'restaurant', label: 'Restaurants', position: 'top-[16%] right-[12%] translate-x-1/2 -translate-y-1/2' },
  { icon: 'account_balance', label: 'Banking', position: 'top-1/2 right-[4%] translate-x-1/2 -translate-y-1/2' },
  { icon: 'festival', label: 'Events', position: 'bottom-[16%] right-[12%] translate-x-1/2 translate-y-1/2' },
  { icon: 'movie', label: 'Movies', position: 'bottom-[4%] left-1/2 -translate-x-1/2 translate-y-1/2' },
  { icon: 'school', label: 'Education', position: 'bottom-[16%] left-[12%] -translate-x-1/2 translate-y-1/2' },
  { icon: 'flight', label: 'Travels', position: 'top-1/2 left-[4%] -translate-x-1/2 -translate-y-1/2' },
  { icon: 'shopping_bag', label: 'Retail', position: 'top-[16%] left-[12%] -translate-x-1/2 -translate-y-1/2' },
]

export interface OrbitSocialLink {
  icon: SocialPlatform
  href: string
  label: string
}

/** Social platforms shown on the ecosystem diagram's rotating inner ring. */
export const orbitSocialLinks: OrbitSocialLink[] = [
  { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]

export interface AudiencePillar {
  icon: string
  title: string
  description: string
}

export const audiencePillars: AudiencePillar[] = [
  {
    icon: 'storefront',
    title: 'Vendors:',
    description: 'Boost your Social Media Reach and Sales through Social Media Influence',
  },
  {
    icon: 'volunteer_activism',
    title: 'Non-Commercial Organizations:',
    description: 'Boost your Social Media Reach through Social Media Influence',
  },
  {
    icon: 'stars',
    title: 'Influencers:',
    description: 'Earn Rewards for your Social Media Activity',
  },
]

export interface ArchitecturalPillar {
  icon: string
  label: string
}

export const architecturalPillars: ArchitecturalPillar[] = [
  { icon: 'security', label: 'Speed & Security' },
  { icon: 'aspect_ratio', label: 'Flexibility & Scalability' },
  { icon: 'hub', label: 'Better Collaboration' },
]
