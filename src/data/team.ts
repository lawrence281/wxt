import type { SocialPlatform } from '../components/ui/SocialIcon'
import lavanyaImage from '../assets/team/Lavanya Vijayarajan_edited_edited.avif'
import sabapathyImage from '../assets/team/Sabapathy Thiru_edited.avif'
import selvaImage from '../assets/team/Selva Marimuthu_edited.avif'
import jeevakanthImage from '../assets/team/Jeevakanth K_edited_edited.avif'
import yogiImage from '../assets/team/Yogi Mistry_edited.avif'
import orbRajaImage from '../assets/team/ORB Raja_edited.avif'

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  imageAlt: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Lavanya Vijayarajan',
    role: 'Founder & Director',
    bio: 'First generation woman entrepreneur, Gold Medalist in engineering degree (ECE) with Distinction. Cloud & DevOps Enthusiast.',
    image: lavanyaImage,
    imageAlt: 'Professional studio portrait of Lavanya Vijayarajan, Founder & Director',
  },
  {
    name: 'Sabapathy Thiru',
    role: 'Director',
    bio: '40 years experience in Product Development, Operations, General Administration, Budgeting, Resource Augmentation, People Management, Quality & Project Management. Strong Experience in building Media Intelligence Platform & Products.',
    image: sabapathyImage,
    imageAlt: 'Professional studio portrait of Sabapathy Thiru, Director',
  },
  {
    name: 'Selva Marimuthu',
    role: 'Sales & Operations',
    bio: '20+ years experience in Sales, Operations and Administration. Cloud & DevOps Enthusiast.',
    image: selvaImage,
    imageAlt: 'Corporate headshot of Selva Marimuthu, Sales & Operations',
  },
  {
    name: 'Jeevakanth Kandasami',
    role: 'Advisory Board',
    bio: 'A high-impact technology and business leader with over 25+ years of experience and strong ability to identify challenges and implement solutions that mitigate risks and promotes growth for businesses.',
    image: jeevakanthImage,
    imageAlt: 'Executive portrait of Jeevakanth Kandasami, Advisory Board',
  },
  {
    name: 'Yogi Mistry',
    role: 'Advisory Board',
    bio: 'A Technology leader with 25+ years of experience and serves as a change-agent in the business environment by promoting positive culture and employment practices.',
    image: yogiImage,
    imageAlt: 'Portrait of Yogi Mistry, Advisory Board',
  },
  {
    name: 'ORB Raja',
    role: 'Advisory Board',
    bio: 'ICT professional & Business Consultant with over 25+ years of Information Technology experience in multiple countries (India, Singapore, USA & Tanzania).',
    image: orbRajaImage,
    imageAlt: 'Studio corporate portrait of ORB Raja, Advisory Board',
  },
]

export interface SocialLink {
  icon: SocialPlatform
  href: string
  label: string
}

export const teamSocialLinks: SocialLink[] = [
  { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
  { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
]
