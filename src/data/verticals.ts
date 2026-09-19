export interface BusinessVertical {
  icon: string
  title: string
  subtitle: string
  wide?: boolean
}

export const businessVerticals: BusinessVertical[] = [
  { icon: 'restaurant', title: 'Restaurants', subtitle: 'Dining & Hospitality' },
  { icon: 'shopping_cart', title: 'Retail', subtitle: 'Stores & E-Commerce' },
  { icon: 'spa', title: 'Wellness', subtitle: 'Health & Lifestyle' },
  { icon: 'theaters', title: 'Entertainment', subtitle: 'Cinema & Production' },
  {
    icon: 'front_hand',
    title: 'Non-Commercial Organizations',
    subtitle: 'Advocacy & Civic',
    wide: true,
  },
]
