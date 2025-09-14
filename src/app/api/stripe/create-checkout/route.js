import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@app/_lib/stripe'
import { supabase } from '@app/_lib/supabase'

export async function POST(req) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get user details from Supabase
    const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { sessionId, url } = await createCheckoutSession(userId, user.email)

    return NextResponse.json({ sessionId, url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}