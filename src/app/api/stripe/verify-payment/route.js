import { NextResponse } from 'next/server'
import { verifyPayment } from '@app/_lib/stripe'
import { supabase } from '@app/_lib/supabase'

export async function POST(req) {
  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const paymentResult = await verifyPayment(sessionId)

    if (paymentResult.success && paymentResult.userId) {
      // Update user metadata to paid membership
      const { data, error } = await supabase.auth.admin.updateUserById(
        paymentResult.userId,
        {
          user_metadata: {
            membership_tier: 'paid'
          }
        }
      )

      if (error) {
        console.error('Error updating user membership:', error)
        return NextResponse.json(
          { error: 'Failed to update membership' },
          { status: 500 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified and membership updated' 
      })
    }

    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}