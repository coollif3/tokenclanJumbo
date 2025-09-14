export const STRIPE_PRODUCTS = {
  PAID_MEMBERSHIP: {
    priceId: 'price_1234567890abcdef', // Replace with your actual Stripe price ID
    name: 'TokenClan Paid Member',
    description: 'Unlocks more vault features.',
    mode: 'subscription' as const,
    price: '$5.00'
  }
} as const;

export type StripeProduct = typeof STRIPE_PRODUCTS[keyof typeof STRIPE_PRODUCTS];