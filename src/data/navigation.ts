export interface NavLink {
  label: string
  href: string
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Product', href: '#products-section' },
  { label: 'Team', href: '#team' },
]

export const moreNavLinks: NavLink[] = [
  { label: 'Contact', href: '#contact' },
  { label: 'Members', href: '#' },
]

export const footerLinks: NavLink[] = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Help Center', href: '#' },
]
