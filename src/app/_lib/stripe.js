import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export { stripe }

export const createCheckoutSession = async (userId, userEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/en-US/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/en-US/payment/cancel`,
      metadata: {
        userId: userId,
        userEmail: userEmail,
      },
    })

    return { sessionId: session.id, url: session.url }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export const verifyPayment = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      success: session.payment_status === 'paid',
      userId: session.metadata?.userId,
      userEmail: session.metadata?.userEmail,
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}